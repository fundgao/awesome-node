# Ubuntu Server

## 远程 SSH

- `ssh username@ip`
- pwd
- 关机命令 `sudo shutdown -h now`

## 1Panel

- 安装 1Panel `curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh`
- 查看 1panel 信息 `sudo 1pctl user-info`

## Node

- 安装 nvm (Node 版本管理器)
  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash`

- 下载并安装 Node.js（可能需要重启终端）
  `nvm install 22`

- 验证环境中是否存在正确的 Node.js 版本
  `node -v`

- 验证环境中是否存在正确的 npm 版本
  `npm -v`

## 内网穿透 cpolar

- https://www.cpolar.com
- 下载解压
- `./cpolar authtoken ZjJkZDIxYjAtMjM4ZS00ODAxLTkxM2QtOTcyZDQ5NDIyMzRl`
- `./cpolar http 80`

## Git 自带需配置
