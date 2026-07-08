/**
 * X Tweet Extractor - Popup 交互脚本
 * 支持多语言 (i18n)
 */

document.addEventListener('DOMContentLoaded', async () => {
  // ====== 初始化 i18n ======
  await I18N.loadLang();

  // 填充语言选择器
  const langSelect = document.getElementById('langSelect');
  for (const [code, info] of Object.entries(I18N.languages)) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${info.flag} ${info.name}`;
    if (code === I18N.getLang()) opt.selected = true;
    langSelect.appendChild(opt);
  }

  // 应用翻译到 DOM
  I18N.applyToDOM();

  // 语言切换
  langSelect.addEventListener('change', () => {
    I18N.setLang(langSelect.value);
    I18N.applyToDOM();
    // 重新刷新动态文本
    refreshDynamicTexts();
  });

  // DOM 元素引用
  const els = {
    statusDot: document.getElementById('statusDot'),
    statusText: document.getElementById('statusText'),
    userInput: document.getElementById('userInput'),
    maxTweetsInput: document.getElementById('maxTweetsInput'),
    maxScrollsInput: document.getElementById('maxScrollsInput'),
    scrollDelayInput: document.getElementById('scrollDelayInput'),
    infoPanel: document.getElementById('infoPanel'),
    userName: document.getElementById('userName'),
    userHandle: document.getElementById('userHandle'),
    tweetCount: document.getElementById('tweetCount'),
    extractBtn: document.getElementById('extractBtn'),
    stopBtn: document.getElementById('stopBtn'),
    exportSection: document.getElementById('exportSection'),
    exportFormat: document.getElementById('exportFormat'),
    exportBtn: document.getElementById('exportBtn'),
    exportHint: document.getElementById('exportHint'),
    clearBtn: document.getElementById('clearBtn'),
    progressSection: document.getElementById('progressSection'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    tweetPreview: document.getElementById('tweetPreview'),
    previewList: document.getElementById('previewList')
  };

  let currentData = null;
  let isExtracting = false;

  // i18n 翻译快捷方法
  const t = (key, params) => I18N.t(key, params);

  // ====== 读取用户设置的提取参数 ======

  function getExtractOptions() {
    const maxTweets = parseInt(els.maxTweetsInput.value) || 5000;
    const maxScrolls = parseInt(els.maxScrollsInput.value) || 500;
    const scrollDelay = parseInt(els.scrollDelayInput.value) || 1000;

    return {
      maxTweets: Math.max(1, Math.min(maxTweets, 50000)),
      maxScrolls: Math.max(1, Math.min(maxScrolls, 5000)),
      scrollDelay: Math.max(300, Math.min(scrollDelay, 10000))
    };
  }

  // ====== 状态管理 ======

  function setStatus(type, text) {
    els.statusDot.className = 'status-dot';
    els.statusText.textContent = text;

    switch (type) {
      case 'ready':
        els.statusDot.classList.add('ready');
        break;
      case 'extracting':
        els.statusDot.classList.add('extracting');
        break;
      case 'error':
        els.statusDot.classList.add('error');
        break;
      default:
        break;
    }
  }

  function setExtractingUI(extracting) {
    if (extracting) {
      els.extractBtn.style.display = 'none';
      els.stopBtn.style.display = 'block';
      els.userInput.disabled = true;
      els.maxTweetsInput.disabled = true;
      els.maxScrollsInput.disabled = true;
      els.scrollDelayInput.disabled = true;
    } else {
      els.extractBtn.style.display = 'block';
      els.stopBtn.style.display = 'none';
      els.userInput.disabled = false;
      els.maxTweetsInput.disabled = false;
      els.maxScrollsInput.disabled = false;
      els.scrollDelayInput.disabled = false;
    }
  }

  function updateUI(data) {
    if (!data || !data.stats) return;

    const { stats, tweets, summary } = data;

    els.userName.textContent = stats.userName || '-';
    els.userHandle.textContent = stats.userHandle ? `@${stats.userHandle}` : '-';
    els.tweetCount.textContent = t('tweetCount', { n: summary?.total || tweets?.length || 0 });

    els.infoPanel.style.display = 'block';

    const hasData = (summary?.total || tweets?.length || 0) > 0;
    els.exportSection.style.display = hasData ? 'block' : 'none';
    els.clearBtn.disabled = !hasData;

    // 预览
    if (tweets && tweets.length > 0) {
      els.tweetPreview.style.display = 'block';
      els.previewList.innerHTML = tweets.slice(0, 5).map(tweet => {
        const dateStr = tweet.createdAt || tweet.timestamp?.split('T')[0] || '';
        const text = tweet.text.length > 60 ? tweet.text.slice(0, 60) + '...' : tweet.text;
        return `<li>
          <div>${escapeHtml(text) || t('noText')}</div>
          <div class="tweet-date">${escapeHtml(dateStr)} · ${tweet.likes || 0} ${t('likes')}</div>
        </li>`;
      }).join('');
    } else {
      els.tweetPreview.style.display = 'none';
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 切换语言后刷新动态文本
  function refreshDynamicTexts() {
    if (currentData) {
      updateUI(currentData);
    }
    // 刷新导出提示
    updateExportHint();
  }

  // ====== 与 Content Script 通信 ======

  async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }

  async function sendToContent(message) {
    const tab = await getCurrentTab();
    if (!tab) throw new Error(t('errNoTab'));

    const url = tab.url || '';
    if (!url.match(/^https:\/\/(x\.com|twitter\.com)/)) {
      throw new Error(t('errNotXPage'));
    }

    return chrome.tabs.sendMessage(tab.id, message);
  }

  async function navigateToUser(username) {
    const cleanName = username.trim().replace(/^@/, '');
    if (!cleanName) return;

    const tab = await getCurrentTab();
    if (!tab) throw new Error(t('errNoTab'));

    const targetUrl = `https://x.com/${cleanName}`;

    if (tab.url && tab.url.includes(`x.com/${cleanName}`)) {
      return;
    }

    setStatus('extracting', t('navigating', { user: cleanName }));

    await chrome.tabs.update(tab.id, { url: targetUrl });
    await waitForTabLoaded(tab.id);
  }

  function waitForTabLoaded(tabId) {
    return new Promise((resolve) => {
      let resolved = false;
      const listener = (updatedTabId, changeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === 'complete' && !resolved) {
          resolved = true;
          chrome.tabs.onUpdated.removeListener(listener);
          setTimeout(resolve, 2500);
        }
      };
      chrome.tabs.onUpdated.addListener(listener);

      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      }, 15000);
    });
  }

  async function ensureContentScript() {
    const tab = await getCurrentTab();
    if (!tab) throw new Error(t('errNoTab'));

    try {
      const resp = await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
      if (resp && resp.pong) return true;
    } catch (e) {}

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      await new Promise(r => setTimeout(r, 600));
      const resp = await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
      return !!(resp && resp.pong);
    } catch (e) {
      console.error('[X Extractor] Injection failed:', e);
      return false;
    }
  }

  // ====== 事件处理 ======

  els.extractBtn.addEventListener('click', async () => {
    if (isExtracting) return;

    try {
      isExtracting = true;
      setExtractingUI(true);
      els.progressSection.style.display = 'block';
      els.progressFill.style.width = '0%';
      els.progressText.textContent = t('progressInit');

      const inputUser = els.userInput.value.trim();
      if (inputUser) {
        await navigateToUser(inputUser);
        setStatus('extracting', t('pageLoading'));
        const ready = await ensureContentScript();
        if (!ready) {
          throw new Error(t('errNoScript'));
        }
      } else {
        const ready = await ensureContentScript();
        if (!ready) {
          throw new Error(t('errNoScriptCurrent'));
        }
      }

      setStatus('extracting', t('progressExtracting'));

      const response = await sendToContent({
        action: 'extract',
        options: getExtractOptions()
      });

      if (!response || !response.success) {
        throw new Error(response?.error || t('errStartFailed'));
      }
    } catch (err) {
      setStatus('error', err.message || t('errExtract'));
      isExtracting = false;
      setExtractingUI(false);
      els.progressSection.style.display = 'none';
    }
  });

  els.stopBtn.addEventListener('click', async () => {
    try {
      setStatus('extracting', t('progressStopping'));
      await sendToContent({ action: 'stop' });
      const data = await sendToContent({ action: 'getData' });
      if (data) {
        currentData = data;
        updateUI(data);
      }
    } catch (err) {
      setStatus('error', err.message || t('errStop'));
      isExtracting = false;
      setExtractingUI(false);
      els.progressSection.style.display = 'none';
    }
  });

  els.userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isExtracting) {
      els.extractBtn.click();
    }
  });

  // ====== 统一导出逻辑 ======

  els.exportBtn.addEventListener('click', async () => {
    const format = els.exportFormat.value;

    const data = await getFreshData();
    if (!data || !data.tweets || data.tweets.length === 0) {
      setStatus('error', t('msgNoData'));
      return;
    }

    const handle = data.stats?.userHandle || 'user';
    const timestamp = new Date().toISOString().slice(0, 10);
    const baseFilename = `x_tweets_${handle}_${timestamp}`;

    let fileData = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'json':
        ({ fileData, filename, mimeType } = exportJSON(data, baseFilename));
        break;
      case 'csv':
        ({ fileData, filename, mimeType } = exportCSV(data, baseFilename));
        break;
      case 'txt':
        ({ fileData, filename, mimeType } = exportTXT(data, baseFilename));
        break;
      case 'html':
        ({ fileData, filename, mimeType } = exportHTML(data, baseFilename));
        break;
      case 'md':
        ({ fileData, filename, mimeType } = exportMarkdown(data, baseFilename));
        break;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        action: 'download',
        data: fileData,
        filename,
        type: mimeType
      });

      if (response && response.success) {
        const formatName = { json: 'JSON', csv: 'CSV', txt: 'TXT', html: 'HTML', md: 'Markdown' }[format];
        setStatus('ready', t('msgExportSuccess', { format: formatName, n: data.tweets.length }));
      } else {
        setStatus('error', response?.error || t('errExport'));
      }
    } catch (err) {
      setStatus('error', t('errExportGen', { msg: err.message }));
    }
  });

  function updateExportHint() {
    const format = els.exportFormat.value;
    const hintKeys = { json: 'hintJson', csv: 'hintCsv', txt: 'hintTxt', html: 'hintHtml', md: 'hintMd' };
    els.exportHint.textContent = t(hintKeys[format] || 'exportHintDefault');
  }

  els.exportFormat.addEventListener('change', updateExportHint);

  // ====== 各格式生成函数 ======

  function exportJSON(data, baseFilename) {
    const payload = {
      extractedAt: new Date().toISOString(),
      user: data.stats,
      summary: data.summary,
      tweets: data.tweets
    };
    return {
      fileData: JSON.stringify(payload, null, 2),
      filename: `${baseFilename}.json`,
      mimeType: 'application/json'
    };
  }

  function exportCSV(data, baseFilename) {
    const headers = ['id', 'text', 'createdAt', 'timestamp', 'likes', 'retweets', 'replies', 'views', 'isRetweet', 'hasMedia', 'url'];
    let csv = '\uFEFF' + headers.join(',') + '\n';

    for (const tw of data.tweets) {
      const row = [
        tw.id || '',
        escapeCsv(tw.text),
        escapeCsv(tw.createdAt),
        escapeCsv(tw.timestamp),
        tw.likes || 0,
        tw.retweets || 0,
        tw.replies || 0,
        tw.views || 0,
        tw.isRetweet ? '1' : '0',
        tw.hasMedia ? '1' : '0',
        escapeCsv(tw.url)
      ];
      csv += row.join(',') + '\n';
    }

    return {
      fileData: csv,
      filename: `${baseFilename}.csv`,
      mimeType: 'text/csv;charset=utf-8;'
    };
  }

  function exportTXT(data, baseFilename) {
    const lines = [];
    lines.push(t('exportTweetExport', { handle: data.stats?.userHandle || 'unknown' }));
    lines.push(`${t('exportTime')}: ${new Date().toLocaleString()}`);
    lines.push(t('exportTotal', { n: data.tweets.length }));
    lines.push('='.repeat(60));
    lines.push('');

    data.tweets.forEach((tw, i) => {
      lines.push(`【${i + 1}】 ${tw.createdAt || tw.timestamp || ''}`);
      lines.push(tw.text || t('noText'));
      if (tw.likes || tw.retweets || tw.replies) {
        lines.push(`  ${t('metaLikes')} ${tw.likes || 0} | ${t('metaRetweets')} ${tw.retweets || 0} | ${t('metaReplies')} ${tw.replies || 0}`);
      }
      if (tw.url) lines.push(`  ${t('linkLabel')}: ${tw.url}`);
      if (tw.hasMedia) lines.push(`  ${t('containsMedia')}`);
      lines.push('-'.repeat(60));
      lines.push('');
    });

    return {
      fileData: lines.join('\n'),
      filename: `${baseFilename}.txt`,
      mimeType: 'text/plain;charset=utf-8;'
    };
  }

  function exportHTML(data, baseFilename) {
    const tweetsHtml = data.tweets.map((tw, i) => {
      const date = tw.createdAt || tw.timestamp || '';
      const text = escapeHtml(tw.text || t('noText'));
      const url = tw.url ? `<a href="${escapeHtml(tw.url)}" target="_blank" class="tweet-link">${t('viewOriginal')}</a>` : '';
      const media = tw.hasMedia ? `<span class="badge media">${t('badgeMedia')}</span>` : '';
      const rt = tw.isRetweet ? `<span class="badge rt">${t('badgeRetweet')}</span>` : '';
      return `<div class="tweet">
        <div class="tweet-header">
          <span class="tweet-num">#${i + 1}</span>
          <span class="tweet-date">${escapeHtml(date)}</span>
          ${rt}${media}
        </div>
        <div class="tweet-text">${text}</div>
        <div class="tweet-meta">
          <span>${t('metaLikes')} ${tw.likes || 0}</span>
          <span>${t('metaRetweets')} ${tw.retweets || 0}</span>
          <span>${t('metaReplies')} ${tw.replies || 0}</span>
          ${url}
        </div>
      </div>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="${I18N.getLang()}">
<head>
  <meta charset="UTF-8">
  <title>${t('exportFileTitle', { handle: escapeHtml(data.stats?.userHandle || 'user') })}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #15202b; color: #e7e9ea; max-width: 680px; margin: 0 auto; padding: 20px; }
    h1 { color: #1d9bf0; font-size: 22px; }
    .summary { color: #8899a6; font-size: 14px; margin-bottom: 20px; }
    .tweet { background: #192734; border-radius: 12px; padding: 16px; margin-bottom: 12px; border: 1px solid #38444d; }
    .tweet-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #8899a6; }
    .tweet-num { font-weight: 700; color: #1d9bf0; }
    .tweet-date { color: #8899a6; }
    .badge { font-size: 11px; padding: 2px 6px; border-radius: 4px; }
    .badge.media { background: #1d9bf0; color: #fff; }
    .badge.rt { background: #00ba7c; color: #fff; }
    .tweet-text { font-size: 15px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
    .tweet-meta { display: flex; gap: 16px; margin-top: 10px; font-size: 13px; color: #8899a6; }
    .tweet-link { color: #1d9bf0; text-decoration: none; }
    .tweet-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>${t('exportFileTitle', { handle: escapeHtml(data.stats?.userHandle || 'user') })}</h1>
  <div class="summary">${t('exportTime')}: ${new Date().toLocaleString()} | ${t('exportTotal', { n: data.tweets.length })}</div>
  ${tweetsHtml}
</body>
</html>`;

    return {
      fileData: html,
      filename: `${baseFilename}.html`,
      mimeType: 'text/html;charset=utf-8;'
    };
  }

  function exportMarkdown(data, baseFilename) {
    const lines = [];
    const origCount = data.tweets.filter(tw => !tw.isRetweet).length;
    const rtCount = data.tweets.filter(tw => tw.isRetweet).length;
    lines.push(`# ${t('exportFileTitle', { handle: data.stats?.userHandle || 'user' })}`);
    lines.push('');
    lines.push(`> ${t('exportTime')}: ${new Date().toLocaleString()}  `);
    lines.push(`> ${t('exportTotal', { n: data.tweets.length })}  `);
    lines.push(`> ${t('exportOriginal', { n: origCount, m: rtCount })}`);
    lines.push('');
    lines.push('---');
    lines.push('');

    data.tweets.forEach((tw, i) => {
      const date = tw.createdAt || tw.timestamp || '';
      const tags = [];
      if (tw.isRetweet) tags.push(t('tagRetweet'));
      if (tw.hasMedia) tags.push(t('tagMedia'));
      const tagStr = tags.length > 0 ? ` \`${tags.join(' | ')}\`` : '';

      lines.push(`## ${i + 1}. ${date}${tagStr}`);
      lines.push('');
      lines.push(tw.text || t('noText'));
      lines.push('');
      lines.push(`${t('metaLikes')} ${tw.likes || 0} | ${t('metaRetweets')} ${tw.retweets || 0} | ${t('metaReplies')} ${tw.replies || 0}`);
      if (tw.url) lines.push(`[${t('viewOriginal')}](${tw.url})`);
      lines.push('');
      lines.push('---');
      lines.push('');
    });

    return {
      fileData: lines.join('\n'),
      filename: `${baseFilename}.md`,
      mimeType: 'text/markdown;charset=utf-8;'
    };
  }

  function escapeCsv(text) {
    if (text === null || text === undefined) return '';
    let str = String(text).replace(/"/g, '""');
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      str = '"' + str + '"';
    }
    return str;
  }

  async function getFreshData() {
    try {
      const data = await sendToContent({ action: 'getData' });
      if (data) {
        currentData = data;
        updateUI(data);
      }
      return data;
    } catch (e) {
      return currentData;
    }
  }

  els.clearBtn.addEventListener('click', async () => {
    try {
      await sendToContent({ action: 'clear' });
      currentData = null;
      els.infoPanel.style.display = 'none';
      els.tweetPreview.style.display = 'none';
      els.exportSection.style.display = 'none';
      els.clearBtn.disabled = true;
      setStatus('ready', t('msgCleared'));
    } catch (err) {
      setStatus('error', err.message);
    }
  });

  // ====== 监听来自 content script 的消息 ======

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'extraction-progress') {
      const { progress, stats } = message;
      els.progressFill.style.width = Math.min((progress.current / progress.target) * 100, 100) + '%';
      els.progressText.textContent = t('progressText', { count: stats.totalExtracted, scroll: progress.scrollCount });
      updateUI({ stats, tweets: [], summary: { total: stats.totalExtracted } });

    } else if (message.type === 'extraction-complete') {
      isExtracting = false;
      setExtractingUI(false);
      els.progressSection.style.display = 'none';

      if (message.success) {
        currentData = {
          stats: message.stats,
          tweets: message.tweets,
          summary: message.summary
        };
        updateUI(currentData);
        if (message.stopped) {
          setStatus('ready', t('msgStopped', { n: message.summary?.total || 0 }));
        } else {
          setStatus('ready', t('msgComplete', { n: message.summary?.total || 0 }));
        }
      }

    } else if (message.type === 'extraction-error') {
      isExtracting = false;
      setExtractingUI(false);
      els.progressSection.style.display = 'none';
      setStatus('error', message.error || t('errExtract'));
    }
  });

  // ====== 初始化 ======

  async function init() {
    setStatus('ready', t('ready'));

    const tab = await getCurrentTab();
    const url = tab?.url || '';
    if (!url.match(/^https:\/\/(x\.com|twitter\.com)/)) {
      setStatus('ready', t('msgStartPage'));
      return;
    }

    try {
      const ready = await ensureContentScript();
      if (!ready) {
        setStatus('ready', t('msgStartPage'));
        return;
      }

      const status = await sendToContent({ action: 'getStatus' });
      if (status && status.isExtracting) {
        isExtracting = true;
        setExtractingUI(true);
        els.progressSection.style.display = 'block';
        setStatus('extracting', t('progressExtracting'));
        if (status.stats && status.progress) {
          els.progressFill.style.width = Math.min((status.progress.current / Math.max(status.progress.target, 1)) * 100, 100) + '%';
          els.progressText.textContent = t('progressText', { count: status.stats.totalExtracted || 0, scroll: status.progress.scrollCount || 0 });
          updateUI({ stats: status.stats, tweets: [], summary: { total: status.stats.totalExtracted || 0 } });
        }
      } else if (status && status.hasData) {
        const data = await sendToContent({ action: 'getData' });
        if (data) {
          currentData = data;
          updateUI(data);
          setStatus('ready', t('msgLoaded', { n: data.summary?.total || 0 }));
        }
      }
    } catch (err) {
      setStatus('ready', t('msgStartPage'));
    }
  }

  init();
});
