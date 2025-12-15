import { test, expect } from '@playwright/test';
import { ReviewsBlock } from '../pageObjects/components/reviews';

test('Reviews Component Test', async ({ page }) => {
  const reviewsBlock = new ReviewsBlock(page);

  await page.goto('/');
  // Reviews block
  await expect(reviewsBlock.reviewsBlock).toBeVisible();
  await expect(reviewsBlock.reviewsMore).not.toBeVisible();
  await reviewsBlock.reviewsShowMore.click(); // Validate Show more reviews functionality
  await expect(reviewsBlock.reviewsMore).toBeVisible();
  for (const review of await reviewsBlock.review.all()) {
    await expect(review.locator(reviewsBlock.reviewAvatar)).toBeVisible();
    await expect(review.locator(reviewsBlock.reviewRating)).toBeVisible();
    await expect(review.locator(reviewsBlock.reviewName)).toBeVisible();
    await expect(review.locator(reviewsBlock.reviewComment)).toBeVisible();
    
    // If a review comment has an image validate it opens in a lightbox
    if (await review.locator(reviewsBlock.reviewImage).count() > 0) {
      await review.locator(reviewsBlock.reviewImage).first().scrollIntoViewIfNeeded();
      await review.locator(reviewsBlock.reviewImage).first().click(); 
      await expect(reviewsBlock.lightboxCurrentImage).toBeVisible();
      await expect(page).toHaveURL('/#lg=1&slide=0');

      // If a comment has more than 1 images valiadate lightbox slider
      if (await review.locator(reviewsBlock.reviewImage).count() > 1) { 
        // Next image
        await reviewsBlock.nextButton.click();
        await expect(reviewsBlock.lightboxItem.nth(1)).toHaveClass(/lg-current/);
        await expect(page).toHaveURL('/#lg=1&slide=1');
        await expect(reviewsBlock.lightboxItem.nth(1)).toHaveCSS('opacity', '1');
        await expect(reviewsBlock.lightboxCurrentImage).toBeVisible();
        // Previous image
        await reviewsBlock.prevButton.click();
        await expect(reviewsBlock.lightboxItem.first()).toHaveClass(/lg-current/);
        await expect(page).toHaveURL('/#lg=1&slide=0');
        await expect(reviewsBlock.lightboxItem.first()).toHaveCSS('opacity', '1');
        await expect(reviewsBlock.lightboxCurrentImage).toBeVisible();
      }
      // Close lightbox
      await reviewsBlock.closeButton.click();
      await expect(reviewsBlock.lightbox).toBeHidden();
    }
  };
  await reviewsBlock.reviewsShowMore.click();
  await expect(reviewsBlock.reviewsMore).not.toBeVisible();
});