import { test, expect } from '@playwright/test';
import { Webform } from '../pageObjects/components/webform';
import { ThankYouPage } from '../pageObjects/thankyouPage';
import { webformTestData, webformValidations, endpoints } from '../utils/testData.json';

test('Webform Validations Test', async ({ page }) => {
  const webform = new Webform(page);
  const thankyouPage = new ThankYouPage(page);

  await page.goto('/');
  await expect(webform.webform1).toBeVisible();

  // Step 1
  await webform.nextButton.click(); // Without a ZIP code
  await expect(webform.currentStepError).toHaveText(webformValidations.emptyZipCode);

  await webform.zipCodeInput.fill(webformTestData.zipCodeWrong); // Wrong ZIP code
  await webform.nextButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.wrongZipCode);

  await webform.zipCodeInput.fill(webformTestData.zipCode); // Correct ZIP code
  await webform.nextButton.click();
  
  // Step 2
  await expect(webform.webform1.locator('.step-2')).toBeVisible();
  await expect.soft(webform.progressBar).toHaveAttribute('style', 'width: 36%');
  await expect(webform.progressCurrentStep).toHaveText('2');
  await webform.nextButton.click(); // Without to select anything on Step 2
  await expect.soft(webform.currentStepError).toHaveText(webformValidations.chooseVariant); // Bug - the step can be passed without any selection
  
  // Step 3
  await expect(webform.webform1.locator('.step-3')).toBeVisible();
  await webform.nextButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.chooseVariant); // Without to select anything on Step 3
  await webform.selectCard(webformTestData.step3Cards[1]);
  await webform.nextButton.click();
  
  // Step 4
  await expect(webform.webform1.locator('.step-4')).toBeVisible();
  await webform.goToEstimateButton.click(); // Without name and email - Needs Clarifications
  expect(webform.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)).toBeTruthy(); // Read browser’s native validation message

  await webform.emailInput.fill(webformTestData.emailWrong); // Wrong email
  await webform.goToEstimateButton.click();
  expect(webform.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)).toBeTruthy(); // Read browser’s native validation message

  await webform.emailInput.fill(webformTestData.email); // Correct email but empty name
  await webform.goToEstimateButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.enterName);

  await webform.nameInput.fill(webformTestData.nameWrong); // Correct email but only first name
  await webform.goToEstimateButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.fullNameRequired);
  
  await webform.nameInput.fill(webformTestData.name); // Correct name
  await webform.goToEstimateButton.click();
 
  // Step 5
  await expect(webform.webform1.locator('.step-5')).toBeVisible();
  await webform.submitButton.click(); // Without a phone number
  await expect(webform.currentStepError).toHaveText(webformValidations.enterPhoneNumber);
  
  await webform.phoneInput.fill(webformTestData.phoneWrong); // Wrong phone number
  await webform.submitButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.wrongPhoneNumber);

  await webform.phoneInput.fill(webformTestData.phone); // Correct phone number

  // Response after submit
  await webform.responseSubmitSuccess(endpoints.thankyou);
  await expect(webform.currentStepError).not.toBeVisible();
  // Thank you page 
  await expect(page).toHaveURL(endpoints.thankyou);
  await expect(thankyouPage.thankyouTitle).toBeVisible();
});