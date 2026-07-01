const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 4000));
  
  const html = await page.evaluate(() => document.querySelector('main')?.outerHTML || 'NO MAIN TAG');
  fs.writeFileSync('main-dump.html', html);
  
  await page.screenshot({ path: 'home-screenshot.png' });
  
  await browser.close();
})();
