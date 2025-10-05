class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.emailField.type(username);
        await this.passwordField.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { LoginPage };