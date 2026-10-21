/**
 * User Story: BK-CONT-01 - Contact Us Information & Inquiries
 * 
 * Scenarios / Actions Covered:
 * 1. Scenario 2.1: Contact Us page layout and contact information card verification
 * 2. Scenario 2.2: Validation errors triggered on empty form submission
 * 3. Scenario 2.3: Valid form field filling and character entry
 * 4. Scenario 2.4: Individual field error resolution on input change
 */

import { test, expect } from '../../src/fixtures/pagefixtures';

test.describe('Contact Us Module', () => {

    test.beforeEach(async ({ loginPage, contactUsPage }) => {
        // Step 1: Authenticate with staging user
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);

        // Step 2: Navigate to Contact Us page
        await contactUsPage.goToContactUsPage();
    });

    test('Scenario 2.1: Contact Us page layout and contact info cards verification @smoke @critical', async ({ contactUsPage }) => {
        // Step 1: Verify main page heading
        await expect(contactUsPage.pageHeadingLocator).toBeVisible();

        // Step 2: Verify address information card
        await expect(contactUsPage.addressCardLocator).toBeVisible();

        // Step 3: Verify phone contact information card
        await expect(contactUsPage.phoneCardLocator).toBeVisible();

        // Step 4: Verify submit button is visible
        await expect(contactUsPage.submitButtonLocator).toBeVisible();
    });

    test('Scenario 2.2: Validation errors triggered on empty form submission @smoke @critical', async ({ contactUsPage }) => {
        // Step 1: Click submit with empty form fields
        await contactUsPage.clickSubmit();

        // Step 2: Verify all 4 required validation errors are visible
        await expect(contactUsPage.nameRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.phoneRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.emailRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.messageRequiredErrorLocator).toBeVisible();
    });

    test('Scenario 2.3: Valid form field filling and entry verification @regression', async ({ contactUsPage }) => {
        const testData = {
            name: 'QA Automation Tester',
            phone: '3023023454',
            email: 'qa.automation@example.com',
            message: 'Inquiry message regarding enterprise safe vault capabilities.',
        };

        // Step 1: Fill all form fields
        await contactUsPage.fillContactForm(testData);

        // Step 2: Verify values in input fields
        await expect(contactUsPage.nameInputLocator).toHaveValue(testData.name);
        await expect(contactUsPage.emailInputLocator).toHaveValue(testData.email);
        await expect(contactUsPage.messageTextareaLocator).toHaveValue(testData.message);
    });

    test('Scenario 2.4: Individual field error resolution on input change @regression', async ({ contactUsPage }) => {
        // Step 1: Trigger all validation errors by empty submit
        await contactUsPage.clickSubmit();
        await expect(contactUsPage.nameRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.emailRequiredErrorLocator).toBeVisible();

        // Step 2: Enter name and verify name error clears
        await contactUsPage.enterName('Jane Doe');
        await expect(contactUsPage.nameRequiredErrorLocator).toBeHidden();

        // Step 3: Enter email and verify email error clears
        await contactUsPage.enterEmail('jane.doe@example.com');
        await expect(contactUsPage.emailRequiredErrorLocator).toBeHidden();
    });
});
