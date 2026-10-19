import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('H1: Login with phone number', async ({ page }) => {
    await page.fill('[data-testid="phone-input"]', '9876543210');
    await page.click('[data-testid="send-otp-button"]');

    await expect(page.locator('[data-testid="otp-input"]')).toBeVisible();
    await page.fill('[data-testid="otp-input"]', '123456');
    await page.click('[data-testid="verify-otp-button"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('E1: Empty input fields show validation', async ({ page }) => {
    await page.click('[data-testid="send-otp-button"]');

    await expect(page.locator('[data-testid="phone-error"]')).toContainText('Phone number is required');
  });

  test('N1: Invalid phone format rejected', async ({ page }) => {
    await page.fill('[data-testid="phone-input"]', 'invalid');
    await page.click('[data-testid="send-otp-button"]');

    await expect(page.locator('[data-testid="phone-error"]')).toContainText('Invalid phone number');
  });

  test('E8: Slow network handling', async ({ page }) => {
    await page.context().setOffline(true);
    await page.fill('[data-testid="phone-input"]', '9876543210');
    await page.click('[data-testid="send-otp-button"]');

    // Should handle gracefully or show loading
    await expect(page.locator('[data-testid="error-message"]')).not.toBeVisible();
  });
});