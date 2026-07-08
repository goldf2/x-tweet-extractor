/**
 * X (Twitter) Tweet Extractor - Content Script
 * 提取当前页面用户的推文数据
 */

(function() {
  'use strict';

  // 防止重复注入
  if (window.__xTweetExtractorInjected) return;
  window.__xTweetExtractorInjected = true;

  let isExtracting = false;
  let stopRequested = false;
  let extractedTweets = [];
  let extractionProgress = { current: 0, target: 0, scrollCount: 0 };
  let extractionStats = {
    userName: '',
    userHandle: '',
    totalExtracted: 0
  };

  // ====== 工具函数 ======

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getUserInfo() {
    // 尝试多种方式获取用户信息
    let userName = '';
    let userHandle = '';

    // 方法1: 从页面标题获取
    const titleMatch = document.title.match(/^(.*?)\s*[@@](\w+)/);
    if (titleMatch) {
      userName = titleMatch[1].trim();
      userHandle = titleMatch[2];
    }

    // 方法2: 从侧边栏或页面头部获取
    if (!userHandle) {
      const handleEl = document.querySelector('a[href^="/"][role="link"] div[dir="ltr"] span');
      if (handleEl) {
        const text = handleEl.textContent.trim();
        if (text.startsWith('@')) userHandle = text.slice(1);
      }
    }

    // 方法3: 从URL获取
    if (!userHandle) {
      const pathMatch = window.location.pathname.match(/^\/(\w+)(?:\/|$)/);
      if (pathMatch && !['home', 'explore', 'notifications', 'messages', 'i'].includes(pathMatch[1])) {
        userHandle = pathMatch[1];
      }
    }

    // 获取显示名称
    if (!userName) {
      const nameEl = document.querySelector('div[data-testid="UserName"] div[dir="auto"] > span, h2[role="heading"] div[dir="auto"] > span, [data-testid="cellInnerDiv"] h2 + div span');
      if (nameEl) userName = nameEl.textContent.trim();
    }

    return { userName: userName || userHandle, userHandle };
  }

  function parseTweetElement(article) {
    try {
      const tweetData = {
        id: '',
        text: '',
        createdAt: '',
        timestamp: '',
        likes: 0,
        retweets: 0,
        replies: 0,
        views: 0,
        isRetweet: false,
        hasMedia: false,
        url: ''
      };

      // 推文文本
      const textEl = article.querySelector('[data-testid="tweetText"]');
      if (textEl) {
        tweetData.text = textEl.textContent.trim();
      }

      // 时间戳和链接
      const timeEl = article.querySelector('time');
      if (timeEl) {
        tweetData.timestamp = timeEl.getAttribute('datetime') || '';
        tweetData.createdAt = timeEl.textContent.trim();

        // 从时间元素的父链接获取推文URL
        const linkEl = timeEl.closest('a[href*="/status/"]');
        if (linkEl) {
          const href = linkEl.getAttribute('href');
          if (href) {
            tweetData.url = 'https://x.com' + href;
            const idMatch = href.match(/\/status\/(\d+)/);
            if (idMatch) tweetData.id = idMatch[1];
          }
        }
      }

      // 互动数据 (回复/转发/点赞/浏览)
      const metrics = article.querySelectorAll('[data-testid$="-count"]');
      metrics.forEach(el => {
        const testId = el.getAttribute('data-testid') || '';
        const value = parseMetric(el.textContent);
        if (testId.includes('reply')) tweetData.replies = value;
        else if (testId.includes('retweet')) tweetData.retweets = value;
        else if (testId.includes('like')) tweetData.likes = value;
      });

      // 浏览量 (X 显示在推文下方)
      const viewEl = article.querySelector('a[href*="/analytics"] span, [data-testid="app-text-transition-container"]');
      if (viewEl && viewEl.textContent.includes('浏览') || viewEl?.closest('a')?.getAttribute('href')?.includes('analytics')) {
        // 浏览量通常是单独的元素，尝试获取
      }

      // 检测是否转发
      const retweetBadge = article.querySelector('[data-testid="socialContext"]');
      if (retweetBadge) {
        const ctxText = retweetBadge.textContent;
        tweetData.isRetweet = ctxText.includes('转发') || ctxText.includes('Retweeted') || ctxText.includes('reposted');
      }

      // 检测媒体
      const mediaEls = article.querySelectorAll('[data-testid="tweetPhoto"], [data-testid="videoPlayer"], [data-testid="card.layoutLarge.media"]');
      tweetData.hasMedia = mediaEls.length > 0;

      // 过滤空内容
      if (!tweetData.text && !tweetData.id) return null;

      return tweetData;
    } catch (e) {
      console.error('[X Extractor] 解析推文出错:', e);
      return null;
    }
  }

  function parseMetric(text) {
    if (!text) return 0;
    const clean = text.trim().replace(/,/g, '');
    if (clean.endsWith('K')) return Math.round(parseFloat(clean) * 1000);
    if (clean.endsWith('M')) return Math.round(parseFloat(clean) * 1000000);
    if (clean.endsWith('万')) return Math.round(parseFloat(clean) * 10000);
    return parseInt(clean) || 0;
  }

  // ====== 核心提取逻辑 ======

  async function extractTweets(options = {}) {
    const maxTweets = options.maxTweets || 5000;
    const maxScrolls = options.maxScrolls || 500;
    const scrollDelay = options.scrollDelay || 1000;

    if (isExtracting) {
      return { success: false, error: '正在提取中，请稍候...' };
    }

    isExtracting = true;
    stopRequested = false;
    extractedTweets = [];
    extractionProgress = { current: 0, target: maxTweets, scrollCount: 0 };
    const seenIds = new Set();

    const userInfo = getUserInfo();
    extractionStats.userName = userInfo.userName;
    extractionStats.userHandle = userInfo.userHandle;

    // 通知 popup 开始
    notifyPopup({ type: 'extraction-started', stats: extractionStats });

    let scrollCount = 0;
    let noNewCount = 0;

    try {
      while (isExtracting && !stopRequested && scrollCount < maxScrolls && extractedTweets.length < maxTweets && noNewCount < 5) {
        // 获取当前可见的所有推文
        const articles = document.querySelectorAll('article[data-testid="tweet"]');
        let newFound = 0;

        articles.forEach(article => {
          const tweet = parseTweetElement(article);
          if (tweet && tweet.id && !seenIds.has(tweet.id)) {
            seenIds.add(tweet.id);
            extractedTweets.push(tweet);
            newFound++;
          }
        });

        extractionStats.totalExtracted = extractedTweets.length;
        extractionProgress.current = extractedTweets.length;
        extractionProgress.scrollCount = scrollCount;

        // 通知进度
        notifyPopup({
          type: 'extraction-progress',
          stats: extractionStats,
          progress: { ...extractionProgress }
        });

        // 滚动页面：先记录滚动前位置，滚动后检查是否变化
        const scrollContainer = document.scrollingElement || document.documentElement;
        const beforeScrollTop = scrollContainer.scrollTop;
        const beforeHeight = scrollContainer.scrollHeight;

        // 滚动到页面底部
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });

        // 等待新内容加载
        await sleep(scrollDelay);

        // 检查是否有新内容加载（高度增加或滚动位置变化）
        const afterHeight = scrollContainer.scrollHeight;
        const afterScrollTop = scrollContainer.scrollTop;

        if (newFound === 0 && afterHeight <= beforeHeight && afterScrollTop <= beforeScrollTop) {
          // 连续 5 次无新内容才认为到底了
          noNewCount++;
        } else {
          noNewCount = 0;
        }

        scrollCount++;
      }

      // 完成
      const result = {
        success: true,
        stopped: stopRequested,
        stats: extractionStats,
        tweets: extractedTweets,
        summary: {
          total: extractedTweets.length,
          withMedia: extractedTweets.filter(t => t.hasMedia).length,
          retweets: extractedTweets.filter(t => t.isRetweet).length
        }
      };

      notifyPopup({ type: 'extraction-complete', ...result });
      return result;

    } catch (error) {
      const errResult = { success: false, error: error.message };
      notifyPopup({ type: 'extraction-error', ...errResult });
      return errResult;
    } finally {
      isExtracting = false;
    }
  }

  function stopExtraction() {
    stopRequested = true;
    isExtracting = false;
  }

  function getExtractedData() {
    return {
      stats: extractionStats,
      tweets: extractedTweets,
      summary: {
        total: extractedTweets.length,
        withMedia: extractedTweets.filter(t => t.hasMedia).length,
        retweets: extractedTweets.filter(t => t.isRetweet).length
      }
    };
  }

  function clearData() {
    extractedTweets = [];
    extractionStats = { userName: '', userHandle: '', totalExtracted: 0 };
    return { success: true };
  }

  function notifyPopup(message) {
    try {
      chrome.runtime.sendMessage(message).catch(() => {});
    } catch (e) {}
  }

  // ====== 消息监听 ======

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'extract':
        // 非阻塞启动：立即返回，通过消息通知进度和完成
        // 这样即使 popup 关闭，提取也能继续
        extractTweets(request.options).catch(e => {
          notifyPopup({ type: 'extraction-error', success: false, error: e.message });
          isExtracting = false;
        });
        sendResponse({ success: true, started: true });
        return false;

      case 'stop':
        stopExtraction();
        sendResponse({ success: true });
        return false;

      case 'getStatus':
        sendResponse({
          isExtracting,
          stopRequested,
          stats: extractionStats,
          progress: extractionProgress,
          hasData: extractedTweets.length > 0
        });
        return false;

      case 'getData':
        sendResponse(getExtractedData());
        return false;

      case 'clear':
        sendResponse(clearData());
        return false;

      case 'ping':
        sendResponse({ pong: true, url: window.location.href, hasData: extractedTweets.length > 0, isExtracting });
        return false;

      default:
        sendResponse({ error: '未知操作' });
        return false;
    }
  });

  // 页面加载完成后，如果URL是用户主页，自动尝试获取用户信息
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const info = getUserInfo();
      if (info.userHandle) {
        extractionStats.userName = info.userName;
        extractionStats.userHandle = info.userHandle;
      }
    });
  } else {
    const info = getUserInfo();
    if (info.userHandle) {
      extractionStats.userName = info.userName;
      extractionStats.userHandle = info.userHandle;
    }
  }

  console.log('[X Tweet Extractor] 内容脚本已加载');
})();
