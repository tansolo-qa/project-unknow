import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';

test.describe('Checkout Flow (Critical Path)', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should be able to complete checkout flow successfully', async ({ page }) => {
        // 1. Add item to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(inventoryPage.shoppingCartLink).toHaveText('1');

        // 2. Go to Cart
        await inventoryPage.shoppingCartLink.click();
        await expect(cartPage.cartItems).toHaveCount(1);

        // 3. Proceed to Checkout
        await cartPage.proceedToCheckout();

        // 4. Fill Information
        await checkoutPage.fillInformation('John', 'Doe', '10250');
        await checkoutPage.continueToReview();

        // 5. Finish Checkout (Review Step)
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await checkoutPage.finishCheckout();

        // 6. Verify Completion
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
});
