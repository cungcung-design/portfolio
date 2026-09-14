import { chromium } from "playwright";

const LOCAL = "http://localhost:5173/portofolio/";
const PROD = "https://portofolio-main-flame.vercel.app/";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

async function measure(page) {
  await page.waitForTimeout(1200);
  return page.evaluate(() => {
    const pick = (sel) => document.querySelector(sel);
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        maxW: s.maxWidth,
        pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        font: s.fontSize,
        fontFamily: s.fontFamily.split(",")[0].replace(/"/g, ""),
      };
    };

    const nav = pick("nav.navbar");
    const hero = pick(".hero");
    const heroLeft = hero?.children?.[0] || null;
    const card = pick(".pc-card");
    const avatar = pick(".pc-avatar-content .avatar");
    const about = pick("#about");
    const toolsCard = pick(".tools-box > div");
    const projectCard = pick(".chroma-card");
    const projectImg = pick(".chroma-card img");
    const contact = pick(".kontak form");
    const footer = pick("footer, .section-gap.pb-8");
    const wrap = document.querySelector("#root > div.relative") || document.querySelector(".container");
    const main = pick("main");
    const h1 = pick(".hero h1");
    const p = pick(".hero p, .hero .mb-7");
    const lanyard = pick(".lanyard-wrapper");
    const canvas = pick(".lanyard-wrapper canvas");

    return {
      viewport: { w: innerWidth, h: innerHeight },
      scrollW: document.documentElement.scrollWidth,
      wrap: box(wrap),
      main: box(main),
      nav: box(nav),
      navFont: nav ? getComputedStyle(nav.querySelector("a, h1") || nav).fontSize : null,
      hero: box(hero),
      heroLeft: box(heroLeft),
      h1: box(h1),
      heroText: box(p),
      card: box(card),
      avatar: box(avatar),
      about: box(about),
      toolsCard: box(toolsCard),
      projectCard: box(projectCard),
      projectImg: box(projectImg),
      contact: box(contact),
      footer: box(footer),
      lanyard: box(lanyard),
      lanyardCanvas: box(canvas),
    };
  });
}

function diff(a, b, path = "") {
  const out = [];
  if (a == null || b == null) {
    if (a !== b) out.push(`${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
    return out;
  }
  if (typeof a !== "object") {
    if (a !== b) out.push(`${path}: ${a} vs ${b}`);
    return out;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) out.push(...diff(a[k], b[k], path ? `${path}.${k}` : k));
  return out;
}

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const localPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const prodPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await localPage.goto(LOCAL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await prodPage.goto(PROD, { waitUntil: "domcontentloaded", timeout: 60000 });
  await localPage.waitForSelector(".pc-card", { timeout: 20000 });
  await prodPage.waitForSelector(".pc-card", { timeout: 20000 });
  const local = await measure(localPage);
  const prod = await measure(prodPage);
  console.log(`\n===== ${vp.name} ${vp.width}x${vp.height} =====`);
  console.log("LOCAL", JSON.stringify(local, null, 0));
  console.log("PROD ", JSON.stringify(prod, null, 0));
  const changes = diff(local, prod).filter((line) => !line.includes("fontFamily"));
  if (!changes.length) console.log("No differences");
  else console.log(changes.join("\n"));
  await localPage.screenshot({ path: `scripts/local-${vp.name}.png`, fullPage: false });
  await prodPage.screenshot({ path: `scripts/prod-${vp.name}.png`, fullPage: false });
  await localPage.close();
  await prodPage.close();
}

await browser.close();
