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

- 配置 user.name `git config --global user.name "name"`
- 配置 user.email `git config --global user.email "email"`
- 生成 SSH key `ssh-keygen -t rsa -C "email"`

## MySQL

- `sudo apt install mysql-server`
- `sudo mysql`
- `use mysql;` 注意分号
- 设置密码 `alter user 'root'@'localhost' identified with mysql_native_password by '密码';`

### MySQL 开启远程访问

- 修改配置 `sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf`
  注释掉 bind-address 这一行，将其修改为：

```
  # bind-address = 127.0.0.1
  bind-address = 0.0.0.0
```

- 重启 MySQL 服务 `sudo systemctl restart mysql`
- `mysql -u root -p`
- 开启端口 3306 `sudo ufw allow 3306/tcp`

