import fs from "fs";
import os from "os";
import nodemailer from "nodemailer";
import schedule from "node-schedule";

/**
 * https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac22b85ac2e7c90cd63
 * POP3服务器: pop.163.com
 * SMTP服务器: smtp.163.com
 * IMAP服务器: imap.163.com
 *
 * nodemailer、keyv插件实现免费的邮件验证码注册功能 TODO
 * https://www.npmjs.com/package/keyv
 *
 * 因为宽带是动态IP，要访问服务器需要最新ip
 * 定时任务
 */

const transporter = nodemailer.createTransport({
  host: "pop.163.com",
  port: 25,
  secure: false,
  auth: {
    user: "fundgao@163.com",
    pass: "你的授权码",
  },
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const details of interfaces[key]) {
      if (details.family === "IPv4" && !details.internal) {
        return details.address;
      }
    }
  }
  return ""; // 若未找到合适的IP地址，则返回空字符串
}

async function main() {
  const ip = getLocalIP();
  const info = await transporter.sendMail({
    from: '"Fund" <fundgao@163.com>',
    to: "musk@gmail.com",
    subject: "Hello Musk",
    text: `当前本机IP地址为: ${ip}`,
    html: fs.readFileSync("./birds.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}
// 秒     分     时     日    星期几
// 0-59  0-59  0-23   1-31   0-7
const job = schedule.scheduleJob("00 30 08 * * *", function () {
  main().catch(console.error);
});
