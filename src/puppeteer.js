import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

// 随即延迟
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 设置 User-Agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
  );

  // 禁用 WebGL 和 WebRTC
  await page.evaluate(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
    window.open = function () {};
    window.alert = function () {};
    window.confirm = function () {};
  });

  // 模拟用户行为
  await delay(Math.random() * 5000 + 2000); // 随机等待 2 到 7 秒

  // 填充表单并提交
  //   await page.type("#inputField", "Hello World!", { delay: 100 });
  //   await page.click("#submitButton");

  // Navigate the page to a URL.
  await page.goto("https://developer.chrome.com/");

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // 截图
  //   await page.screenshot({ path: "screenshot.png" });

  // Type into search box.
  await page.locator(".devsite-search-field").fill("automate beyond recorder");

  // Wait and click on first result.
  await page.locator(".devsite-result-item-link").click();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator("text/Customize and automate")
    .waitHandle();
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
};

main();
