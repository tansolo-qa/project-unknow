import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Visual Regression Tests', () => {

    test('Login page should match baseline', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        // Take full page snapshot
        await expect(page).toHaveScreenshot('login-page.png', {
            fullPage: true,
        });
    });

    test('Inventory page should match baseline', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Wait for inventory page to load
        await page.waitForURL('**/inventory.html');
        await page.waitForLoadState('networkidle');

        // Take full page snapshot
        await expect(page).toHaveScreenshot('inventory-page.png', {
            fullPage: true,
        });
    });

    test('Product card component should match baseline', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await page.waitForURL('**/inventory.html');
        await page.waitForLoadState('networkidle');

        // Take snapshot of first product card only
        const productCard = page.locator('.inventory_item').first();
        await expect(productCard).toHaveScreenshot('product-card.png');
    });

    test('Shopping cart badge should match baseline', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await page.waitForURL('**/inventory.html');

        // Add item to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Take snapshot of cart badge
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveScreenshot('cart-badge.png');
    });
});
