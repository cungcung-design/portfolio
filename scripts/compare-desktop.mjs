import { chromium } from "playwright";

const LOCAL = "http://localhost:5173/portofolio/";
const PROD = "https://portofolio-main-flame.vercel.app/";

async function info(page) {
  await page.waitForSelector(".hero", { timeout: 20000 });
  await page.waitForTimeout(800);
  return page.evaluate(() => {
    const hero = document.querySelector(".hero");
    const wrap = document.querySelector("#root > div.relative");
    const main = document.querySelector("main");
    const card = document.querySelector(".pc-card");
    const cardWrap = document.querySelector(".pc-card-wrapper");
    const hs = getComputedStyle(hero);
    const ws = wrap ? getComputedStyle(wrap) : null;
    const heroRect = hero.getBoundingClientRect();
    const left = hero.children[0]?.getBoundingClientRect();
    const right = hero.children[1]?.getBoundingClientRect();
    const cardRect = card?.getBoundingClientRect();
    return {
      cssHref: document.querySelector('link[rel="stylesheet"]')?.href || null,
      wrapW: wrap ? Math.round(wrap.getBoundingClientRect().width) : null,
      wrapMax: ws?.maxWidth,
      wrapClass: wrap?.className,
      mainW: main ? Math.round(main.getBoundingClientRect().width) : null,
      heroDisplay: hs.display,
      heroGrid: hs.gridTemplateColumns,
      heroGap: hs.gap,
      heroW: Math.round(heroRect.width),
      left: left ? { x: Math.round(left.x), w: Math.round(left.width), h: Math.round(left.height) } : null,
      right: right ? { x: Math.round(right.x), w: Math.round(right.width), h: Math.round(right.height) } : null,
      card: cardRect ? { x: Math.round(cardRect.x), w: Math.round(cardRect.width), h: Math.round(cardRect.height) } : null,
      cardWrapW: cardWrap ? getComputedStyle(cardWrap).width : null,
    };
  });
}

const browser = await chromium.launch({ headless: true });
for (const width of [1280, 1440, 1536, 1920]) {
  const localPage = await browser.newPage({ viewport: { width, height: 900 } });
  const prodPage = await browser.newPage({ viewport: { width, height: 900 } });
  await localPage.goto(LOCAL, { waitUntil: "domcontentloaded" });
  await prodPage.goto(PROD, { waitUntil: "domcontentloaded" });
  const local = await info(localPage);
  const prod = await info(prodPage);
  console.log(`\n==== ${width} ====`);
  console.log("LOCAL", local);
  console.log("PROD ", prod);
  await localPage.screenshot({ path: `scripts/d-local-${width}.png` });
  await prodPage.screenshot({ path: `scripts/d-prod-${width}.png` });
  await localPage.close();
  await prodPage.close();
}
await browser.close();
