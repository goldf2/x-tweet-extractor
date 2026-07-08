/**
 * X (Twitter) Tweet Extractor - Content Script
 * 提取当前页面用户的推文数据
 */

(function() {
  'use strict';

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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getUserInfo() {
    let userName = '';
    let userHandle = '';

    const titleMatch = document.title.match(/^(.*?)\s*[@@](\w+)/);
    if (titleMatch) {
      userName = titleMatch[1].trim();
      userHandle = titleMatch[2];
    }

    if (!userHandle) {
      const handleEl = document.querySelector('a[href^="/"][role="link"] div[dir="ltr"] span');
      if (handleEl) {
        const text = handleEl.textContent.trim();
        if (text.startsWith('@')) userHandle = text.slice(1);
      }
    }

    if (!userHandle) {
      const pathMatch = window.location.pathname.match(/^\/(\w+)(?:\/|$)/);
      if (pathMatch && !['home', 'explore', 'notifications', 'messages', 'i'].includes(pathMatch[1])) {
        userHandle = pathMatch[1];
      }
    }

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

      const textEl = article.querySelector('[data-testid="tweetText"]');
      if (textEl) {
        tweetData.text = textEl.textContent.trim();
      }

      const timeEl = article.querySelector('time');
      if (timeEl) {
        tweetData.timestamp = timeEl.getAttribute('datetime') || '';
        tweetData.createdAt = timeEl.textContent.trim();

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

      const metrics = article.querySelectorAll('[data-testid$="-count"]');
      metrics.forEach(el => {
        const testId = el.getAttribute('data-testid') || '';
        const value = parseMetric(el.textContent);
        if (testId.includes('reply')) tweetData.replies = value;
        else if (testId.includes('retweet')) tweetData.retweets = value;
        else if (testId.includes('like')) tweetData.likes = value;
      });

      const retweetBadge = article.querySelector('[data-testid="socialContext"]');
      if (retweetBadge) {
        const ctxText = retweetBadge.textContent;
        tweetData.isRetweet = ctxText.includes('转发') || ctxText.includes('Retweeted') || ctxText.includes('reposted');
      }

      const mediaEls = article.querySelectorAll('[data-testid="tweetPhoto"], [data-testid="videoPlayer"], [data-testid="card.layoutLarge.media"]');
      tweetData.hasMedia = mediaEls.length > 0;

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

  function isTweetAfterDate(tweet, startDate) {
    if (!startDate) return true;

    const tweetDate = tweet.timestamp ? new Date(tweet.timestamp) : null;
    if (tweetDate && !isNaN(tweetDate.getTime())) {
      const cutoffDate = new Date(startDate);
      cutoffDate.setHours(0, 0, 0, 0);
      return tweetDate >= cutoffDate;
    }

    return true;
  }

  async function extractTweets(options = {}) {
    const maxTweets = options.maxTweets || 5000;
    const maxScrolls = options.maxScrolls || 500;
    const scrollDelay = options.scrollDelay || 1000;
    const startDate = options.startDate || null;

    if (isExtracting) {
      return { success: false, error: '正在提取中，请稍候...' };
    }

    isExtracting = true;
    stopRequested = false;
    extractedTweets = [];
    extractionProgress = { current: 0, target: maxTweets, scrollCount: 0 };
    const seenIds = new Set();
    let reachedDateLimit = false;

    const userInfo = getUserInfo();
    extractionStats.userName = userInfo.userName;
    extractionStats.userHandle = userInfo.userHandle;

    notifyPopup({ type: 'extraction-started', stats: extractionStats });

    let scrollCount = 0;
    let noNewCount = 0;

    try {
      while (isExtracting && !stopRequested && scrollCount < maxScrolls && extractedTweets.length < maxTweets && noNewCount < 5 && !reachedDateLimit) {
        const articles = document.querySelectorAll('article[data-testid="tweet"]');
        let newFound = 0;

        articles.forEach(article => {
          const tweet = parseTweetElement(article);
          if (tweet && tweet.id && !seenIds.has(tweet.id)) {
            if (isTweetAfterDate(tweet, startDate)) {
              seenIds.add(tweet.id);
              extractedTweets.push(tweet);
              newFound++;
            }
          }
        });

        if (startDate && articles.length > 0) {
          const oldestArticle = articles[articles.length - 1];
          const oldestTweet = parseTweetElement(oldestArticle);
          if (oldestTweet && !isTweetAfterDate(oldestTweet, startDate)) {
            let allOlder = true;
            for (let i = Math.max(0, articles.length - 3); i < articles.length; i++) {
              const t = parseTweetElement(articles[i]);
              if (t && isTweetAfterDate(t, startDate)) {
                allOlder = false;
                break;
              }
            }
            if (allOlder) {
              reachedDateLimit = true;
            }
          }
        }

        extractionStats.totalExtracted = extractedTweets.length;
        extractionProgress.current = extractedTweets.length;
        extractionProgress.scrollCount = scrollCount;

        notifyPopup({
          type: 'extraction-progress',
          stats: extractionStats,
          progress: { ...extractionProgress }
        });

        const scrollContainer = document.scrollingElement || document.documentElement;
        const beforeScrollTop = scrollContainer.scrollTop;
        const beforeHeight = scrollContainer.scrollHeight;

        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });

        await sleep(scrollDelay);

        const afterHeight = scrollContainer.scrollHeight;
        const afterScrollTop = scrollContainer.scrollTop;

        if (newFound === 0 && afterHeight <= beforeHeight && afterScrollTop <= beforeScrollTop) {
          noNewCount++;
        } else {
          noNewCount = 0;
        }

        scrollCount++;
      }

      const result = {
        success: true,
        stopped: stopRequested,
        reachedDateLimit: reachedDateLimit,
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

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'extract':
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
