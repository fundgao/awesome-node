# NodeJS | 脚本 | 爬虫 | Socket + AI

- https://nodejs.org/zh-cn/learn/getting-started/introduction-to-nodejs

## Start

- `npm init`

## 文件批量重命名

- `src/file_rename.js`

### RUN

- `npm run start:rename`

## [Puppeteer 爬虫](https://pptr.dev/)

- `src/puppeteer.js`
- https://blog.csdn.net/wujiayu31415/article/details/136182271
- https://blog.csdn.net/qq_42978535/article/details/142869308
  Cypress 自动化测试
- https://docs.cypress.io/app/get-started/install-cypress

### RUN

- `npm run start:puppeteer`

## 微前端 qiankun

- https://qiankun.umijs.org/zh/guide/tutorial

### RUN

- `npm run start:qiankun`

## socket.io

### RUN

- `npm run start:socket-server`
- `npm run start:socket-client`

### AI

- https://www.volcengine.com/ 火山引擎
- https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint?config=%7B%7D

### 教程

- https://socket.io/zh-CN/docs/v4/server-api/#new-serveroptions
- https://juejin.cn/post/7375048434128224291?searchId=202411020852589BDAAD7370F19A6709FF 掘金教程

### AI 聊天 思路

- AI Node 服务抽离
- Socket 设置房间
- Node 服务记录用户调用频率、IP、浏览器指纹
- 控制单日总次数、单用户频率
