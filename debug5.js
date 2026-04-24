const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  page.on('console', msg => { if (msg.type() === 'error') console.log('[err]', msg.text()); });
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4500));

  await page.evaluate(() => { if (window.lenis) { window.lenis.destroy(); window.lenis = null; } });

  for (const y of [3600, 4491, 5382, 6300]) {
    await page.evaluate((to) => { window.scrollTo(0, to); if (window.ScrollTrigger) window.ScrollTrigger.update(); }, y);
    await new Promise(r => setTimeout(r, 1800));
    const info = await page.evaluate(() => {
      const sts = window.ScrollTrigger ? window.ScrollTrigger.getAll() : [];
      const stProgress = sts.map(s => ({ trigger: s.trigger?.id || s.trigger?.className, progress: +s.progress.toFixed(3) }));
      return {
        scrollY: window.scrollY,
        stProgress: JSON.stringify(stProgress),
      };
    });
    console.log('y=', y, info);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
