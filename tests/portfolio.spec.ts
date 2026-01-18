import { test, expect } from '@playwright/test';

test.describe('Portfolio Website E2E', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load homepage with correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/QA/);
        await expect(page.getByText('Full Stack QA Engineer')).toBeVisible();
    });

    test('should verify all main sections are visible', async ({ page }) => {
        // Hero Section
        await expect(page.getByRole('heading', { name: 'Full Stack QA Engineer' })).toBeVisible();

        // Skills Section
        const skillsSection = page.locator('#skills');
        await skillsSection.scrollIntoViewIfNeeded();
        await expect(skillsSection).toBeVisible();
        await expect(page.getByText('Technical Arsenal')).toBeVisible();

        // Experience Section
        const experienceSection = page.locator('#about');
        await experienceSection.scrollIntoViewIfNeeded();
        await expect(experienceSection).toBeVisible();
        await expect(page.getByText('Professional Journey')).toBeVisible();

        // Projects Section
        const projectsSection = page.locator('#projects');
        await projectsSection.scrollIntoViewIfNeeded();
        await expect(projectsSection).toBeVisible();
        await expect(page.getByText('Featured Projects')).toBeVisible();
    });

    test('should display at least 4 featured projects', async ({ page }) => {
        const projectsSection = page.locator('#projects');
        await projectsSection.scrollIntoViewIfNeeded();

        // Assuming project cards have a specific identifier or we count them within the grid
        const projectCards = page.locator('#projects .group.relative');
        await expect(projectCards).toHaveCount(4);

        // Verify key projects are present by title
        await expect(page.getByRole('heading', { name: 'E2E Automation Framework' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'API & Contract Testing' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'High-Scale Load Testing' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Test Data Management App' })).toBeVisible();
    });

    test('should display tech stack tags', async ({ page }) => {
        const projectsSection = page.locator('#projects');
        await projectsSection.scrollIntoViewIfNeeded();

        await expect(page.getByText('Playwright').first()).toBeVisible();
        await expect(page.getByText('TypeScript').first()).toBeVisible();
        await expect(page.getByText('Next.js').first()).toBeVisible();
        await expect(page.getByText('MongoDB').first()).toBeVisible();
    });

});
