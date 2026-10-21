import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactUsPage } from '../pages/ContactUsPage';

type PageFixtures = {
    loginPage: LoginPage;
    contactUsPage: ContactUsPage;
};

export const test = baseTest.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page);
        await use(contactUsPage);
    },
});

export { expect };
