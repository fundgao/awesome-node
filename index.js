/*
 * @Desc: 本地插件版
 * @Author: lwp
 * @Date: 2020-08-13 15:20:49
 * @LastEditors: lwp
 * @LastEditTime: 2020-08-13 17:15:06
 */

const { WechatyBuilder } = require("wechaty");
const { PUPPET_PADLOCAL_TOKEN, BOT_NAME } = require("./config");
const FriendPass = require("./plugin/friends-pass");
const RoomJoin = require("./plugin/room-join");
const RoomInvite = require("./plugin/room-invite");
const RoomRemove = require("./plugin/room-remove");
const AutoReply = require("./plugin/auto-reply");
const { QRCodeTerminal, EventLogger } = require("wechaty-plugin-contrib"); //官方插件

const ROOM_ID = [
  "@@f2785eec687d045c5f84ed693d87604f9fb7a20017cdd7f0359ef1a2f12f363d", // 雷总群
  "@@16299fe5d0f5f0d631c276925b4072a506d9d66b524c7e98950cf9975cbf3e2c", // 米奇资本二号房
];

// 初始化
const wechaty = WechatyBuilder.build();
//登录二维码
wechaty.use(QRCodeTerminal({ small: false }));
//日志输出
wechaty.use(EventLogger());
//好友自动通过
wechaty.use(
  FriendPass({
    keyword: ["加群", "机器人"],
    reply: `你好，我是机器人${BOT_NAME} \n\n 加入技术交流群请回复【加群】`,
    blackId: [],
  })
);
// 加入房间欢迎
wechaty.use(
  RoomJoin({
    reply: [
      {
        name: "机器人测试",
        roomId: "xxx@chatroom",
        reply: `\n 你好，欢迎加入`,
      },
    ],
  })
);
//加入房间邀请
wechaty.use(
  RoomInvite({
    keyword: ["加群", "入群"],
    reply: "",
    roomList: [
      {
        name: "机器人测试",
        roomId: "xxx@chatroom",
        code: "A", //群编号
        label: "标签",
      },
    ],
  })
);
// 指令踢人
wechaty.use(
  RoomRemove({
    keyword: ["👊", "踢", "👎"],
    adminList: [
      {
        name: "小小",
        id: "wxid_xxxxx", //管理员id
      },
    ],
    time: 3000,
    replyDone: "done",
    replyNoPermission: "没有踢人权限哦",
  })
);
//关键词自动回复
wechaty.use(
  AutoReply({
    keywords: [{ keyword: "测试", content: "test" }],
  })
);

wechaty
  .on("error", (error) => {
    console.error(error);
  })
  .start();
