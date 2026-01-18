import { test, expect } from '@playwright/test';

const TDM_URL = 'http://localhost:3001';

test.describe('Test Data Manager (Project D)', () => {

    test('UI: Should generate Product data via web interface', async ({ page }) => {
        // 1. Navigate to TDM
        await page.goto(TDM_URL);
        await expect(page.getByRole('heading', { name: 'Test Data Manager' })).toBeVisible();

        // 2. Select "E-commerce Products" template
        const templateSelect = page.locator('select').first();
        await templateSelect.selectOption('product');

        // 3. Set count to 3
        const countInput = page.locator('input[type="number"]');
        await countInput.fill('3');

        // 4. Click Generate
        await page.getByRole('button', { name: 'Generate via Faker.js' }).click();

        // 5. Verify Success
        // Wait for the request to complete
        await page.waitForResponse(response =>
            response.url().includes('/api/data') && response.status() === 200 || response.status() === 201
        );

        // Verify "product" tag appears in the list
        // Increase timeout to 15s to account for server/database latency
        await expect(page.getByText('#product', { exact: false }).first()).toBeVisible({ timeout: 15000 });

        // Verify we see at least one product tag
        const productTags = page.locator('span:has-text("product")');
        expect(await productTags.count()).toBeGreaterThan(0);
    });

    test('API: Should generate Product data via API endpoint', async ({ request }) => {
        const response = await request.post(`${TDM_URL}/api/data/generate`, {
            data: {
                count: 5,
                type: 'product'
            }
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);

        const json = await response.json();
        expect(json.success).toBe(true);
        expect(json.message).toContain('Successfully generated 5 records');
    });

});
