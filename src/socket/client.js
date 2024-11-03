import { io } from "socket.io-client";

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
