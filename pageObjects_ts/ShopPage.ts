import { Locator, Page } from "@playwright/test";

export class ShopPage {
    readonly page: Page;
    readonly productTitles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitles = page.locator('.card-title');
    }

    async isProductPresent(productName: string): Promise<boolean> {
        const titles = await this.productTitles.allTextContents();
        return titles.some(title => title.includes(productName));
    }
}
