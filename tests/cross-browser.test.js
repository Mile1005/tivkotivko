import { test, expect } from '@playwright/test';

// Define common viewports for responsive testing
const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test.describe(`Responsive Tests - ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test('Page loads correctly', async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Navigate to the page
      await page.goto('/');

      // Wait for the page to load and animations to settle
      await page.waitForTimeout(2000); // Wait for typewriter effect and animations

      // Check if the main title is visible
      const title = page.locator('h1').filter({ hasText: 'ТИВКОТИВКО' });
      await expect(title).toBeVisible();

      // Check if the subtitle appears (typewriter effect)
      const subtitle = page.locator('p').filter({ hasText: 'ВИСТИНАТА ДОАЃА ПО ВАС...' });
      await expect(subtitle).toBeVisible();

      // Check if countdown is present
      const countdown = page.locator('div').filter({ hasText: 'дена' });
      await expect(countdown).toBeVisible();

      // Check if email form is present
      const emailInput = page.locator('input[type="email"]');
      await expect(emailInput).toBeVisible();

      const submitButton = page.locator('button[type="submit"]').filter({ hasText: 'Испрати' });
      await expect(submitButton).toBeVisible();

      // Take a screenshot for visual verification
      await page.screenshot({ path: `test-results/screenshot-${viewport.name}.png`, fullPage: true });

      console.log(`Test passed for ${viewport.name}`);
    });
  });
}