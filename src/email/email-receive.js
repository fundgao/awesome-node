import Imap from "imap";
import { MailParser } from "mailparser";
import fs from "fs";
import path from "path";

/**
 * https://nodemailer.com/extras/mailparser/
 * 收邮件是用 pop3 或者 imap 协议
 */

const imap = new Imap({
  user: "fundgao@163.com",
  password: "你的授权码",
  host: "imap.163.com",
  port: 993,
  tls: true,
});

imap.once("ready", () => {
  imap.openBox("INBOX", true, (err) => {
    imap.search(
      [["SEEN"], ["SINCE", new Date("2024-11-05 19:00:00").toLocaleString()]],
      (err, results) => {
        if (!err) {
          handleResults(results);
        } else {
          throw err;
        }
      }
    );
  });
});

function handleResults(results) {
  imap
    .fetch(results, {
      bodies: "",
    })
    .on("message", (msg) => {
      const mailparser = new MailParser();

      msg.on("body", (stream) => {
        const info = {};
        stream.pipe(mailparser);
        mailparser.on("headers", (headers) => {
          info.theme = headers.get("subject");
          info.form = headers.get("from").value[0].address;
          info.mailName = headers.get("from").value[0].name;
          info.to = headers.get("to").value[0].address;
          info.datatime = headers.get("date").toLocaleString();
        });

        mailparser.on("data", (data) => {
          if (data.type === "text") {
            info.html = data.html;
            info.text = data.text;
            const filePath = path.join(
              __dirname,
              "mails",
              info.theme + ".html"
            );
            fs.writeFileSync(filePath, info.html || info.text);
            console.log(info);
          }
          if (data.type === "attachment") {
            const filePath = path.join(__dirname, "files", data.filename);
            const ws = fs.createWriteStream(filePath);
            data.content.pipe(ws);
          }
        });
      });
    });
}

imap.connect();
