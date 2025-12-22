import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { Webform } from './components/webform';
import { endpoints } from '../utils/testData.json'

export class LandingPage {
    readonly page: Page;
    readonly location: Locator;
    // Sections
    readonly heroSection: Locator;
    readonly generalViewSection: Locator;
    // Video
    readonly video: Locator;
    readonly videoPlayButton: Locator;
    // Blocks
    readonly blockTitle: Locator;
    readonly blockText: Locator;
    readonly fallingBlock: Locator;
    readonly fallingQuote: Locator;
    readonly healthblockImages: Locator;
    readonly healthBlock: Locator;
    readonly healthblockIcon: Locator;
    readonly healthblockTitle: Locator;
    readonly healthblockText: Locator;
    readonly warantyBlock: Locator;
    readonly howBlock: Locator;
    readonly mobileScrollTrigger: Locator;
    

    constructor(page: Page, private request: APIRequestContext) {
        this.page = page;
        this.location = page.locator('.location__city');
        // Sections
        this.heroSection = page.locator('.hero');
        this.generalViewSection = page.locator('.generalView');
        // Video
        this.video = page.locator('video');
        this.videoPlayButton = page.locator('button.play');
        // Blocks
        this.blockTitle  = page.locator('.blockTitle__hdr');
        this.blockText  = page.locator('.blockTitle__txt');
        this.fallingBlock = page.locator('.falling');
        this.fallingQuote = this.fallingBlock.locator('.quote__content');
        this.healthblockImages = page.locator('.healthBlock__imgWrap');
        this.healthBlock = page.locator('.healthBlock');
        this.healthblockIcon = this.page.locator('.healthBlock__icon img');
        this.healthblockTitle = this.page.locator('.healthBlock__hdr');
        this.healthblockText = this.page.locator('.healthBlock__txt');
        this.warantyBlock = page.locator('.warranty');
        this.howBlock = page.locator('.howBlock');
        // Mobile Scroll trigger button
        this.mobileScrollTrigger = this.page.locator('[data-scroll-trigger]');
    }

    /**
     * Validates the mobile scroll trigger functionality by clicking the trigger button
     * and verifying that the form container is scrolled into viewport.
     */
    async validateMobileScrollTrigger() {
        await this.mobileScrollTrigger.click()
        // Validate that the form container is scrolled into view
        const webform = new Webform(this.page);
        await expect.soft(webform.webform1).toBeInViewport();
    }

    /**
     * Validates the location display by fetching the user's location from IP geolocation API
     * and verifying it matches the displayed location text on the page.
     */
    async validateLocation() {
        const response = await this.request.get(endpoints.location, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        await expect.soft(this.location).toHaveText(`Available in ${data.region}`);
    }

    /**
     * Validates video playback configuration by checking that the video element has a source URL,
     * and that autoplay, muted, and loop attributes are set correctly.
     * Validates that a video is playing by comparing the video's currentTime before and after a delay.
     * @param section - The locator for the section containing the video element
     */
    async validateVideoPlayback(section: Locator) {
        await section.locator('video').scrollIntoViewIfNeeded();
        // Validate src is not empty
        const src = await section.locator('video').getAttribute('src');
        expect(src).toBeTruthy();
        // Validate autoplay, muted and loop
        expect(await section.locator('video').evaluate((v: HTMLVideoElement) => v.autoplay)).toBeTruthy();
        expect(await section.locator('video').evaluate((v: HTMLVideoElement) => v.muted)).toBeTruthy();
        expect(await section.locator('video').evaluate((v: HTMLVideoElement) => v.loop)).toBeTruthy();

        // Validate video is playing
        const t1 = await section.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
        await this.page.waitForTimeout(500); // Wait 0.5 second
        const t2 = await section.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
        expect(t2).not.toBe(t1);
    }

    /**
     * Validates that a video is paused by comparing the video's currentTime before and after a delay.
     * If the video is paused, the currentTime should remain unchanged.
     * @param section - The locator for the section containing the video element
     */
    async validateVideoPaused(section: Locator) {
        const t1 = await section.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
        await this.page.waitForTimeout(500); // Wait 0.5 second
        const t2 = await section.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
        expect(t2).toBe(t1);
    }

    /**
     * Validates that all text items matching the provided locator are not empty.
     * Iterates through all matching elements and checks that each has content.
     * @param textItem - The locator for the text items to validate
     */
    async validateTextItems(textItem: Locator) {
        for (const item of await textItem.all()) {
            await expect(item).not.toBeEmpty();
        }
    }
} 