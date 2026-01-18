import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import userData from '../../data/users.json'; // Direct JSON import

test.describe('Authentication Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigate();
    });

    // Data-Driven Test Loop
    for (const user of userData) {
        test(`Login flow for user: ${user.username}`, async () => {
            await loginPage.login(user.username, user.password);

            if (user.id === 'valid_user') {
                // Successful login verification
                await expect(inventoryPage.page).toHaveURL(/.*inventory.html/);
            } else if (user.id === 'locked_out_user') {
                // Error handling verification
                await expect(loginPage.errorMessage).toBeVisible();
                await expect(loginPage.errorMessage).toContainText(user.errorMessage!);
            }
        });
    }
});
