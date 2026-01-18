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

    test('UI: Should manually create a data record', async ({ page }) => {
        await page.goto(TDM_URL);

        // 1. Fill Form using Accessible Locators
        await page.getByLabel('Scenario Name').fill('Manual Test Scenario');
        await page.getByLabel('Tags (comma separated)').fill('manual, e2e-test');

        // Note: Textarea JSON payload usually has default value, we verify we can edit it
        await page.getByLabel('JSON Payload').fill('{ "test_key": "manual_value" }');

        // 2. Submit
        await page.getByRole('button', { name: 'Save Data' }).click();

        // 3. Verify Response & UI Update
        // Wait for POST /api/data
        await page.waitForResponse(response =>
            response.url().includes('/api/data') &&
            response.request().method() === 'POST' &&
            response.status() === 201
        );

        // Verify item appears in list
        // Use first() because it might appear multiple times if tests run repeatedly without clear
        await expect(page.getByText('Manual Test Scenario').first()).toBeVisible();
        await expect(page.getByText('#manual').first()).toBeVisible();
        await expect(page.getByText('#manual').first()).toBeVisible();
    });

    test('UI: Should generate User data (Regression Test)', async ({ page }) => {
        await page.goto(TDM_URL);

        // 1. Select "User Profiles" template (default)
        const templateSelect = page.locator('select').first();
        await templateSelect.selectOption('user');

        // 2. Generate
        await page.getByRole('button', { name: 'Generate via Faker.js' }).click();

        // 3. Verify
        await page.waitForResponse(response =>
            response.url().includes('/api/data') && response.status() === 200 || response.status() === 201
        );

        // Verify "user" tag or scenario text
        await expect(page.getByText('Auto-Generated User', { exact: false }).first()).toBeVisible({ timeout: 15000 });
    });

    test('UI: Should validation error for Invalid JSON', async ({ page }) => {
        await page.goto(TDM_URL);

        // 1. Setup Dialog Listener (to handle window.alert)
        let dialogMessage = '';
        page.on('dialog', dialog => {
            dialogMessage = dialog.message();
            dialog.accept();
        });

        // 2. Fill Form with Invalid JSON
        await page.getByLabel('Scenario Name').fill('Invalid JSON Test');
        await page.getByLabel('JSON Payload').fill('This is not JSON'); // Bad Input

        // 3. Submit
        await page.getByRole('button', { name: 'Save Data' }).click();

        // 4. Verify Alert
        await expect.poll(() => dialogMessage).toContain('Invalid JSON');
    });

});
