import { test, expect } from '@playwright/test';

test('home renders with hero headline and primary nav', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /laparoscopic and bariatric surgery/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /book an appointment/i }).first(),
  ).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' }).first()).toBeVisible();
});

test('about page loads with bio', async ({ page }) => {
  await page.goto('/about');
  await expect(
    page.getByRole('heading', { level: 1, name: /ghulam siddiq/i }),
  ).toBeVisible();
});

test('procedure card opens the detail modal', async ({ page }) => {
  await page.goto('/procedures');
  await page
    .getByRole('button', { name: /learn more about laparoscopic cholecystectomy/i })
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('unknown route renders the 404 fallback', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(
    page.getByRole('heading', { level: 1, name: /couldn.?t find that page/i }),
  ).toBeVisible();
});
