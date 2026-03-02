import puppeteer from 'puppeteer-core';

async function getBrowser() {
  // Docker / self-hosted: use system Chromium via CHROME_PATH
  if (process.env.CHROME_PATH) {
    return puppeteer.launch({
      executablePath: process.env.CHROME_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      headless: true,
    });
  }

  // Vercel serverless: use @sparticuz/chromium bundled binary
  if (process.env.VERCEL) {
    const chromium = await import('@sparticuz/chromium');
    return puppeteer.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  }

  // Dev: use local Chrome/Chromium
  const candidates = [
    // Windows
    'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files\\\\Chromium\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files (x86)\\\\Chromium\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];

  for (const path of candidates) {
    try {
      const { accessSync } = await import('fs');
      accessSync(path);
      return puppeteer.launch({ executablePath: path, headless: true });
    } catch {
      continue;
    }
  }

  throw new Error('No Chrome/Chromium found. Install Google Chrome or set CHROME_PATH.');
}

export async function generatePdf(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
