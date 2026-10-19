import { test, expect } from '@playwright/test';

test.describe('Expense Tracking and Cost Analytics', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming user is logged in
    await page.goto('/expenses/cost-per-km');
  });

  test('should display cost per km analytics for free', async ({ page }) => {
    // Verify cost analytics are visible without paywall
    await expect(page.locator('text=cost per km')).toBeVisible({ ignoreCase: true });
    await expect(page.locator('text=₹')).toBeVisible();
  });

  test('should break down costs by category', async ({ page }) => {
    // Check for fuel, repairs, accessories breakdown
    await expect(page.locator('text=fuel')).toBeVisible({ ignoreCase: true });
    await expect(page.locator('text=repairs')).toBeVisible({ ignoreCase: true });
    await expect(page.locator('text=accessories')).toBeVisible({ ignoreCase: true });
  });

  test('should show progress bars for cost categories', async ({ page }) => {
    // Verify visual progress indicators
    const progressBars = page.locator('[role="progressbar"], .progress-bar, [data-testid="progress-bar"]');
    await expect(progressBars.first()).toBeVisible();
  });

  test('empty state when no expenses logged', async ({ page }) => {
    // Verify empty state with CTA to add first expense
    await expect(page.locator('text=add your first')).toBeVisible({ ignoreCase: true });
  });
});