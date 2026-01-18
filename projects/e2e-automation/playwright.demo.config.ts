import { defineConfig, devices } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
    ...baseConfig,
    use: {
        ...baseConfig.use,
        headless: false, // Show the browser
        launchOptions: {
            slowMo: 800, // 0.8s delay per action for readability
        },
        viewport: { width: 1280, height: 720 }, // Standard HD for video
        video: 'off', // We are recording screen, so internal video is not needed
    },
    reporter: [['line']], // Minimal noise
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
