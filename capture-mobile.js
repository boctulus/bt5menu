const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();
  await page.goto('file:///D:/laragon/www/bt5menu/index.html');
  await page.waitForTimeout(1000);

  // Hacer clic en hamburguesa
  await page.click('#sidebarCollapse');
  await page.waitForTimeout(1000);

  // Screenshot
  await page.screenshot({ path: 'docs/ANALISIS-MOVIL.png', fullPage: true });

  console.log('Screenshot guardado en: docs/ANALISIS-MOVIL.png');

  await browser.close();
})();
