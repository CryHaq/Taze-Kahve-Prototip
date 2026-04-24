const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4500));

  // Smooth scroll incrementally so ScrollTrigger updates properly
  const targets = [800, 1600, 2400, 3200, 4000, 4500];
  for (const y of targets) {
    await page.evaluate((to) => {
      if (window.lenis) window.lenis.scrollTo(to, { immediate: true, force: true });
    }, y);
    await new Promise(r => setTimeout(r, 600));
  }
  // Force ScrollTrigger refresh & update
  await page.evaluate(() => {
    if (window.ScrollTrigger) {
      window.ScrollTrigger.update();
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const state = await page.evaluate(() => {
    const pin = document.querySelector('.roast-pin');
    const canvas = document.getElementById('roast-canvas');
    const pinRect = pin?.getBoundingClientRect();
    const canvasRect = canvas?.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      pinTop: pin ? getComputedStyle(pin).top : null,
      pinTransform: pin ? getComputedStyle(pin).transform : null,
      pinPos: pin ? getComputedStyle(pin).position : null,
      pinRect: {x:pinRect?.x, y:pinRect?.y, w:pinRect?.width, h:pinRect?.height},
      canvasRect: {x:canvasRect?.x, y:canvasRect?.y, w:canvasRect?.width, h:canvasRect?.height},
    };
  });
  console.log('STATE:', JSON.stringify(state, null, 2));
  await page.screenshot({ path: 'debug3-shot.png' });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
