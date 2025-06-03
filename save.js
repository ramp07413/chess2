const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });

  // Load saved session from storage.json
  const storagePath = path.resolve(__dirname, 'storage.json');
  const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

  const context = await browser.newContext({ storageState });

  const page = await context.newPage();
  url

  // Ab aap directly Chess.com ke authorized page pe ja sakte hain
  await page.goto('https://www.chess.com/home', { waitUntil: 'networkidle' });

  console.log('Page title:', await page.title());

  // Aap yahan se apni zarurat ke mutabiq aur scraping ya interaction kar sakte hain

  await browser.close();
})();
