import {test, Page, Locator, expect } from '@playwright/test';

export class Slider {
    readonly page: Page;
    readonly sliderBlock: Locator;
    readonly currentSlide: Locator;
    readonly currentSlideImage: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly previewSlider: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sliderBlock = page.locator('.sliderDefault__slider');
        this.currentSlide = page.locator(".sliderDefault__item.slick-current");
        this.currentSlideImage = page.locator(".sliderDefault__item.slick-current img");
        this.nextButton = page.locator("button.slick-next");
        this.prevButton = page.locator("button.slick-prev");
        this.previewSlider = page.locator(".sliderPrev__slider");
    }
}