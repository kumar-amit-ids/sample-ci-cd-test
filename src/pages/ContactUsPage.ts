import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
    private readonly pageHeading: Locator;
    private readonly addressCard: Locator;
    private readonly phoneCard: Locator;
    private readonly nameInput: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    private readonly messageTextarea: Locator;
    private readonly submitButton: Locator;

    private readonly nameRequiredError: Locator;
    private readonly phoneRequiredError: Locator;
    private readonly emailRequiredError: Locator;
    private readonly messageRequiredError: Locator;

    constructor(page: Page) {
        super(page);

        // Header & Info cards
        this.pageHeading = page.getByRole('heading', { name: 'Contact Us' }).first();

        this.addressCard = page.getByText('Our Address').first()
            .or(page.locator('text=Blucygnus, Inc.')).first();

        this.phoneCard = page.getByText('+1 (302) 302-3454').first()
            .or(page.locator('text=Phone')).first();

        // Form inputs
        this.nameInput = page.getByPlaceholder('Enter your name')
            .or(page.locator('#name'))
            .or(page.getByLabel('Name'));

        this.phoneInput = page.getByPlaceholder('1 (702) 123-4567')
            .or(page.locator('input.form-control'))
            .or(page.locator('input[type="tel"]'));

        this.emailInput = page.getByPlaceholder('Enter your email')
            .or(page.locator('#email'))
            .or(page.getByLabel('Email'));

        this.messageTextarea = page.getByPlaceholder('Enter your message')
            .or(page.locator('#message'))
            .or(page.locator('textarea'));

        this.submitButton = page.getByRole('button', { name: 'Submit' })
            .or(page.locator('button:has-text("Submit")'));

        // Field Validation Errors
        this.nameRequiredError = page.getByText('Please enter your name');
        this.phoneRequiredError = page.getByText('Please enter your phone number');
        this.emailRequiredError = page.getByText('Please enter your email');
        this.messageRequiredError = page.getByText('Please enter your message');
    }

    // Public Locators for Web-First Assertions
    get pageHeadingLocator(): Locator {
        return this.pageHeading;
    }

    get addressCardLocator(): Locator {
        return this.addressCard;
    }

    get phoneCardLocator(): Locator {
        return this.phoneCard;
    }

    get nameInputLocator(): Locator {
        return this.nameInput;
    }

    get phoneInputLocator(): Locator {
        return this.phoneInput;
    }

    get emailInputLocator(): Locator {
        return this.emailInput;
    }

    get messageTextareaLocator(): Locator {
        return this.messageTextarea;
    }

    get submitButtonLocator(): Locator {
        return this.submitButton;
    }

    get nameRequiredErrorLocator(): Locator {
        return this.nameRequiredError;
    }

    get phoneRequiredErrorLocator(): Locator {
        return this.phoneRequiredError;
    }

    get emailRequiredErrorLocator(): Locator {
        return this.emailRequiredError;
    }

    get messageRequiredErrorLocator(): Locator {
        return this.messageRequiredError;
    }

    // Actions
    async goToContactUsPage(): Promise<void> {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await this.page.goto('/contact-us', { waitUntil: 'domcontentloaded', timeout: 15000 });
                await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
                return;
            } catch (error) {
                if (attempt === 3) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async enterName(name: string): Promise<void> {
        await this.scrollCenter(this.nameInput);
        await this.nameInput.fill(name);
    }

    async enterPhone(phone: string): Promise<void> {
        await this.scrollCenter(this.phoneInput);
        await this.phoneInput.fill(phone);
    }

    async enterEmail(email: string): Promise<void> {
        await this.scrollCenter(this.emailInput);
        await this.emailInput.fill(email);
    }

    async enterMessage(message: string): Promise<void> {
        await this.scrollCenter(this.messageTextarea);
        await this.messageTextarea.fill(message);
    }

    async fillContactForm(data: { name?: string; phone?: string; email?: string; message?: string }): Promise<void> {
        if (data.name) await this.enterName(data.name);
        if (data.phone) await this.enterPhone(data.phone);
        if (data.email) await this.enterEmail(data.email);
        if (data.message) await this.enterMessage(data.message);
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
