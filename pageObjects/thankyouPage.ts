import { Page, Locator, expect } from '@playwright/test';

export class ThankYouPage {
    readonly page: Page;
    readonly thankyouTitle: Locator;
    readonly thankyouText: Locator;
    readonly logosComponent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankyouTitle = page.locator('h1');
        this.thankyouText = page.locator('.heroThankYou__txtWrap');
        this.logosComponent = page.locator('.logoAcc');
    }
}