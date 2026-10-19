import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Scroll an element into the center of the viewport to protect against sticky headers/footers
     */
    async scrollCenter(locator: Locator): Promise<void> {
        await locator.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
    }

    /**
     * Wait for DOM content and load state
     */
    async waitForPageLoaded(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}
