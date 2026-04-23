/**
 * ux-flow.spec.mjs — scripted user journeys. Does NOT use @playwright/test;
 * uses the raw playwright library so we control pass/fail reporting and
 * emit a single JSON file that the ux-flow subagent parses.
 *
 * Run:   node scripts/ux-flow.spec.mjs
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const REPO = path.resolve(new URL('..', import.meta.url).pathname);
const OUT = path.join(REPO, 'visual-tests', 'ux-flow.json');
const BASE = 'http://localhost:5175';

const require = createRequire(
  new URL('../frontend/package.json', import.meta.url),
);
const { chromium } = require('@playwright/test');

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

const report = {
  timestamp: new Date().toISOString(),
  passed: 0,
  failed: 0,
  failures: [],
};

async function step(flow, where, fn) {
  try {
    await fn();
    report.passed++;
  } catch (err) {
    report.failed++;
    report.failures.push({
      flow,
      where,
      expected: err.expected ?? 'success',
      actual: err.message,
    });
  }
}

async function main() {
  const server = await ensureServer();
  const browser = await chromium.launch();
  try {
    // Flow 1: primary navigation resolves 200 + h1.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      for (const href of ['/', '/about', '/procedures', '/bariatric', '/distinctions', '/transformations', '/location', '/consultation', '/gallery']) {
        await step('navigation', `GET ${href}`, async () => {
          const resp = await page.goto(BASE + href, { waitUntil: 'domcontentloaded' });
          if (!resp || !resp.ok()) throw new Error(`status ${resp?.status()}`);
          const h1 = page.locator('h1').first();
          if (!(await h1.isVisible({ timeout: 3000 }))) throw new Error('h1 not visible');
        });
      }
      await ctx.close();
    }

    // Flow 2: mobile drawer opens + navigates + closes.
    {
      const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await step('mobile-drawer', 'open', async () => {
        const btn = page.getByRole('button', { name: /open navigation/i });
        if (!(await btn.count())) throw new Error('hamburger not present');
        await btn.first().click();
        const dialog = page.getByRole('dialog', { name: /site navigation/i });
        if (!(await dialog.isVisible({ timeout: 2000 }))) {
          throw new Error('mobile drawer dialog not visible after open');
        }
      });
      await step('mobile-drawer', 'esc-closes', async () => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        const dialog = page.getByRole('dialog', { name: /site navigation/i });
        const visible = await dialog.isVisible({ timeout: 500 }).catch(() => false);
        if (visible) throw new Error('drawer still visible after Escape');
      });
      await ctx.close();
    }

    // Flow 3: procedure modal opens + traps focus + Esc closes.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/procedures', { waitUntil: 'domcontentloaded' });
      await step('procedure-modal', 'open', async () => {
        const btn = page.locator('button:has-text("Learn more")').first();
        await btn.click();
        const dialog = page.getByRole('dialog');
        if (!(await dialog.isVisible({ timeout: 2000 }))) throw new Error('dialog not visible');
        const ariaModal = await dialog.getAttribute('aria-modal');
        if (ariaModal !== 'true') throw new Error(`aria-modal=${ariaModal}`);
      });
      await step('procedure-modal', 'esc-closes', async () => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        const dialog = page.getByRole('dialog');
        const visible = await dialog.isVisible().catch(() => false);
        if (visible) throw new Error('dialog still visible after Escape');
      });
      await ctx.close();
    }

    // Flow 4: booking action anchors.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/consultation', { waitUntil: 'domcontentloaded' });
      await step('booking', 'whatsapp-href', async () => {
        const a = page.locator('a:has-text("WhatsApp")').first();
        const href = await a.getAttribute('href');
        if (!href || !/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
          throw new Error(`unexpected WhatsApp href: ${href}`);
        }
        const target = await a.getAttribute('target');
        if (target !== '_blank') throw new Error(`target=${target}`);
      });
      await step('booking', 'tel-href', async () => {
        const a = page.locator('a[href^="tel:"]').first();
        if (!(await a.count())) throw new Error('no tel: link present');
      });
      await ctx.close();
    }

    // Flow 5: 404 recovery.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await step('notfound', 'renders', async () => {
        await page.goto(BASE + '/definitely-not-a-page', {
          waitUntil: 'domcontentloaded',
        });
        const h1 = page.getByRole('heading', { level: 1 });
        const text = (await h1.textContent()) || '';
        if (!/couldn|find|404|not found/i.test(text)) {
          throw new Error(`unexpected h1: ${text.trim().slice(0, 60)}`);
        }
      });
      await step('notfound', 'return-home', async () => {
        const link = page.getByRole('link', { name: /return home/i });
        await link.click();
        await page.waitForURL((u) => u.pathname === '/', { timeout: 3000 });
      });
      await ctx.close();
    }
  } finally {
    await browser.close();
    if (server.owned && server.child) server.child.kill();
  }

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(report, null, 2));
  process.stdout.write(
    `ux-flow: ${report.passed} passed / ${report.failed} failed → ${OUT}\n`,
  );
  process.exit(report.failed > 0 ? 1 : 0);
}

main().catch((err) => {
  const hard = {
    timestamp: new Date().toISOString(),
    passed: 0,
    failed: -1,
    failures: [{ flow: 'harness', where: 'startup', expected: 'ok', actual: err.message }],
  };
  fs.mkdir(path.dirname(OUT), { recursive: true })
    .then(() => fs.writeFile(OUT, JSON.stringify(hard, null, 2)))
    .finally(() => {
      process.stderr.write(`ux-flow fatal: ${err.stack || err.message}\n`);
      process.exit(1);
    });
});
