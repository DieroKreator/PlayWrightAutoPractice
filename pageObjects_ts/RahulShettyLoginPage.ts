import { Locator, Page } from "@playwright/test";

export class RahulShettyLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly checkbox: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.checkbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.checkbox.check();
        await this.signInButton.click();
    }
}
