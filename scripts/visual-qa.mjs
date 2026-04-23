/**
 * visual-qa.mjs — capture + lightweight critique of every route at three
 * viewports. Produces PNGs under visual-tests/<route>/ and a single
 * visual-tests/report.json summary.
 *
 * Run:   node scripts/visual-qa.mjs [--only <route>]
 *
 * Assumes the Vite dev server is running (or will be started) on :5175.
 * The script will boot the server itself if the port is unreachable.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import http from 'node:http';

const REPO = path.resolve(new URL('..', import.meta.url).pathname);
const OUT = path.join(REPO, 'visual-tests');
const BASE = 'http://localhost:5175';

const require = createRequire(
  new URL('../frontend/package.json', import.meta.url),
);
const { chromium } = require('@playwright/test');

const VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '834x1194', width: 834, height: 1194 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

const ROUTES = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about' },
  { slug: 'procedures', path: '/procedures' },
  { slug: 'bariatric', path: '/bariatric' },
  { slug: 'distinctions', path: '/distinctions' },
  { slug: 'transformations', path: '/transformations' },
  { slug: 'location', path: '/location' },
  { slug: 'consultation', path: '/consultation' },
  { slug: 'gallery', path: '/gallery' },
  { slug: 'notfound', path: '/this-page-does-not-exist' },
];

const args = process.argv.slice(2);
const onlyIndex = args.indexOf('--only');
const onlyRoute = onlyIndex >= 0 ? args[onlyIndex + 1] : null;

async function waitFor(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          resolve();
        });
        req.on('error', reject);
        req.setTimeout(1000, () => req.destroy(new Error('timeout')));
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return false;
}

async function ensureServer() {
  if (await waitFor(BASE, 1500)) return { owned: false, child: null };
  const child = spawn(
    'npm',
    ['run', 'dev', '--', '--port', '5175', '--strictPort'],
    { cwd: path.join(REPO, 'frontend'), stdio: 'ignore' },
  );
  const up = await waitFor(BASE, 30000);
  if (!up) {
    child.kill();
    throw new Error('dev server failed to start on :5175 within 30s');
  }
  return { owned: true, child };
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function analyzeShot({ filename, bytes, naturalHeight, width }) {
  const issues = [];
  // Heuristics on the *captured* file. Real perceptual critique is the
  // model's job; these are cheap sanity gates that survive a JSON report.
  if (bytes < 8_000) {
    issues.push(`suspiciously small (${bytes} bytes) — likely blank capture`);
  }
  if (naturalHeight && naturalHeight < 400 && width >= 1000) {
    issues.push(
      `short document for desktop viewport (${naturalHeight}px) — content may be missing`,
    );
  }
  return issues;
}

async function main() {
  await ensureDir(OUT);
  const server = await ensureServer();

  const browser = await chromium.launch();
  const report = {
    timestamp: new Date().toISOString(),
    shotCount: 0,
    failures: [],
    issues: [],
    qualityBar: null,
  };

  const wantRoutes = onlyRoute
    ? ROUTES.filter((r) => r.slug === onlyRoute)
    : ROUTES;

  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        colorScheme: 'light',
        serviceWorkers: 'block',
      });
      await ctx.addInitScript(() => {
        const s = document.createElement('style');
        s.innerHTML =
          '*,*::before,*::after{animation-duration:0ms!important;transition-duration:0ms!important}html{scroll-behavior:auto!important}';
        document.documentElement.appendChild(s);
      });
      const page = await ctx.newPage();

      for (const r of wantRoutes) {
        try {
          await page.goto(BASE + r.path, { waitUntil: 'domcontentloaded' });
          await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
          await page.evaluate(async () => {
            if (document.fonts?.ready) await document.fonts.ready;
          });
          await page.waitForTimeout(600);

          const dir = path.join(OUT, r.slug);
          await ensureDir(dir);
          const file = path.join(dir, `default-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: true });
          const stat = await fs.stat(file);
          const docH = await page.evaluate(() => document.body.scrollHeight);
          const heur = analyzeShot({
            filename: file,
            bytes: stat.size,
            naturalHeight: docH,
            width: vp.width,
          });
          for (const h of heur) {
            report.issues.push({
              severity: 'major',
              where: `${r.slug}/default-${vp.name}`,
              what: h,
              likelyFix: 'open the screenshot and inspect the page at this viewport',
            });
          }
          report.shotCount++;
        } catch (err) {
          report.failures.push(`${r.slug}/${vp.name}: ${err.message}`);
        }
      }

      // State: mobile drawer (any viewport below lg).
      try {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(200);
        const menuBtn = page.getByRole('button', { name: /open navigation/i });
        if (await menuBtn.count()) {
          await menuBtn.first().click();
          await page.waitForTimeout(300);
          const file = path.join(OUT, 'home', `menu-open-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: false });
          report.shotCount++;
        }
      } catch (err) {
        report.failures.push(`home/menu-open-${vp.name}: ${err.message}`);
      }

      // State: procedure modal.
      try {
        await page.goto(BASE + '/procedures', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(300);
        const btn = page.locator('button:has-text("Learn more")').first();
        if (await btn.count()) {
          await btn.click();
          await page.waitForTimeout(300);
          const file = path.join(OUT, 'procedures', `modal-open-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: false });
          report.shotCount++;
        }
      } catch (err) {
        report.failures.push(`procedures/modal-open-${vp.name}: ${err.message}`);
      }

      // State: transformations B/A slider mid-drag.
      try {
        await page.goto(BASE + '/transformations', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(400);
        const handle = page.getByRole('slider').first();
        if (await handle.count()) {
          const box = await handle.boundingBox();
          if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.mouse.move(Math.max(16, vp.width * 0.35), box.y + box.height / 2, {
              steps: 10,
            });
            await page.mouse.up();
            await page.waitForTimeout(250);
          }
          const file = path.join(OUT, 'transformations', `slider-35-${vp.name}.png`);
          await page.screenshot({ path: file, fullPage: true });
          report.shotCount++;
        }
      } catch (err) {
        report.failures.push(`transformations/slider-35-${vp.name}: ${err.message}`);
      }

      // State: footer focus.
      try {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(250);
        await page.evaluate(() => document.querySelector('footer')?.scrollIntoView({ block: 'end' }));
        await page.waitForTimeout(300);
        const file = path.join(OUT, 'home', `footer-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        report.shotCount++;
      } catch (err) {
        report.failures.push(`home/footer-${vp.name}: ${err.message}`);
      }

      await ctx.close();
    }

    // Pick the quality bar: desktop home by default, unless it failed.
    const desktopHome = path.join(OUT, 'home', 'default-1920x1080.png');
    try {
      await fs.stat(desktopHome);
      report.qualityBar = 'home/default-1920x1080.png';
    } catch {
      report.qualityBar = null;
    }

    // Cap issues at 10, rank by severity.
    const order = { critical: 0, major: 1, minor: 2 };
    report.issues.sort((a, b) => (order[a.severity] ?? 3) - (order[b.severity] ?? 3));
    report.issues = report.issues.slice(0, 10);
  } finally {
    await browser.close();
    if (server.owned && server.child) server.child.kill();
  }

  const reportPath = path.join(OUT, 'report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  process.stdout.write(`visual-qa: wrote ${report.shotCount} shots, report at ${reportPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`visual-qa fatal: ${err.stack || err.message}\n`);
  process.exit(1);
});
