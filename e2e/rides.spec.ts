import { test, expect } from '@playwright/test';

test.describe('Ride Discovery & Joining', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rides');
  });

  test('H1: Join a public ride', async ({ page }) => {
    // Find first ride card and click join
    await page.click('text=Join Group Room');

    await expect(page).toHaveURL(/\/rides\/group-room/);
    await expect(page.locator('text=Live Group Ride')).toBeVisible();
  });

  test('E1: Ride full state', async ({ page }) => {
    // We'd normally use a mock or specific seed ID for a full ride
    await page.goto('/rides/pune/lonavala-sunrise-full-123');

    const joinBtn = page.locator('text=Join Group Room');
    await expect(joinBtn).toBeDisabled();
    await expect(page.locator('text=Ride is full')).toBeVisible();
  });

  test('N1: Unauthorized join attempt', async ({ page }) => {
    // Try to join while logged out
    await page.context().clearCookies();
    await page.goto('/rides/pune/lonavala-sunrise-123');
    await page.click('text=Join Group Room');

    await expect(page).toHaveURL(/\/auth\/login/);
  });
});