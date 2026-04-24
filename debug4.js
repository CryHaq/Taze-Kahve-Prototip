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
  await page.evaluate(() => window.lenis.scrollTo(4500, {immediate:true, force:true}));
  await new Promise(r => setTimeout(r, 1500));

  const info = await page.evaluate(() => {
    const sps = document.querySelectorAll('.pin-spacer');
    const spArr = Array.from(sps).map(s => ({
      offsetTop: s.offsetTop,
      offsetHeight: s.offsetHeight,
      paddingTop: getComputedStyle(s).paddingTop,
      paddingBottom: getComputedStyle(s).paddingBottom,
      parentInfo: (s.parentElement?.tagName || '') + '#' + (s.parentElement?.id || ''),
      firstChildClass: s.children[0]?.className || '',
    }));
    return JSON.stringify(spArr);
  });
  console.log('PIN SPACERS:', info);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
