// background.js - 处理导出下载
// Manifest V3 的 Service Worker 中没有 URL.createObjectURL 和 Blob
// 改用 data: URL 方案直接下载

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'download') {
    const { data, filename, type } = request;

    try {
      // 将字符串转换为 base64 编码的 data URL
      // Service Worker 环境支持 encodeURIComponent + btoa，或直接用 data: URL
      const mimeType = (type || 'text/plain').split(';')[0];
      // 使用 UTF-8 安全的 base64 编码
      const encoded = btoa(unescape(encodeURIComponent(data)));
      const dataUrl = `data:${mimeType};charset=utf-8;base64,${encoded}`;

      chrome.downloads.download({
        url: dataUrl,
        filename: filename,
        saveAs: true
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true, downloadId });
        }
      });

      return true; // 保持消息通道开启，等待异步响应
    } catch (e) {
      sendResponse({ success: false, error: '生成下载链接失败: ' + e.message });
      return false;
    }
  }
});
