import { test, expect } from '@playwright/test';

const PORTFOLIO_URL = 'http://localhost:3000';
const TDM_URL = 'http://localhost:3001';

test.describe('System Regression: Portfolio Integration', () => {

    test('Homepage: Should display all Project Cards', async ({ page }) => {
        await page.goto(PORTFOLIO_URL);

        // Verify Title and Hero
        await expect(page).toHaveTitle(/Full Stack QA Portfolio/i);
        await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();

        // Verify All 4 Projects are present
        const projects = [
            'E2E Automation Framework',
            'API & Contract Testing',
            'High-Scale Load Testing',
            'Test Data Manager'
        ];

        for (const project of projects) {
            await expect(page.getByRole('heading', { name: project })).toBeVisible();
        }
    });

    test('Integration: Should Launch TDM App correcty', async ({ page, context }) => {
        await page.goto(PORTFOLIO_URL);

        // Get the "Test Data Manager" card context
        const tdmCard = page.locator('.group', { hasText: 'Test Data Manager' });
        const launchBtn = tdmCard.getByRole('button', { name: 'Launch App' });

        // Setup Promise for new page
        const pagePromise = context.waitForEvent('page');
        await launchBtn.click();
        const newPage = await pagePromise;

        // Verify TDM loaded in new tab
        await newPage.waitForLoadState();
        expect(newPage.url()).toContain(TDM_URL);
        await expect(newPage.getByText('Test Data Manager').first()).toBeVisible();
    });

    test('Feature: Should Run Interactive Demo (API Test)', async ({ page }) => {
        await page.goto(PORTFOLIO_URL);

        // Find API Project Card
        const apiCard = page.locator('.group', { hasText: 'API & Contract Testing' });

        // Click Run Demo
        await apiCard.getByRole('button', { name: 'Run Test Demo' }).click();

        // Verify Modal
        const modal = page.locator('.fixed.inset-0.z-50');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('live execution');

        // Verify Streaming Logs appear (Wait for "npm test" or specific jest output)
        // Note: The log content depends on actual execution, but we can check for startup indicators
        await expect(modal.getByText('npm test')).toBeVisible();

        // Close Modal
        await page.keyboard.press('Escape');
        await expect(modal).not.toBeVisible();
    });

});
