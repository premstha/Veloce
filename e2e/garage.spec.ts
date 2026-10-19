import { test, expect } from '@playwright/test';

test.describe('Garage and Motorcycle Management', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming user is logged in
    await page.goto('/garage');
  });

  test('should add a new motorcycle', async ({ page }) => {
    // Navigate to add form - way an "Add Motorcycle" button
    await page.getByRole('button', { name: /add motorcycle/i }).click();

    // Fill in motorcycle details
    await page.fill('input[name="make"]', 'Royal Enfield');
    await page.fill('input[name="model"]', 'Himalayan');
    await page.fill('input[name="odometer"]', '12500');

    // Submit the form
    await page.getByRole('button', { name: /save|add/i }).click();

    // Verify that the new motorcycle appears in the list
    await expect(page.getByText('Royal Enfield')).toBeVisible();
  });

  test('should add a part replacement', async ({ page }) => {
    // Select an existing motorcycle to view details
    await page.getByText('Royal Enfield').click();

    // Navigate to part replacements section
    await page.getByRole('button', { name: /add replacement/i }).click();

    // Fill in replacement details
    await page.fill('select[name="part_type"]', 'Oil Filter');
    await page.fill('input[name="odometer"]', '13000');
    await page.fill('input[name="cost"]', '1200');

    // Submit the replacement
    await page.getByRole('button', { name: /save|add/i }).click();

    // Verify that the replacement is listed
    await expect(page.getByText('Oil Filter')).toBeVisible();
  });
});