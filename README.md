# Playwright Test Automation suite for the Walk-In Bath landing Page

This project contains automated tests for the demo landing page, developed according to the requirements of the technical assignment from CapsLock for the Senior Automation QA Engineer role. The test framework is built using Playwright with TypeScript.

## Project Structure

```
├── .github/workflows/         # GitHub Actions workflow configurations for CI/CD
├── pageObjects/               # Page Object Model implementations
│   ├── landingPage.ts         # Main landing page object with location, video, and block validations
│   ├── thankyouPage.ts        # Thank you page object after form submission
│   └── components/            # Reusable component page objects
│       ├── heroSection.ts     # Hero section component with title, subtitle, badge, and list items
│       ├── reviews.ts         # Reviews component with show more functionality and lightbox
│       ├── slider.ts          # Image slider component with navigation controls
│       └── webform.ts         # Multi-step form component with validation methods
├── tests/                     # Test suites
│   ├── landingPage.spec.ts    # Landing page smoke tests, mobile and desktop execution
│   ├── reviewsComponent.spec.ts      # Reviews component detailed functionality tests
│   ├── sliderComponent.spec.ts       # Slider component navigation and transitions tests
│   ├── webformSubmit.spec.ts         # Complete form submission flow test
│   ├── webformValidations.spec.ts    # Form validation error messages test
│   └── webformNoInstallation.spec.ts # Out-of-area form flow test
├── utils/                     # Utility files and shared resources
│   └── testData.json          # Centralized test data (form data, validation messages, titles)
├── playwright.config.ts       # Playwright configuration (projects, reporters, base URL)
├── package.json               # Node.js dependencies and project metadata
└── README.md                  # README file
```

## Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gpen3v/capslock-playwright.git
cd capslock-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run a specific test file:
```bash
npx playwright test tests/landingPage.spec.ts
```

### Run tests in headed mode:
```bash
npx playwright test --headed
```

## Test Scenarios

The page is intended for marketing purposes, so user engagement components and interactive functionalities are critical and should be included in automated testing. The following test scenarios are automated to ensure the core functionality and user experience quality of the walk-in bath landing page:

#### 1. Landing Page Desktop Test - Validation of presence of all main components, videos playback and location detection via IP geolocation.
**Why Automated**: This is a smoke test that verifies the landing page loads correctly with all essential elements. Since this is the primary customer acquisition page, any breakage would directly impact lead generation and business revenue.

#### 2. Landing Page Mobile Test - Validation of presence of all main components on the mobile vesion of the page, including a scroll trigger button for quick navigation to the cost estimation form.
**Why Automated**: Mobile display of marketing pages is critical for every target audience. Here a scroll trigger button for scrolls to the cost estimation form, which is a business critical functionality. In this case it appears not functional.

#### 3. Reviews Component Test - Reviews visibility, "Show more" toggle functionality, review elements (avatar, rating, name, comment), image lightbox opening/closing (if available in a review).
**Why Automated**: The reviews section builds trust with potential customers. Also, its content may potentially change with new reviews, so it is worth having automated validations.

#### 4. Slider Component Test - Slider visibility, slide navigation via next/previous buttons, preview slider navigation
**Why Automated**: The slider is one of the most user-engaging components on the page.

#### 5. Webform Submission Test - Validates the complete happy path of the cost estimation form. ZIP code entry, multi-select quiz cards (interests, property type), contact information collection (name, email, phone), progress bar accuracy, form step synchronization with the cloned form at the bottom, successful redirect to thank you page.
**Why Automated**: The cost estimation form is the key business-critical feature on the landing page. If the submission flow fails, it prevents clients from engaging, which can directly impact business outcomes.

#### 6. Webform Validations Test - Validates all form validation error messages and client-side validation logic.
**Why Automated**: Proper validation prevents invalid data submission and improves user experience. 

#### 7. Webform No Installation Test - The case when service is not available in the entered ZIP code area.
**Why Automated**: As another scenario of the cost estimation form, this case is worth automating.

### Summary of the execution results at the time of development:
**Total Test Scenarios**: 7  |  **Passed**: 3  |  **Failed**: 4

## Suggested Improvements
- **Failure Handling in Custom Methods** — Enhance custom methods with more descriptive error messages to clearly identify the point of failure in the report.
- **Improved Visual Reporting** – Interactive and better looking reporting could be integrated in the framework, such as Allure. Currently, it uses the default Playwright HTML report.
- **Environment variables** - If environment specific or sensitive data is expected to be used, .env file can be introduced, keeping it in .gitignore .
- **Validation of real API data** - Some features typically require interaction with an API, such as retrieving new reviews. In such cases, validating against real API data is a must.

