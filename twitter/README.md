# 使用 Twitter API v2 + Node.js
Twitter 的 API v2 提供了监听用户发布新推文的功能（需要开发者账号和 Bearer Token）。

- 注册 Twitter 开发者账号：https://developer.twitter.com/
- 创建 App 并获取 Bearer Token
- 安装依赖 `npm install axios node-cron dotenv`

Twitter API 有速率限制：普通账户通常是每 15 分钟 75 次（user tweets）。

# 网页爬虫监听推文（模拟网页）
Twitter 网页有动态加载机制，反爬机制较强（需要模拟浏览器、登录态、验证码绕过），不推荐这种方式，除非你了解 Puppeteer/Selenium + Cookie 抓包。