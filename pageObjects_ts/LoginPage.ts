import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page: Page;
    signInButton: Locator;
    emailField: Locator;
    passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.emailField.type(username);
        await this.passwordField.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}