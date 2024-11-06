import { io } from "socket.io-client";
/**
 * 前端加解密之 Crypto Socket.io 使用加密 TODO
 * https://juejin.cn/post/7208837219212935228?searchId=2024110617061311F699F6B58A1131A476
 * https://www.jianshu.com/p/f94a6c8cafaa
 */
const onSocket = () => {
  const aichat = io("ws://localhost:3003/aichat");
  aichat.on("connect", () => {
    // 客户端给服务端发送消息
    aichat.emit("login", "123456");
    aichat.on("data", (data) => {
      console.log(data);
    });
    aichat.on("message", (arg1, arg2) => {
      console.log(arg1);
      console.log(arg2);
    });
  });
};

onSocket();
