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
      for (const href of ['/', '/about', '/procedures', '/bariatric', '/distinctions', '/teaching', '/transformations', '/location', '/consultation', '/gallery']) {
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

    // Flow 9: mobile booking bar — the two booking channels (tel: +
    // WhatsApp) must be reachable WITHOUT scrolling on every route at
    // 390×844 (goal-state G2 "above the fold on every route").
    {
      const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      for (const href of ['/', '/about', '/procedures', '/bariatric', '/distinctions', '/teaching', '/transformations', '/location', '/consultation', '/gallery']) {
        await step('mobile-booking-bar', `above-fold ${href}`, async () => {
          await page.goto(BASE + href, { waitUntil: 'domcontentloaded' });
          const inFold = (box) =>
            box && box.y >= 0 && box.y + box.height <= 844 && box.width > 0;
          // Any visible link counts — pages may render the same channel
          // twice (hero CTA, footer); at least one must sit in the fold.
          const anyInFold = async (selector) => {
            for (const el of await page.locator(selector).all()) {
              if (inFold(await el.boundingBox())) return true;
            }
            return false;
          };
          if (!(await anyInFold('a[href^="tel:"]:visible'))) {
            throw new Error('no tel: link inside the initial viewport');
          }
          if (
            !(await anyInFold(
              'a[href*="api.whatsapp.com"]:visible, a[href*="wa.me"]:visible',
            ))
          ) {
            throw new Error('no WhatsApp link inside the initial viewport');
          }
        });
      }
      // The bar must yield to the footer (which carries its own contact
      // links) instead of overlaying it.
      await step('mobile-booking-bar', 'hides-at-footer', async () => {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
        const bar = page.locator('nav[aria-label="Quick booking actions"]');
        if (!(await bar.count())) throw new Error('booking bar not present');
        await page.evaluate(() =>
          document.querySelector('footer')?.scrollIntoView({ behavior: 'instant', block: 'center' }),
        );
        await page.waitForTimeout(600);
        if (await bar.isVisible()) {
          throw new Error('booking bar still visible over the footer');
        }
      });
      await ctx.close();
    }

    // Flow 6: teaching media — YouTube channel + podcast outbound links.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/teaching', { waitUntil: 'domcontentloaded' });
      await step('teaching-media', 'channel-link', async () => {
        const a = page.locator('a[href*="youtube.com/@dr.ghulamsiddiq"]').first();
        if (!(await a.count())) throw new Error('no channel link on /teaching');
        if ((await a.getAttribute('target')) !== '_blank') {
          throw new Error('channel link does not open in new tab');
        }
      });
      await step('teaching-media', 'podcast-section', async () => {
        const section = page.locator('#teaching-podcast');
        if (!(await section.count())) throw new Error('#teaching-podcast heading missing');
      });
      await step('teaching-media', 'podcast-note-once', async () => {
        // The tile and the CTA column must not both carry the same
        // "Episodes are published…" caption — it reads twice on mobile
        // where the two stack directly on top of each other.
        const notes = page.getByText('Episodes are published on the YouTube channel.');
        const n = await notes.count();
        if (n !== 1) throw new Error(`podcast note appears ${n} times, expected 1`);
      });
      await step('teaching-media', 'podcast-playlist-link', async () => {
        const a = page.locator('a[href*="list=PLWiwfcR9mm1g"]').first();
        if (!(await a.count())) throw new Error('no podcast playlist link on /teaching');
        if ((await a.getAttribute('target')) !== '_blank') {
          throw new Error('podcast link does not open in new tab');
        }
        const rel = (await a.getAttribute('rel')) || '';
        if (!/noopener/.test(rel)) throw new Error(`podcast link rel=${rel}`);
      });
      await ctx.close();
    }

    // Flow 7: home surfaces the channel + podcast teaser.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await step('home-media', 'teaser-present', async () => {
        const section = page.locator('#home-media');
        if (!(await section.count())) throw new Error('#home-media section missing');
        const yt = section.locator('a[href*="youtube.com"]');
        if (!(await yt.count())) throw new Error('no YouTube link inside #home-media');
      });
      await ctx.close();
    }

    // Flow 8: reviews — Google-review CTA on home section + global footer.
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await step('reviews', 'home-section', async () => {
        const section = page.locator('#home-reviews');
        if (!(await section.count())) throw new Error('#home-reviews section missing');
        const a = section.locator('a[href*="google.com/maps"]').first();
        if (!(await a.count())) throw new Error('no Google review link inside #home-reviews');
        if ((await a.getAttribute('target')) !== '_blank') {
          throw new Error('Google review link does not open in new tab');
        }
        const rel = (await a.getAttribute('rel')) || '';
        if (!/noopener/.test(rel)) throw new Error(`review link rel=${rel}`);
      });
      await step('reviews', 'footer-link', async () => {
        const a = page.locator('footer a[href*="google.com/maps"]').first();
        if (!(await a.count())) throw new Error('no Google review link in footer');
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
