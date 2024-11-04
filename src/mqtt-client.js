/*
 * MQTT 版
 */
import mqtt from "mqtt";
const config_mqtt = {
  username: "wechatbot",
  pwd: "Wechatbot2024!",
  host: "baf6b77f.ala.cn-hangzhou.emqxsl.cn",
  port: "8883",
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  topic: "tweetmonitor",
};

const main = () => {
  const connectUrl = `mqtt://${config_mqtt.host}:${config_mqtt.port}`;
  const client = mqtt.connect(connectUrl, {
    clientId: config_mqtt.clientId,
    clean: true,
    connectTimeout: 4000,
    username: config_mqtt.username,
    password: config_mqtt.pwd,
    reconnectPeriod: 1000,
  });
  client.on("connect", () => {
    client.subscribe([config_mqtt.topic], () => {
      console.log(`Subscribe to topic '${config_mqtt.topic}'`);
    });
  });
  client.on("message", (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
    pushData = payload;
  });
};

main();
