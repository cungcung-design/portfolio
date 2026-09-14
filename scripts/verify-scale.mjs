import { chromium } from "playwright";

const LOCAL = "http://localhost:5173/portofolio/";

async function measure(page) {
  await page.waitForSelector(".hero", { timeout: 20000 });
  await page.waitForSelector(".pc-card-wrapper", { timeout: 20000 });
  await page.waitForTimeout(400);
  return page.evaluate(() => {
    const html = getComputedStyle(document.documentElement);
    const h1 = document.querySelector(".hero h1");
    const navLinks = document.querySelector("nav ul.hidden, nav ul.lg\\:flex, nav .navbar ul");
    const desktopLinks = document.querySelector("nav ul.hidden.lg\\:flex, nav ul.lg\\:flex");
    const hamburger = document.querySelector("nav button[aria-controls='mobile-nav']");
    const card = document.querySelector(".pc-card-wrapper");
    const wrap = document.querySelector("#root > div.relative");
    const main = document.querySelector("main");
    const about = document.querySelector("#about");
    const tool = document.querySelector(".tools-box > div");
    return {
      inner: innerWidth,
      htmlFont: html.fontSize,
      h1: h1 ? getComputedStyle(h1).fontSize : null,
      navDesktop: desktopLinks ? getComputedStyle(desktopLinks).display : null,
      hamburger: hamburger ? getComputedStyle(hamburger).display : null,
      card: card ? Math.round(card.getBoundingClientRect().width) : null,
      wrap: wrap ? Math.round(wrap.getBoundingClientRect().width) : null,
      main: main ? Math.round(main.getBoundingClientRect().width) : null,
      about: about ? Math.round(about.getBoundingClientRect().width) : null,
      tool: tool ? Math.round(tool.getBoundingClientRect().width) : null,
      heroH: document.querySelector(".hero")
        ? Math.round(document.querySelector(".hero").getBoundingClientRect().height)
        : null,
    };
  });
}

const browser = await chromium.launch({ headless: true });
for (const width of [390, 768, 1024, 1280, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(LOCAL, { waitUntil: "domcontentloaded" });
  const data = await measure(page);
  console.log(width, JSON.stringify(data));
  await page.screenshot({ path: `scripts/scale-${width}.png` });
  await page.close();
}
await browser.close();
