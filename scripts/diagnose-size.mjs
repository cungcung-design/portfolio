import { chromium } from "playwright";

const targets = [
  { name: "LOCAL", url: process.env.LOCAL_URL || "http://localhost:5173/portofolio/" },
  { name: "PREVIEW", url: process.env.PREVIEW_URL || "http://localhost:4173/portofolio/" },
  { name: "PROD", url: "https://cruzdeveloper.com/" },
  { name: "VERCEL", url: "https://portofolio-main-flame.vercel.app/" },
];

const WIDTH = Number(process.env.VP_WIDTH || 1440);
const HEIGHT = Number(process.env.VP_HEIGHT || 900);

const KEY_CSS = [
  ".container",
  ".max-w-7xl",
  ".text-4xl",
  ".text-3xl",
  ".sm\\:text-4xl",
  ".md\\:text-3xl",
  ".px-6",
  ".mx-auto",
];

async function diagnose(page, label, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".hero", { timeout: 25000 });
  await page.waitForSelector(".pc-card", { timeout: 25000 });
  await page.waitForFunction(() => !document.querySelector(".fixed.inset-0.z-\\[10000\\]"), { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(600);

  const data = await page.evaluate(async (keyCss) => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = cs(el);
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        x: Math.round(r.x),
        maxW: s.maxWidth,
        width: s.width,
        pad: `${s.paddingTop}/${s.paddingRight}/${s.paddingBottom}/${s.paddingLeft}`,
        margin: `${s.marginTop}/${s.marginRight}/${s.marginBottom}/${s.marginLeft}`,
        font: s.fontSize,
        line: s.lineHeight,
        family: s.fontFamily,
        display: s.display,
        transform: s.transform,
        zoom: s.zoom,
      };
    };

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const wrap = document.querySelector("#root > div.relative");
    const main = document.querySelector("main");
    const hero = document.querySelector(".hero");
    const h1 = document.querySelector(".hero h1");
    const card = document.querySelector(".pc-card-wrapper");
    const about = document.querySelector("#about");
    const nav = document.querySelector("nav.navbar");

    const sheets = [...document.styleSheets].map((s) => s.href);
    const cssHrefs = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href);

    let cssText = "";
    for (const href of cssHrefs) {
      try {
        const res = await fetch(href);
        cssText += await res.text();
      } catch {
        cssText += `/* fail ${href} */`;
      }
    }

    const present = {};
    for (const cls of keyCss) {
      present[cls] = cssText.includes(cls.replace(/\\/g, "\\")) || cssText.includes(cls.replace(/^\./, ".").replace(/\\/g, ""));
    }

    // More reliable: test computed utility via a probe
    const probe = document.createElement("div");
    probe.className = "max-w-7xl text-4xl container mx-auto";
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    document.body.appendChild(probe);
    const probeCs = getComputedStyle(probe);
    const probeInfo = {
      maxW: probeCs.maxWidth,
      font: probeCs.fontSize,
      width: probeCs.width,
    };
    probe.remove();

    return {
      href: location.href,
      statusReady: true,
      innerWidth,
      devicePixelRatio,
      visualViewport: visualViewport
        ? { w: visualViewport.width, h: visualViewport.height, scale: visualViewport.scale }
        : null,
      htmlFont: cs(html).fontSize,
      htmlZoom: cs(html).zoom,
      htmlTransform: cs(html).transform,
      htmlTextSizeAdjust: cs(html).textSizeAdjust || cs(html).webkitTextSizeAdjust,
      bodyFont: cs(body).fontSize,
      bodyFamily: cs(body).fontFamily,
      bodyZoom: cs(body).zoom,
      rootFont: cs(root).fontSize,
      sectionGap: cs(html).getPropertyValue("--section-gap").trim(),
      stylesheets: sheets,
      cssHrefs,
      cssBytes: cssText.length,
      cssHas: present,
      cssHasPoppins: cssText.toLowerCase().includes("poppins") || cs(body).fontFamily.toLowerCase().includes("poppins"),
      probe: probeInfo,
      wrap: box(wrap),
      wrapClass: wrap?.className || null,
      main: box(main),
      mainClass: main?.className || null,
      nav: box(nav),
      hero: box(hero),
      heroGrid: cs(hero)?.gridTemplateColumns,
      heroGap: cs(hero)?.gap,
      h1: box(h1),
      h1Class: h1?.className || null,
      card: box(card),
      about: box(about),
      missingImgs: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
    };
  }, KEY_CSS);

  return { label, url, http: response?.status() || null, ...data };
}

function pick(obj) {
  return {
    http: obj.http,
    href: obj.href,
    innerWidth: obj.innerWidth,
    dpr: obj.devicePixelRatio,
    vvScale: obj.visualViewport?.scale,
    htmlFont: obj.htmlFont,
    bodyFont: obj.bodyFont,
    bodyFamily: obj.bodyFamily,
    sectionGap: obj.sectionGap,
    cssHrefs: obj.cssHrefs,
    cssBytes: obj.cssBytes,
    cssHas: obj.cssHas,
    probe: obj.probe,
    wrap: obj.wrap && { w: obj.wrap.w, maxW: obj.wrap.maxW, pad: obj.wrap.pad },
    main: obj.main && { w: obj.main.w, maxW: obj.main.maxW, pad: obj.main.pad, font: obj.main.font },
    hero: obj.hero && { w: obj.hero.w, h: obj.hero.h, font: obj.hero.font },
    heroGrid: obj.heroGrid,
    heroGap: obj.heroGap,
    h1: obj.h1 && { w: obj.h1.w, h: obj.h1.h, font: obj.h1.font, line: obj.h1.line },
    card: obj.card && { w: obj.card.w, h: obj.card.h, width: obj.card.width },
    about: obj.about && { w: obj.about.w, h: obj.about.h, pad: obj.about.pad },
    missingImgs: obj.missingImgs,
  };
}

const browser = await chromium.launch({ headless: true });
const results = [];

for (const t of targets) {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  try {
    const row = await diagnose(page, t.name, t.url);
    results.push(row);
    console.log(`\n========== ${t.name} @ ${WIDTH}x${HEIGHT} ==========`);
    console.log(JSON.stringify(pick(row), null, 2));
    await page.screenshot({ path: `scripts/diag-${t.name.toLowerCase()}-${WIDTH}.png` });
  } catch (error) {
    console.log(`\n========== ${t.name} FAILED ==========`);
    console.log(String(error));
    results.push({ label: t.name, error: String(error) });
  }
  await page.close();
}

await browser.close();

const ok = results.filter((r) => !r.error);
if (ok.length >= 2) {
  const base = ok[0];
  for (const other of ok.slice(1)) {
    const keys = [
      ["htmlFont"],
      ["bodyFont"],
      ["sectionGap"],
      ["probe", "maxW"],
      ["probe", "font"],
      ["wrap", "w"],
      ["wrap", "maxW"],
      ["main", "w"],
      ["main", "maxW"],
      ["hero", "w"],
      ["hero", "h"],
      ["h1", "font"],
      ["h1", "h"],
      ["card", "w"],
      ["card", "h"],
      ["about", "w"],
      ["heroGap"],
    ];
    const diffs = [];
    for (const path of keys) {
      const a = path.reduce((o, k) => o?.[k], base);
      const b = path.reduce((o, k) => o?.[k], other);
      if (a !== b) diffs.push(`${path.join(".")}: ${base.label}=${a} ${other.label}=${b}`);
    }
    console.log(`\n----- DIFF ${base.label} vs ${other.label} -----`);
    console.log(diffs.length ? diffs.join("\n") : "No size/CSS diffs on measured keys");
  }
}
