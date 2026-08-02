/**
 * check-token-sync.mjs — proves tailwind.config.ts and
 * src/design-system/tokens.css carry identical values for every token that
 * exists in both. The two files are a manually-synced pair (see CLAUDE.md);
 * this makes drift a build-time failure instead of a visual surprise.
 *
 * Run:  node scripts/check-token-sync.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = path.resolve(new URL('..', import.meta.url).pathname);
const tw = fs.readFileSync(path.join(REPO, 'tailwind.config.ts'), 'utf8');
const css = fs.readFileSync(path.join(REPO, 'src/design-system/tokens.css'), 'utf8');

/** Tailwind key -> CSS custom property. */
const MAP = {
  canvas: '--color-base',
  surface: '--color-surface',
  surfaceSunken: '--color-surface-sunken',
  ink: '--color-ink',
  inkMuted: '--color-ink-muted',
  inkBorder: '--color-ink-border',
  primary: '--color-primary',
  primaryHover: '--color-primary-hover',
  accent: '--color-accent',
  accentDeep: '--color-accent-deep',
  textPrimary: '--color-text',
  textSecondary: '--color-text-2',
  textMuted: '--color-text-3',
  border1: '--color-border-1',
  border2: '--color-border-2',
  success: '--color-success',
  warn: '--color-warn',
  'measure-20': '--measure-20',
  'measure-22': '--measure-22',
  'measure-24': '--measure-24',
  'measure-42': '--measure-42',
  'measure-56': '--measure-56',
  'measure-62': '--measure-62',
  'measure-64': '--measure-64',
  card: '--shadow-card',
  raised: '--shadow-raised',
  focus: '--shadow-focus',
  eyebrow: '--tracking-eyebrow',
  ui: '--tracking-ui',
  body: '--tracking-body',
  lead: '--tracking-lead',
  micro: '--motion-micro',
  reveal: '--motion-reveal',
};

const norm = (v) => v.trim().replace(/;$/, '').replace(/\s+/g, ' ').toUpperCase();

function fromTw(key) {
  const re = new RegExp(`(?:^|\\s)'?${key.replace(/[-]/g, '\\-')}'?:\\s*'([^']+)'`, 'm');
  const m = tw.match(re);
  return m ? norm(m[1]) : null;
}
function fromCss(prop) {
  const m = css.match(new RegExp(`${prop}:\\s*([^;]+);`));
  return m ? norm(m[1]) : null;
}

const rows = [];
let bad = 0;
for (const [twKey, cssProp] of Object.entries(MAP)) {
  const a = fromTw(twKey);
  const b = fromCss(cssProp);
  const ok = a !== null && b !== null && a === b;
  if (!ok) bad++;
  rows.push([ok ? 'ok ' : 'DRIFT', twKey, a ?? '(missing)', cssProp, b ?? '(missing)']);
}

// Font stacks: compare family lists.
const twSerif = (tw.match(/serif:\s*\[([^\]]+)\]/) || [])[1];
const cssSerif = (css.match(/--font-serif:\s*([^;]+);/) || [])[1];
const twSans = (tw.match(/\n\s*sans:\s*\[([^\]]+)\]/) || [])[1];
const cssSans = (css.match(/--font-sans:\s*([^;]+);/) || [])[1];
const stack = (s) => (s || '').replace(/["'\s]/g, '').replace(/,$/, '').toLowerCase();
for (const [name, a, b] of [['font-serif', twSerif, cssSerif], ['font-sans', twSans, cssSans]]) {
  const ok = stack(a) === stack(b) && stack(a) !== '';
  if (!ok) bad++;
  rows.push([ok ? 'ok ' : 'DRIFT', name, stack(a), '(css)', stack(b)]);
}

const w = (s, n) => String(s).padEnd(n);
console.log(w('', 6) + w('tailwind key', 16) + w('tailwind value', 34) + w('css property', 26) + 'css value');
for (const r of rows) console.log(w(r[0], 6) + w(r[1], 16) + w(r[2], 34) + w(r[3], 26) + r[4]);
console.log(`\n${rows.length - bad}/${rows.length} in sync`);
if (bad) { console.error(`\nFAIL: ${bad} token(s) drifted between the pair.`); process.exit(1); }
console.log('PASS: tailwind.config.ts and tokens.css agree on every shared token.');
