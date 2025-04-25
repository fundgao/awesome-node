const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/run", (req, res) => {
  try {
    const { code } = req.body;
    console.log(`接收到代码：${code}`);

    const match = code.match(/^([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\((.*)\)$/);
    if (!match)
      throw new Error("格式错误，应为 module.function(arg1, arg2...)");

    const [, moduleName, functionName, argsStr] = match;

    const modulePath = path.join(__dirname, "scripts", `${moduleName}.js`);
    if (!fs.existsSync(modulePath))
      throw new Error(`模块 ${moduleName} 不存在`);

    const mod = require(modulePath);
    const func = mod[functionName];
    if (typeof func !== "function")
      throw new Error(`函数 ${functionName} 不存在`);

    const args = eval(`[${argsStr}]`);

    const result = func(...args);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`预览 http://localhost:${PORT}`);
});
