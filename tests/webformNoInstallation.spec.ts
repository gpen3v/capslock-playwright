import { test, expect } from '@playwright/test';
import { Webform } from '../pageObjects/components/webform';
import { webformTestData, webformValidations, endpoints } from '../utils/testData.json';

test('Webform Test - No Installation in the Area', async ({ page }) => {
  const webform = new Webform(page);

  await page.goto('/');
  await expect(webform.webform1).toBeVisible();

  // Step 1
  await webform.zipCodeInput.fill(webformTestData.zipCodeNoInstallation);
  await webform.responseOutOfArea(endpoints.handleForm);
  // Step 2
  await expect(webform.sorryStep).toBeVisible();
  await expect(webform.stepTitle.getByText(webformTestData.webformSteps[5])).toBeVisible();

  await webform.nextStepButton.click(); // Empty Email field
  await expect(webform.currentStepError).toHaveText(webformValidations.enterEmailAddress);

  await webform.sorryEmail.fill(webformTestData.emailWrong); // Wrong email
  await webform.nextStepButton.click();
  await expect(webform.currentStepError).toHaveText(webformValidations.wrongEmail);
  
  await webform.sorryEmail.fill(webformTestData.email); // Correct email
  await webform.nextStepButton.click();
  // Thank you message 
  await expect(webform.stepTitle.getByText(webformTestData.webformSteps[6])).toBeVisible();
});