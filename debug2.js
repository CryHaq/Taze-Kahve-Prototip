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

  // Scroll deep into roast
  await page.evaluate(() => {
    if (window.lenis) window.lenis.scrollTo(4500, { immediate: true, force: true });
  });
  await new Promise(r => setTimeout(r, 2000));

  const state = await page.evaluate(() => {
    const pin = document.querySelector('.roast-pin');
    const wrap = document.querySelector('.roast-canvas-wrap');
    const canvas = document.getElementById('roast-canvas');
    const pinRect = pin?.getBoundingClientRect();
    const wrapRect = wrap?.getBoundingClientRect();
    const canvasRect = canvas?.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      pinClass: pin?.className,
      pinPos: pin ? getComputedStyle(pin).position : null,
      pinRect: pinRect ? {x:pinRect.x, y:pinRect.y, w:pinRect.width, h:pinRect.height} : null,
      wrapRect: wrapRect ? {x:wrapRect.x, y:wrapRect.y, w:wrapRect.width, h:wrapRect.height} : null,
      canvasRect: canvasRect ? {x:canvasRect.x, y:canvasRect.y, w:canvasRect.width, h:canvasRect.height} : null,
      canvasInternalW: canvas?.width,
      canvasInternalH: canvas?.height,
      stRefreshes: window.ScrollTrigger?.getAll().length,
    };
  });
  console.log('STATE:', JSON.stringify(state, null, 2));

  // Take a viewport screenshot AND a full-page one
  await page.screenshot({ path: 'debug-viewport.png' });
  // Element screenshot
  const wrapHandle = await page.$('.roast-canvas-wrap');
  if (wrapHandle) {
    try { await wrapHandle.screenshot({ path: 'debug-canvas-wrap.png' }); }
    catch (e) { console.log('wrap shot err:', e.message); }
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
