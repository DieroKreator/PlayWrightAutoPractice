const { test, expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("ul.cartWrap li.items").first();
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}
module.exports = { CartPage };