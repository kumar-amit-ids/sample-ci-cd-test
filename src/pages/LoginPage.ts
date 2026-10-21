import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly rememberMeCheckbox: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly createAccountLink: Locator;
    private readonly passwordToggle: Locator;
    private readonly emailRequiredError: Locator;
    private readonly emailFormatError: Locator;
    private readonly passwordRequiredError: Locator;
    private readonly authErrorToast: Locator;

    constructor(page: Page) {
        super(page);

        // Locators with semantic roles and multi-locator fallback chains
        this.emailInput = page.getByPlaceholder('Email')
            .or(page.getByRole('textbox', { name: 'Email' }))
            .or(page.locator('input[placeholder="Email"]'));

        this.passwordInput = page.getByPlaceholder('Password')
            .or(page.getByRole('textbox', { name: 'Password' }))
            .or(page.locator('input[type="password"]'));

        this.signInButton = page.getByRole('button', { name: 'Sign in' })
            .or(page.locator('button:has-text("Sign in")'));

        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' })
            .or(page.locator('input[type="checkbox"]'));

        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' })
            .or(page.locator('a[href*="forgot-password"]'));

        this.createAccountLink = page.getByRole('link', { name: 'Create an account' })
            .or(page.locator('a[href*="signup"]'));

        this.passwordToggle = page.getByRole('img', { name: 'eye-invisible' })
            .or(page.getByRole('img', { name: 'eye' }))
            .or(page.locator('.ant-input-password-icon'));

        this.emailRequiredError = page.getByText('Please input your email!');
        this.emailFormatError = page.getByText('Please enter a valid email!');
        this.passwordRequiredError = page.getByText('Please input your password!');
        this.authErrorToast = page.getByText("We couldn't find an account with that email. Please sign up.")
            .or(page.locator('.ant-notification-notice')).first();
    }

    // Public Locators for web-first assertions
    get emailLocator(): Locator {
        return this.emailInput;
    }

    get passwordLocator(): Locator {
        return this.passwordInput;
    }

    get signInButtonLocator(): Locator {
        return this.signInButton;
    }

    get emailRequiredErrorLocator(): Locator {
        return this.emailRequiredError;
    }

    get emailFormatErrorLocator(): Locator {
        return this.emailFormatError;
    }

    get passwordRequiredErrorLocator(): Locator {
        return this.passwordRequiredError;
    }

    get authErrorToastLocator(): Locator {
        return this.authErrorToast;
    }

    get forgotPasswordLinkLocator(): Locator {
        return this.forgotPasswordLink;
    }

    get createAccountLinkLocator(): Locator {
        return this.createAccountLink;
    }

    // Actions
    async goToLoginPage(): Promise<void> {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await this.page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
                await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
                return;
            } catch (error) {
                if (attempt === 3) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async enterEmail(email: string): Promise<void> {
        await this.scrollCenter(this.emailInput);
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.scrollCenter(this.passwordInput);
        await this.passwordInput.fill(password);
    }

    async clickSignIn(): Promise<void> {
        await this.scrollCenter(this.signInButton);
        await this.signInButton.click();
    }

    async doLogin(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.passwordToggle.click();
    }

    async getPasswordInputType(): Promise<string | null> {
        return await this.passwordInput.getAttribute('type');
    }

    async isLoginPageDisplayed(): Promise<boolean> {
        return await this.signInButton.isVisible();
    }

    async isEmailRequiredErrorDisplayed(): Promise<boolean> {
        return await this.emailRequiredError.isVisible();
    }

    async isEmailFormatErrorDisplayed(): Promise<boolean> {
        return await this.emailFormatError.isVisible();
    }

    async isPasswordRequiredErrorDisplayed(): Promise<boolean> {
        return await this.passwordRequiredError.isVisible();
    }

    async isAuthErrorToastDisplayed(): Promise<boolean> {
        return await this.authErrorToast.isVisible();
    }
}
