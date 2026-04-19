import { test, expect } from '@playwright/test';

test('home renders with hero CTA and nav items', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /book consultation/i }).first()).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' }).first()).toBeVisible();
});

test('about page loads with bio', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1, name: /ghulam siddiq/i })).toBeVisible();
});

test('consultation anchor is reachable from home', async ({ page }) => {
  await page.goto('/#consultation');
  await expect(
    page.getByRole('heading', { name: /start with a conversation/i }),
  ).toBeVisible();
});
