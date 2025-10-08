import { expect, Locator, Page } from "@playwright/test";

let message1: string = "Hello"; //static typing
// message1 = 2;
console.log(message1);
let age1: number = 20;
let isActive1: boolean = false;

let numberArr1: number[] = [1, 2, 3, 4, 5];

let data: any = "this could be anything";
data = 2;
data = true;

function add1(a: number, b: number): number {
    return a + b;
}

// add1(2, "4"); //error

let user: { name: string; age: number; location: string } = { name: "John", age: 30, location: "UK" };
user.location = "USA";


class CartPage {

    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkoutButton: Locator;
    constructor(page: any) {
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