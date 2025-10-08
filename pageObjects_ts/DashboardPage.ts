import { Locator, Page } from "@playwright/test";

export class DashboardPage {

    page: Page;
    products: Locator;
    produtcsText: Locator;
    cart: Locator;
    orders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.produtcsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(productName: string) {

        const titles = await this.produtcsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() == productName) {
                //add to cart
                await this.products.nth(i).locator("button:has-text('Add To Cart')").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async navigateToOrders() {
        await this.orders.click();
    }
}