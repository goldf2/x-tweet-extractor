# Chrome Web Store 上架指南

## 商店 listing 信息

### 名称（最多 45 字符）
```
X Tweet Extractor - Export Tweets
```

### 简短描述（最多 132 字符）
```
Extract tweets from X (Twitter) user profiles and export to JSON, CSV, TXT, HTML, or Markdown. For personal data backup.
```

### 详细描述
```
X Tweet Extractor is a powerful browser extension that allows you to extract and export tweets from any X (Twitter) user's profile page.

Features:
- Extract tweets by scrolling through user profiles automatically
- Adjustable extraction parameters (max tweets, scroll count, delay)
- Stop extraction at any time and keep already extracted data
- Export to 5 formats: JSON, CSV, TXT, HTML, Markdown
- Multi-language UI (14 languages supported)
- Dark theme matching X's visual style
- 100% local processing — no data sent to servers

How to use:
1. Navigate to an X user profile (e.g., x.com/username)
2. Click the extension icon
3. Enter a username or extract from the current page
4. Click "Start Extraction"
5. Choose export format and save

Data extracted per tweet:
- Tweet ID, text content, timestamp
- Likes, retweets, replies counts
- Retweet status, media presence
- Direct tweet URL

Permissions explained:
- activeTab: Access current X page when you click the extension
- scripting: Inject extraction script into x.com pages
- storage: Remember your language preference
- downloads: Save exported files to your computer

Disclaimer: This extension is for personal data backup and research purposes only. Users must comply with X (Twitter)'s Terms of Service.
```

### 类别
```
Productivity
```

### 语言
```
English, 简体中文, 日本語, العربية, Español, Italiano, Français, Deutsch, Português, Русский, 한국어, हिन्दी, ภาษาไทย, Tiếng Việt
```

## 必备素材

| 素材 | 文件 | 状态 |
|------|------|------|
| 扩展图标 128x128 | `icons/icon128.png` | ✅ |
| 小宣传图 440x280 | `promo440x280.png` | ✅ |
| 截图 1 1280x800 | `screenshot1.png` | ✅ |
| 隐私政策 | `privacy.html` | ✅ (需托管到公网) |

## 隐私政策托管

将 `privacy.html` 上传到以下任一位置获取公开 URL：
- GitHub Pages (推荐): `https://yourusername.github.io/x-tweet-extractor/privacy.html`
- 个人网站
- Google Sites

然后在 Chrome Web Store 开发者面板填入该 URL。

## 权限说明（开发者面板填写）

| 权限 | 用途说明 |
|------|----------|
| activeTab | Access the current X page content when user activates the extension |
| scripting | Inject the tweet extraction script into x.com pages |
| storage | Save user's UI language preference locally |
| downloads | Save exported tweet files (JSON/CSV/TXT/HTML/MD) to user's computer |
| host_permissions: x.com, twitter.com | The extension only operates on X (Twitter) domains |

## 上架步骤

1. **注册开发者账号**: 访问 chrome.google.com/webstore/devconsole, 支付 $5 注册费
2. **托管隐私政策**: 将 privacy.html 上传到公网, 获取 URL
3. **打包扩展**: 将项目文件夹打包为 ZIP (manifest.json 在根目录)
4. **填写 listing**: 上传 ZIP, 填写名称/描述/截图/图标/宣传图
5. **填写权限说明**: 在"隐私权实践"部分逐一说明每个权限
6. **提交审核**: 审核通常 1-3 天, 数据提取类可能 5-7 天

## 审核注意事项

- 代码无混淆, 全部可读 (已满足)
- 权限最小化, 仅限 x.com/twitter.com (已满足)
- 单一目的: 提取推文数据 (已满足)
- 隐私政策完整 (已满足)
- 如被拒, 根据反馈修改后可重新提交
