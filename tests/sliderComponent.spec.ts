import { test, expect } from '@playwright/test';
import { Slider } from '../pageObjects/components/slider';

test('Slider Component Test', async ({ page }) => {
  const slider = new Slider(page);

  await page.goto('/');
  // Slider
  await expect(slider.sliderBlock).toBeVisible();
  await expect(slider.currentSlideImage).toBeVisible();
  await expect(slider.currentSlide).toHaveAttribute('data-slick-index', '0'); // Validate frist slide is the current one
  // Sldier navigaiton by the buttons
  await slider.nextButton.click();
  await expect(slider.sliderBlock.locator('[data-slick-index="1"]')).toHaveCSS('opacity', '1'); // Transition is completed
  await expect(slider.currentSlide).toHaveAttribute('data-slick-index', '1');
  await expect(slider.currentSlideImage).toBeVisible();
  await slider.prevButton.click();
  await expect(slider.sliderBlock.locator('[data-slick-index="0"]')).toHaveCSS('opacity', '1');
  await expect(slider.currentSlide).toHaveAttribute('data-slick-index', '0');
  await expect(slider.currentSlideImage).toBeVisible();
  // Slider navigation by the Preview slider
  await slider.previewSlider.locator(`.sliderPrev__item[data-slick-index="2"]`).click();
  await expect(slider.sliderBlock.locator('[data-slick-index="2"]')).toHaveCSS('opacity', '1');
  await expect(slider.currentSlide).toHaveAttribute('data-slick-index', '2'); 
  await expect(slider.currentSlideImage).toBeVisible();
});
