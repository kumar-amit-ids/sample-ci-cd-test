/**
 * User Story: BK-CONT-01 - Contact Us Information & Inquiries
 * 
 * Scenarios / Actions Covered:
 * 1. Scenario 2.1: Contact Us page layout and contact information card verification
 * 2. Scenario 2.2: Validation errors triggered on empty form submission
 * 3. Scenario 2.3: Valid form field filling and character entry
 * 4. Scenario 2.4: Individual field error resolution on input change
 * 5. Scenario 2.5: [SKIPPED] User submits contact form successfully (Prevents spamming support inbox)
 */

import { test, expect } from '../../src/fixtures/pagefixtures';
import { Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ContactUsPage } from '../../src/pages/ContactUsPage';

test.describe('Contact Us Module', () => {
    test.describe.configure({ mode: 'serial' });
    test.setTimeout(60000);

    let page: Page;
    let contactUsPage: ContactUsPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
        await expect(page).toHaveURL(/^(?!.*\/login).*$/, { timeout: 15000 });
        contactUsPage = new ContactUsPage(page);
    });

    test.afterAll(async () => {
        await page?.close();
    });

    test.beforeEach(async () => {
        await contactUsPage.goToContactUsPage();
    });

    test('Scenario 2.1: Contact Us page layout and contact info cards verification @smoke @critical', async () => {
        // Step 1: Verify main page heading
        await expect(contactUsPage.pageHeadingLocator).toBeVisible();

        // Step 2: Verify address information card
        await expect(contactUsPage.addressCardLocator).toBeVisible();

        // Step 3: Verify phone contact information card
        await expect(contactUsPage.phoneCardLocator).toBeVisible();

        // Step 4: Verify submit button is visible
        await expect(contactUsPage.submitButtonLocator).toBeVisible();
    });

    test('Scenario 2.2: Validation errors triggered on empty form submission @smoke @critical', async () => {
        // Step 1: Click submit with empty form fields
        await contactUsPage.clickSubmit();

        // Step 2: Verify all 4 required validation errors are visible
        await expect(contactUsPage.nameRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.phoneRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.emailRequiredErrorLocator).toBeVisible();
        await expect(contactUsPage.messageRequiredErrorLocator).toBeVisible();
    });

    test('Scenario 2.3: Valid form field filling and entry verification @regression', async () => {
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

    test('Scenario 2.4: Individual field error resolution on input change @regression', async () => {
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

    test.skip('Scenario 2.5: User submits contact form successfully [SKIPPED - Prevent spamming support inbox] @regression', async () => {
        // Step 1: Fill contact form with valid test data
        await contactUsPage.fillContactForm({
            name: 'QA Automation Tester',
            phone: '3023023454',
            email: 'qa.automation@example.com',
            message: 'Inquiry message regarding enterprise safe vault capabilities.',
        });

        // Step 2: Click submit button (SKIPPED in automation to prevent sending live emails to support team)
        await contactUsPage.clickSubmit();
    });
});
