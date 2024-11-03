import { createServer } from "http";
import { Server } from "socket.io";
import OpenAI from "openai";

const ARK_API_KEY = "xxxxxxxxxxxxxxxxx";
const client = new OpenAI({
  apiKey: ARK_API_KEY,
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
});

const main = async () => {
  //   const resp = await client.embeddings.create({
  //     model: "ep-20241011104353-d2xr4",
  //     input: ["花椰菜又称菜花、花菜，是一种常见的蔬菜。"],
  //   });
  //   console.log("resp", resp);

  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: true, // 允许跨域
  });

  io.on("connection", (socket) => {
    // 默认空间
  });
  // ---------------------aichat---------------------
  const namespace = "/aichat";
  const aichat = io.of(namespace);
  aichat.on("connection", (socket) => {
    const { handshake, data } = socket;
    socket.emit("data", "登录成功");
    socket.on("message", (arg1, arg2) => {
      console.log("message", arg1);
      console.log("message", arg2);
    });
    // 进入 room1
    // socket.join("room1");
    // 离开 room1
    // socket.leave("room1");
  });

  httpServer.listen(3003);
};

main();
