import { test, expect } from '@playwright/test';

test.describe('Fuel Logging Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Assume logged in
    await page.goto('/fuel/new');
  });

  test('H1: Log fuel fill-up successfully', async ({ page }) => {
    await page.selectOption('[data-testid="bike-select"]', 'noreste-2021');
    await page.fill('[data-testid="amount-paid"]', '500');
    await page.fill('[data-testid="litres"]', '10');
    await page.fill('[data-testid="rate-per-litre"]', '50');
    await page.fill('[data-testid="odometer"]', '12500');

    await page.check('[data-testid="full-tank"]');
    await page.click('[data-testid="save-fuel-button"]');

    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="kmpl-display"]')).toContainText('20');
  });

  test('E5: Double click submit only creates one log', async ({ page }) => {
    await page.selectOption('[data-testid="bike-select"]', 'noreste-2021');
    await page.fill('[data-testid="amount-paid"]', '500');
    await page.fill('[data-testid="litres"]', '10');
    await page.fill('[data-testid="rate-per-litre"]', '50');
    await page.fill('[data-testid="odometer"]', '12500');

    await page.click('[data-testid="save-fuel-button"]');
    await page.click('[data-testid="save-fuel-button"]');
    await page.click('[data-testid="save-fuel-button"]');

    await expect(page.locator('[data-testid="fuel-log-list"]')).toHaveCount(1);
  });

  test('N1: Negative litres validation', async ({ page }) => {
    await page.fill('[data-testid="litres"]', '-5');
    await page.click('[data-testid="save-fuel-button"]');

    await expect(page.locator('[data-testid="litres-error"]')).toContainText('Must be positive');
  });

  test('E9: Offline logging queues sync', async ({ page }) => {
    await page.context().setOffline(true);
    await page.selectOption('[data-testid="bike-select"]', 'noreste-2021');
    await page.fill('[data-testid="amount-paid"]', '500');
    await page.fill('[data-testid="litres"]', '10');
    await page.fill('[data-testid="rate-per-litre"]', '50');
    await page.fill('[data-testid="odometer"]', '12500');

    await page.click('[data-testid="save-fuel-button"]');

    await expect(page.locator('[data-testid="offline-badge"]')).toBeVisible();

    await page.context().setOffline(false);
    await expect(page.locator('[data-testid="offline-badge"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="fuel-log-list"]')).toHaveCount(1);
  });

  test('E13: Keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="bike-select"]')).toHaveCSS('outline', 'rgb(0, 123, 255)');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.locator('[data-testid="save-fuel-button"]')).toBeFocused();
  });
});