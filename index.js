const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4001;
const storagePath = path.resolve(__dirname, 'storage.json');
const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

app.get('/search', async (req, res) => {
  const number = req.query.number;  // API call me ?number=12345 jaisa

  if (!number) {
    return res.status(400).json({ success: false, message: 'Query parameter "number" required' });
  }

  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ storageState });
    const page = await context.newPage();

    // Dynamic URL
    const url = `https://www.chess.com/analysis/game/live/${encodeURIComponent(number)}?tab=review`;
    await page.goto(url);

    // 10 second rukna
    await new Promise(r => setTimeout(r, 3000));

    await browser.close();

    res.json({ success: true, message: `Visited game number "${number}"` });
  } catch (err) {
    if (browser) await browser.close();
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
