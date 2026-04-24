const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on('console', msg => {
    const t = msg.type();
    if (t === 'error' || t === 'warning') console.log(`[${t}]`, msg.text());
  });
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  // Wait for loader/scene init
  await new Promise(r => setTimeout(r, 4000));

  const shots = process.argv[2] === 'roast' ? [
    { name: 'roast-0',  y: 3600 },
    { name: 'roast-33', y: 4491 },
    { name: 'roast-66', y: 5382 },
    { name: 'roast-100', y: 6300 },
  ] : process.argv[2] === 'grind' ? [
    { name: 'grind-0',  y: 7200 },
    { name: 'grind-33', y: 7800 },
    { name: 'grind-66', y: 8400 },
    { name: 'grind-100', y: 9000 },
  ] : process.argv[2] === 'all' ? [
    { name: 'hero',    y: 0 },
    { name: 'origin',  y: 1100 },
    { name: 'roast-0', y: 3600 },
    { name: 'roast-50', y: 4950 },
    { name: 'roast-100', y: 6300 },
    { name: 'grind-0', y: 7200 },
    { name: 'grind-50', y: 8100 },
    { name: 'grind-100', y: 9000 },
    { name: 'products', y: 9800 },
  ] : [
    { name: 'roast-0',  y: 3600 },
    { name: 'grind-50', y: 8100 },
  ];

  // Destroy lenis so native scroll works for screenshots
  await page.evaluate(() => {
    if (window.lenis) { try { window.lenis.destroy(); } catch (e) {} window.lenis = null; }
    document.documentElement.classList.remove('lenis','lenis-smooth');
  });

  for (const s of shots) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
      // force ScrollTrigger to update
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, s.y);
    await new Promise(r => setTimeout(r, 1800));
    const actualY = await page.evaluate(() => window.scrollY);
    await page.screenshot({ path: `shot-${s.name}.png` });
    console.log(`captured ${s.name} target=${s.y} actual=${actualY}`);
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
