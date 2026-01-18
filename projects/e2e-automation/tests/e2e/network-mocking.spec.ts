import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Network Interception & Mocking', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    // Scenario 1: Fault Injection (Broken Images)
    // PROOF: We can control network traffic to simulate CDN failures
    test('should handle broken product images gracefully', async ({ page }) => {
        // 1. Abort all image requests
        await page.route('**/*.jpg', route => route.abort());

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // 2. Verify that images are present but broken
        const firstImage = page.locator('.inventory_item_img img').first();
        await expect(firstImage).toBeVisible();

        // Check if image failed to load (naturalWidth is 0)
        const isBroken = await firstImage.evaluate((img: HTMLImageElement) => {
            return img.naturalWidth === 0;
        });
        expect(isBroken).toBeTruthy();
    });

    // Scenario 2: API Mocking Capability
    // PROOF: Since SwagLabs is static, we demonstrate the FRAMEWORK'S ability 
    // to mock arbitrary API endpoints. This proves we can handle Backend integration.
    test('should be able to mock API responses', async ({ page }) => {
        // 1. Navigate to base URL to establish context/origin
        await page.goto('/');

        // 2. Define a mock route
        await page.route('**/api/v1/user-config', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ theme: 'dark', featureFlags: { beta: true } })
            });
        });

        // 3. Trigger the request (Simulating an app making an API call)
        // We use page.evaluate to run fetch inside the browser context
        const response = await page.evaluate(async () => {
            const res = await fetch('/api/v1/user-config');
            return await res.json();
        });

        // 4. Verify the Mock Data
        expect(response).toEqual({ theme: 'dark', featureFlags: { beta: true } });
    });

});
