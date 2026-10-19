import { test, expect } from '@playwright/test';

test.describe('Club Discovery and Membership', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clubs');
  });

  test('should display clubs directory', async ({ page }) => {
    // Verify clubs list is visible
    await expect(page.locator('text=clubs')).toBeVisible({ ignoreCase: true });
  });

  test('should filter clubs by city', async ({ page }) => {
    // Check for city filter/chip navigation
    await expect(page.locator('[data-testid="city-filter"], .city-chip, text=pune, text=mumbai, text=bangalore, text=delhi')).toBeVisible({ ignoreCase: true });
  });

  test('should show club detail when selected', async ({ page }) => {
    // Click on a club card
    const clubCard = page.locator('[data-testid="club-card"]').first();
    await expect(clubCard).toBeVisible();
    await clubCard.click();

    // Verify club detail view
    await expect(page.locator('text=members')).toBeVisible({ ignoreCase: true });
    await expect(page.locator('text=rides')).toBeVisible({ ignoreCase: true });
  });

  test('join club request flow', async ({ page }) => {
    await page.goto('/clubs/test-club-123');
    await page.getByRole('button', { name: /join|request/i }).click();

    // Verify request status
    await expect(page.locator('text=pending, text=request sent')).toBeVisible({ ignoreCase: true });
  });
});