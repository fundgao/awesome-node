import puppeteer from "puppeteer";
// Or
// import puppeteer from "puppeteer-core";

// 随即延迟
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AndriodUA =
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36";

const WebUA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36";

// 涨幅榜
const URL_zhang_fu = "https://m.10jqka.com.cn/hq/rank/";
// 行情中心
const URL_hang_qing = "https://m.10jqka.com.cn/stockpage/hq#aSwipe=1";

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // 设置 User-Agent
  await page.setUserAgent(AndriodUA);

  // 禁用 WebGL 和 WebRTC
  await page.evaluate(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
    window.open = function () {};
    window.alert = function () {};
    window.confirm = function () {};
  });

  // Navigate the page to a URL.
  await page.goto(URL_zhang_fu, {
    waitUntil: "networkidle2", // 等待网络空闲
    timeout: 60000, // 设置超时时间
  });

  // Set screen size.
  await page.setViewport({ width: 430, height: 932 });

  // 点击更多
  await page.locator(".more_link").click();

  // 模拟用户行为
  await delay(Math.random() * 5000 + 2000); // 随机等待 2 到 7 秒

  // 使用CSS选择器获取涨幅榜信息
  const stockData = await page.evaluate(() => {
    // 查找涨幅榜列表元素
    const promotions = document.querySelectorAll(".marketStocks li");

    // 提取涨幅榜信息
    const data = [];
    promotions.forEach((item) => {
      const textArray = item.innerText.split("\n");
      const [stock, price, change, volume, turnover_rate] = textArray;
      data.push({
        stock,
        price,
        change,
        volume,
        turnover_rate,
      });
    });
    return data;
  });

  // 输出抓取的数据
  console.log("涨幅榜信息:");
  stockData.forEach((stock, index) => {
    console.log(`  股票名称: ${stock.stock}`);
    console.log(`  价格: ${stock.price}`);
    console.log(`  涨跌幅: ${stock.change}`);
    console.log(`  成交量: ${stock.volume}`);
    console.log(`  换手率: ${stock.turnover_rate}`);
  });

  // TODO 上传接口

  await browser.close();
};

main();
