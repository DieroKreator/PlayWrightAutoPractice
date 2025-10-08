const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../pageObjects/POManager');
const {playwright} = require('@playwright/test');

Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {

    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
});

When('Add {string} to Cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Verify {string} is displayed in Cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Enter valid details and place the order', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Verify order is present in Order history', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});