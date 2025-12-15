import {test, Page, Locator, expect } from '@playwright/test';

export class HeroSection {
    readonly page: Page;
    readonly heroTitle: Locator;
    readonly heroSubtitle: Locator;
    readonly heroVideo: Locator;
    readonly heroVideoPlayButton: Locator;
    readonly heroBadge: Locator;
    readonly heroBlockList: Locator;
    readonly heroBlockListItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heroTitle = page.locator('.hero .blockTitle__hdr');
        this.heroSubtitle = page.locator('.hero .blockTitle__txt');
        this.heroVideo = page.locator('.hero video');
        this.heroVideoPlayButton = page.locator('.hero button.play');
        this.heroBadge = page.locator('.hero__badge img');
        this.heroBlockList = page.locator('.hero .blockList');
        this.heroBlockListItem = page.locator('.hero .blockList__item');
    }
} 