const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on('console', msg => console.log(`[${msg.type()}]`, msg.text()));
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4500));

  // Get document state
  const info = await page.evaluate(() => ({
    scrollY: window.scrollY,
    docHeight: document.documentElement.scrollHeight,
    viewportH: window.innerHeight,
    hasLenis: !!window.lenis,
    sceneHeroOffset: document.getElementById('scene-hero')?.offsetTop,
    sceneOriginOffset: document.getElementById('scene-origin')?.offsetTop,
    sceneRoastOffset: document.getElementById('scene-roast')?.offsetTop,
    sceneGrindOffset: document.getElementById('scene-grind')?.offsetTop,
    roastCanvas: !!document.getElementById('roast-canvas'),
    roastCanvasRect: document.getElementById('roast-canvas')?.getBoundingClientRect(),
  }));
  console.log('PAGE INFO:', JSON.stringify(info, null, 2));

  // Try scrolling using lenis with proper API
  await page.evaluate(() => {
    if (window.lenis) {
      window.lenis.scrollTo(4000, { immediate: true, lock: true, force: true });
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  const after = await page.evaluate(() => ({
    scrollY: window.scrollY,
    lenisScroll: window.lenis?.scroll,
  }));
  console.log('AFTER lenis.scrollTo(4000):', JSON.stringify(after));

  await page.screenshot({ path: 'debug-after-lenis.png' });

  // Also try manual scroll
  await page.evaluate(() => {
    if (window.lenis) { window.lenis.destroy(); }
    window.scrollTo(0, 4000);
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
      window.ScrollTrigger.update();
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  const after2 = await page.evaluate(() => ({ scrollY: window.scrollY }));
  console.log('AFTER native scroll(4000):', JSON.stringify(after2));
  await page.screenshot({ path: 'debug-after-native.png' });

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
