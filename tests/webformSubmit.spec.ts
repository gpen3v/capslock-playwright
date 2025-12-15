import { test, expect } from '@playwright/test';
import { Webform } from '../pageObjects/components/webform';
import { ThankYouPage } from '../pageObjects/thankyouPage';
import { webformTestData, endpoints } from '../utils/testData.json';

test('Webform Submition Test', async ({ page }) => {
  const webform = new Webform(page);
  const thankyouPage = new ThankYouPage(page);

  await page.goto('/');

  await expect(webform.webform1).toBeVisible();
  await expect(webform.webform2).toBeVisible();

  // Step 1
  await webform.zipCodeInput.fill(webformTestData.zipCode);
  await webform.responseSubmitSuccess(endpoints.handleForm);
  // Step 2
  await expect(webform.webform1.locator('.step-2')).toBeVisible();
  await expect(webform.webform2.locator('.step-2')).toBeVisible(); // Validation for the syncing of the webfrom at the bottom
  await expect.soft(webform.progressBar).toHaveAttribute('style', 'width: 36%');
  await expect(webform.progressCurrentStep).toHaveText('2');
  await webform.selectCard(webformTestData.step2Cards[0]);
  await webform.selectCard(webformTestData.step2Cards[1]);
  await webform.selectCard(webformTestData.step2Cards[2]);
  await webform.selectCard(webformTestData.step2Cards[3]);
  await webform.nextButton.click();
  // Step 3
  await expect(webform.webform1.locator('.step-3')).toBeVisible();
  await expect(webform.webform2.locator('.step-3')).toBeVisible(); // Validation for the syncing of the webfrom at the bottom
  await expect.soft(webform.progressBar).toHaveAttribute('style', 'width: 52%');
  await expect.soft(webform.progressCurrentStep).toHaveText('3');
  await webform.selectCard(webformTestData.step3Cards[0]);
  await webform.nextButton.click();
  // Step 4
  await expect(webform.webform1.locator('.step-4')).toBeVisible();
  await expect(webform.webform2.locator('.step-4')).toBeVisible(); // Validation for the syncing of the webfrom at the bottom
  await expect.soft(webform.progressBar).toHaveAttribute('style', 'width: 80%');
  await expect(webform.progressCurrentStep).toHaveText('4');
  await webform.nameInput.fill(webformTestData.name);
  await webform.emailInput.fill(webformTestData.email);
  await webform.goToEstimateButton.click();
  // Step 5
  await expect(webform.webform1.locator('.step-5')).toBeVisible();
  await expect(webform.webform2.locator('.step-5')).toBeVisible(); // Validation for the syncing of the webfrom at the bottom
  await expect.soft(webform.progressBar).toHaveAttribute('style', 'width: 100%');
  await expect(webform.progressCurrentStep).toHaveText('5');
  await webform.phoneInput.fill(webformTestData.phone);
  // Response after submit
  await webform.responseSubmitSuccess(endpoints.thankyou);
  // Thank you page 
  await expect(page).toHaveURL(endpoints.thankyou);
  await expect(thankyouPage.thankyouTitle).toBeVisible();
  await expect(thankyouPage.thankyouText).toBeVisible();
  await expect(thankyouPage.logosComponent).toBeVisible();
});