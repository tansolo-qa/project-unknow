import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForUrl(urlPattern: string) {
        await this.page.waitForURL(urlPattern);
    }
}
