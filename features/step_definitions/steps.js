const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {

    this.browser = await playwright.chromium.launch();
    this.context = (await this.browser).newContext();
    this.page = (await this.context).newPage();
    this.poManager = new POManager(this.page);
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {

    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in Cart', async function (productName) {

    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();
});

When('Enter valid details and place the order', async function () {

    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(orderId);
});

Then('Verify order is present in Order history', async function () {
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});