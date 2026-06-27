import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const baseUrl = process.env.BASE_URL ?? 'http://localhost:4201';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../cypress/snapshots/visual-regression.cy.ts');
const outFile = path.join(outDir, 'order-detail-branded.snap.png');

const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
await page.fill('input[formcontrolname="username"]', 'analyst');
await page.fill('input[formcontrolname="password"]', 'demo123');
await page.evaluate(() => {
  const form = document.querySelector('form');
  form?.requestSubmit();
});
await page.waitForSelector('[data-testid="dashboard-page"]');
await page.click('[data-testid="order-row-ORD-1001"]');
await page.waitForSelector('[data-testid="order-detail-page"]');
await page.waitForSelector('[data-testid="legacy-trend"]');

const element = page.locator('.order-detail-page');
await mkdir(outDir, { recursive: true });
await element.screenshot({ path: outFile });

await browser.close();
console.log(`Saved baseline: ${outFile}`);
