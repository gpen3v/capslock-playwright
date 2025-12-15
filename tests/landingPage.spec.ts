import { test, expect } from '@playwright/test';
import { LandingPage } from '../pageObjects/landingPage';
import { HeroSection } from '../pageObjects/components/heroSection';
import { Slider } from '../pageObjects/components/slider';
import { Webform } from '../pageObjects/components/webform';
import { ReviewsBlock } from '../pageObjects/components/reviews';

test('Landing Page Test', async ({ page, request }) => {

  const landingPage = new LandingPage(page, request);
  const hero = new HeroSection(page);
  const slider = new Slider(page);
  const webform = new Webform(page);
  const reviewsBlock = new ReviewsBlock(page);
  const projectName = test.info().project?.name ?? ''; // For a project-aware mobile-only assertion

  await page.goto('/');

  // Validate Mobile Scroll Trigger - executes only for Mobile Safari
  if (projectName === 'Mobile Safari') {
    await landingPage.validateMobileScrollTrigger(); // Bug - the mobile scroll triger doesn't work
  }
  
  // Location
  await landingPage.validateLocation();

  //Block titles and subtitles
  await landingPage.validateTextItems(landingPage.blockTitle);
  await landingPage.validateTextItems(landingPage.blockText);

  // Hero Video
  await landingPage.validateVideoPlayback(landingPage.heroSection); // Valiadte video is playing by default
  await landingPage.heroSection.locator('button.play').click(); // Pause video
  await landingPage.validateVideoPaused(landingPage.heroSection);
  await landingPage.heroSection.locator('button.play').click(); // Play again
  await landingPage.validateVideoPlayback(landingPage.heroSection);
  await expect(hero.heroBadge).toBeVisible();
  // Hero Block list
  await landingPage.validateTextItems(hero.heroBlockListItem);

  // Falling block
  await expect(landingPage.fallingBlock).toBeVisible();
  await expect(landingPage.fallingQuote).not.toBeEmpty();

  // Second Video
  await landingPage.validateVideoPlayback(landingPage.generalViewSection); // Valiadte video is playing by default
  await landingPage.generalViewSection.locator('button.play').click(); // Pause video
  await landingPage.validateVideoPaused(landingPage.generalViewSection);
  await landingPage.generalViewSection.locator('button.play').click(); // Play again
  await landingPage.validateVideoPlayback(landingPage.generalViewSection);

  // Health blocks
  await expect(landingPage.healthblockImages).toBeVisible();
  for (const healthBlock of await landingPage.healthBlock.all()) {
    await expect(healthBlock.locator(landingPage.healthblockIcon)).toBeVisible();
    await expect(healthBlock.locator(landingPage.healthblockTitle)).toBeVisible();
    await expect(healthBlock.locator(landingPage.healthblockText)).toBeVisible();
  }

  // Slider
  await expect(slider.sliderBlock).toBeVisible();
  await expect(slider.currentSlideImage).toBeVisible();

  // Waranty block
  await expect(landingPage.warantyBlock).toBeVisible();

  // Webforms
  await expect(webform.webform1).toBeVisible();
  await expect(webform.webform2).toBeVisible();
  await landingPage.validateTextItems(webform.stepTitle);

  // How blocks - video on the left side, text on the right side
  for (const howBlock of await landingPage.howBlock.all()) {
    await landingPage.validateVideoPlayback(howBlock);
    await expect(howBlock.locator('.howBlock__content')).toBeVisible();
  }

  // Reviews block
  await expect(reviewsBlock.reviewsBlock).toBeVisible();
  await reviewsBlock.reviewsShowMore.click();
  await expect(reviewsBlock.reviewsMore).toBeVisible();
});