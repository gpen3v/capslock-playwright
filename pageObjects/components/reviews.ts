import {test, Page, Locator, expect } from '@playwright/test';

export class ReviewsBlock {
    readonly page: Page;
    // Reviews Block
    readonly reviewsBlock: Locator;
    readonly review: Locator;
    readonly reviewAvatar: Locator;
    readonly reviewName: Locator;
    readonly reviewRating: Locator;
    readonly reviewComment: Locator;
    readonly reviewsShowMore: Locator;
    readonly reviewsMore: Locator;
    readonly reviewImage: Locator;
    readonly lightbox: Locator;
    readonly lightboxCurrentImage: Locator;
    readonly lightboxItem: Locator;
    readonly closeButton: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Reviews Block
        this.reviewsBlock = page.locator('.reviewWrap');
        this.review = page.locator('.review');
        this.reviewAvatar = page.locator('.review__ava img');
        this.reviewName = page.locator('.review__name');
        this.reviewRating = page.locator('.review__ratingStars');
        this.reviewComment = page.locator('.review__comment');
        this.reviewsShowMore = this.reviewsBlock.locator('.moreless');
        this.reviewsMore = page.locator('.reviewFull');
        this.reviewImage = page.locator('.review__img img');
        this.lightbox = page.getByRole('dialog');
        this.lightboxCurrentImage = page.locator('.lg-current img');
        this.lightboxItem = this.lightbox.locator('.lg-item');
        this.closeButton = this.lightbox.getByRole('button', { name: 'Close gallery' });
        this.nextButton = this.lightbox.getByRole('button', { name: 'Next slide' });
        this.prevButton = this.lightbox.getByRole('button', { name: 'Previous slide' });
    }
}