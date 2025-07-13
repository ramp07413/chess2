const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, slowMo: 1000 });

  const storagePath = path.resolve(__dirname, 'storage.json');

  // Load previous storage state if file exists
  const context = fs.existsSync(storagePath)
    ? await browser.newContext({ storageState: storagePath })
    : await browser.newContext();

  const page = await context.newPage();

  // Go to Chess.com home page (will auto-login if cookies valid)
  await page.goto('https://www.chess.com/home', { waitUntil: 'networkidle' });

  console.log('Page title:', await page.title());

  // ✅ Save updated cookies/localStorage etc. to file
  await context.storageState({ path: storagePath });

  await browser.close();
})();
