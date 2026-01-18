import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['line'],
        ['allure-playwright']
    ],
    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 100,
            threshold: 0.2,
            animations: 'disabled',
        },
    },
    use: {
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        screenshot: 'on',
        video: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
