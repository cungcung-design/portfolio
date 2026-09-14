import { chromium } from "playwright";

const widths = [390, 480, 767, 768, 1023, 1024, 1279, 1280, 1366, 1440];
const browser = await chromium.launch({ headless: true });

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto("http://localhost:5173/portofolio/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".tools-box", { timeout: 20000 });
  await page.locator(".tools").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const info = await page.evaluate(() => {
    const box = document.querySelector(".tools-box");
    const cards = [...box.querySelectorAll(":scope > div")];
    const cs = getComputedStyle(box);
    const first = cards[0]?.getBoundingClientRect();
    const heights = [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().height)))];
    const widths = [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().width)))];
    return {
      inner: innerWidth,
      gridW: Math.round(box.getBoundingClientRect().width),
      cols: cs.gridTemplateColumns.split(" ").length,
      colTemplate: cs.gridTemplateColumns,
      gap: cs.gap,
      cards: cards.length,
      cardW: first ? Math.round(first.width) : null,
      cardH: first ? Math.round(first.height) : null,
      uniqueW: widths,
      uniqueH: heights,
      scroll: document.documentElement.scrollWidth,
    };
  });
  console.log(width, JSON.stringify(info));
  await page.close();
}
await browser.close();
