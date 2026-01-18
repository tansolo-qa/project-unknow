import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Multi-User / Browser Context Scenarios', () => {

    test('should maintain session isolation between two parallel users', async ({ browser }) => {
        // 1. Create two separate browser contexts
        const contextA = await browser.newContext();
        const contextB = await browser.newContext();

        // 2. Create pages for each context
        const pageA = await contextA.newPage();
        const pageB = await contextB.newPage();

        const loginPageA = new LoginPage(pageA);
        const loginPageB = new LoginPage(pageB);

        // 3. User A Action: Login and Add Item to Cart
        await test.step('User A: Login and add item to cart', async () => {
            await loginPageA.navigate();
            await loginPageA.login('standard_user', 'secret_sauce');

            // Add "Sauce Labs Backpack" to cart
            await pageA.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

            // Verify Cart Badge shows "1"
            await expect(pageA.locator('.shopping_cart_badge')).toHaveText('1');
        });

        // 4. User B Action: Login (Same Credentials, Different Context)
        await test.step('User B: Login in separate context', async () => {
            await loginPageB.navigate();
            await loginPageB.login('standard_user', 'secret_sauce');

            // Verify Cart Badge is NOT present (Session is isolated)
            await expect(pageB.locator('.shopping_cart_badge')).toBeHidden();
        });

        // Cleanup
        await contextA.close();
        await contextB.close();
    });

});
