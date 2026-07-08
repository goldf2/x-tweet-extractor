# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-08

### Added

- 支持在非 X 页面输入用户名自动跳转并提取推文
- 添加日期过滤器，可选择起始日期只提取该日期之后的推文
- 优化提取逻辑，当到达日期限制时自动停止滚动
- 在弹窗中显示版本号信息
- 添加版本历史查看功能

### Changed

- 更新弹窗副标题为"提取 X 用户推文并导出"
- 更新用户名提示文案
- 添加多语言翻译支持（过滤条件、日期相关）

## [1.0.0] - 2026-07-08

### Added

- 初始化项目
- 支持自动滚动提取用户主页推文
- 支持导出 JSON/CSV/TXT/HTML/Markdown 格式
- 支持输入用户名自动跳转
- 提取过程中可随时停止，保留已提取数据
- 多语言支持（14种语言）
- 暗黑主题 UI
