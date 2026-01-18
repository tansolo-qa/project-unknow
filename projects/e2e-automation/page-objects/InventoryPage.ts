import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly headerTitle: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.headerTitle = page.locator('.title'); // Note: selector might differ slightly on actual saucedemo
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }
}
