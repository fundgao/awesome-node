import fs from "fs";
import nodemailer from "nodemailer";

/**
 * https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac22b85ac2e7c90cd63
 * POP3服务器: pop.163.com
 * SMTP服务器: smtp.163.com
 * IMAP服务器: imap.163.com
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

async function main() {
  const info = await transporter.sendMail({
    from: '"Fund" <fundgao@163.com>',
    to: "musk@gmail.com",
    subject: "Hello Musk",
    // text: "Hello Musk",
    html: fs.readFileSync("./birds.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
