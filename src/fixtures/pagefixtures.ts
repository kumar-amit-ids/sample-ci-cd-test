import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type PageFixtures = {
    loginPage: LoginPage;
};

export const test = baseTest.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect };
