import {test, Page, Locator, expect } from '@playwright/test';
import { webformTestData } from '../../utils/testData.json';

export class Webform {
  readonly page: Page;
  readonly webform: Locator;
  readonly webform1: Locator;
  readonly webform2: Locator;
  readonly zipCodeInput: Locator;
  readonly nextButton: Locator;
  readonly goToEstimateButton: Locator;
  readonly submitButton: Locator;
  readonly nextStepButton: Locator;
  readonly progressBar: Locator;
  readonly progressCurrentStep: Locator
  readonly stepTitle: Locator;
  readonly quizCard: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly currentStep: Locator;
  readonly currentStepError: Locator;
  readonly sorryStep: Locator;
  readonly sorryEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.webform = page.locator('.formWrap');
    this.webform1 = page.locator('#form-container-1');
    this.webform2 = page.locator('#form-container-2');
    this.zipCodeInput = this.webform1.locator('[data-zip-code-input]');
    this.nextButton = this.webform1.getByRole('button', { name: 'Next' });
    this.goToEstimateButton = this.webform1.getByRole('button', { name: 'Go to Estimate' });
    this.submitButton = this.webform1.getByRole('button', { name: 'Submit Your Request' });
    this.progressBar = this.webform1.locator('[data-form-progress-value]');
    this.progressCurrentStep = this.webform1.locator('[data-form-progress-current-step]'); 
    this.stepTitle = this.webform1.locator('.stepTitle__hdr');
    this.quizCard = this.webform1.locator('.quizCard');
    this.nameInput = this.webform1.locator('[data-name-input]');
    this.emailInput = this.webform1.locator('.step-4 [name="email"]');
    this.phoneInput = this.webform1.locator('[data-phone-input]');
    this.currentStep = this.webform1.locator('.steps:visible');
    this.currentStepError = this.currentStep.locator('.hasError [data-error-block]');
    this.nextStepButton = this.currentStep.locator('button[type="submit"]');;
    this.sorryStep = this.webform1.locator('.step-sorry');
    this.sorryEmail = this.sorryStep.locator('[name="email"]');
  }

  /**
   * Selects a quiz card by clicking on it and validates that the selection is visually indicated.
   * @param itemLabel - The text label of the quiz card to select
   */
  async selectCard(itemLabel: string) {
    await this.webform1.locator('.quizCard').getByText(itemLabel).click();
    await expect.soft(this.webform1.locator('.quizCard').getByText(itemLabel).locator('.lavin-ok')).toHaveCSS('opacity', '1');
  }

  /**
   * Submits the form step and validates that the response is successful (status 200).
   * @param endpoint - The API endpoint URL to wait for in the response
   */
  async responseSubmitSuccess(endpoint: string) {
    const responsePromise = this.page.waitForResponse(endpoint);
    this.nextStepButton.click();
    const response = await responsePromise;
    expect.soft(response.status()).toBe(200);
  }

  /**
   * Submits the form step and validates that the response indicates the service area is out of coverage.
   * Verifies both a successful response status and that the outOfArea flag is true.
   * @param endpoint - The API endpoint URL to wait for in the response
   */
  async responseOutOfArea(endpoint: string) {
    const responsePromise = this.page.waitForResponse(endpoint);
    this.nextStepButton.click();
    const response = await responsePromise;
    expect.soft(response.status()).toBe(200);
    expect.soft((await response.json()).outOfArea).toBe(true);
  }

  /**
   * Validates that a form field triggers the browser's native HTML5 validation.
   * Checks that the field has a validation message (e.g., when required field is empty).
   * @param field - The locator for the form field to validate
   */
  async browserValidation(field: Locator) {
    // Read browser's native validation message
    const msg = await field.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(msg).toBeTruthy(); // e.g., "Please fill out this field."
  }
}