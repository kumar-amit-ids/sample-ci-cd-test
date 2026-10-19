/**
 * User Story: BK-AUTH-01 - User Authentication & Login Verification
 * 
 * Scenarios / Actions Covered:
 * 1. Scenario 1.1: User is able to login with valid credentials from env and land on dashboard
 * 2. Scenario 1.2: Validation errors displayed on empty form submission
 * 3. Scenario 1.3: Validation error displayed for invalid email format
 * 4. Scenario 1.4: Password masking and visibility toggle
 * 5. Scenario 1.5: Navigation links to Forgot Password and Sign Up pages
 */

import { test, expect } from '../../src/fixtures/pagefixtures';

test.describe('Authentication - Login Module', () => {

    test.beforeEach(async ({ loginPage }) => {
        // Step 1: Navigate to the login page
        await loginPage.goToLoginPage();
    });

    test('Scenario 1.1: User logs in successfully with valid credentials from env @smoke @critical', async ({ page, loginPage }) => {
        // Step 1: Ensure credentials exist in env
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        expect(username, 'USERNAME must be defined in environment file').toBeTruthy();
        expect(password, 'PASSWORD must be defined in environment file').toBeTruthy();

        // Step 2: Fill in valid credentials and submit
        await loginPage.doLogin(username!, password!);

        // Step 3: Verify redirection to dashboard URL
        await expect(page).toHaveURL(/^(?!.*\/login).*$/, { timeout: 15000 });
    });

    test('Scenario 1.2: Validation errors triggered on empty form submission @smoke @critical', async ({ loginPage }) => {
        // Step 1: Click Sign in button with empty fields
        await loginPage.clickSignIn();

        // Step 2: Verify field validation errors are visible
        await expect(loginPage.emailRequiredErrorLocator).toBeVisible();
        await expect(loginPage.passwordRequiredErrorLocator).toBeVisible();
    });

    test('Scenario 1.3: Validation error displayed for invalid email format @regression', async ({ loginPage }) => {
        // Step 1: Enter malformed email and password
        await loginPage.enterEmail('invalid-email-format');
        await loginPage.enterPassword('SomePassword123!');

        // Step 2: Click Sign in button to trigger validation
        await loginPage.clickSignIn();

        // Step 3: Verify invalid email error message is visible
        await expect(loginPage.emailFormatErrorLocator).toBeVisible();
    });


    test('Scenario 1.4: Password masking and visibility toggle @regression', async ({ loginPage }) => {
        // Step 1: Enter password into password field
        await loginPage.enterPassword('SecretPassword123!');

        // Step 2: Verify password input is masked by default
        expect(await loginPage.getPasswordInputType()).toBe('password');

        // Step 3: Toggle password visibility
        await loginPage.togglePasswordVisibility();
        expect(await loginPage.getPasswordInputType()).toBe('text');

        // Step 4: Toggle again to mask
        await loginPage.togglePasswordVisibility();
        expect(await loginPage.getPasswordInputType()).toBe('password');
    });

    test('Scenario 1.5: Navigation links to Forgot Password and Sign Up pages @regression', async ({ loginPage }) => {
        // Step 1: Verify Forgot Password link is visible and has correct destination
        await expect(loginPage.forgotPasswordLinkLocator).toBeVisible();
        await expect(loginPage.forgotPasswordLinkLocator).toHaveAttribute('href', '/forgot-password');

        // Step 2: Verify Create Account link is visible and has correct destination
        await expect(loginPage.createAccountLinkLocator).toBeVisible();
        await expect(loginPage.createAccountLinkLocator).toHaveAttribute('href', '/signup');
    });
});
