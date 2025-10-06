const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
//Json->string->js object
const dataset = require('../utils/placeOrderTestData.json');

test('Client App login', async ({ page }) => {
    const poManager = new POManager(page);

    /*Data is coming from json file */

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(dataset.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataset.productName);
    await cartPage.checkout();

    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
})