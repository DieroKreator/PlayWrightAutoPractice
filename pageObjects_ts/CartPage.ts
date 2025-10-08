import { expect, Page, Locator } from "@playwright/test";

export class CartPage {

    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("ul.cartWrap li.items").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName: string) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    getProductLocator(productName: string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}