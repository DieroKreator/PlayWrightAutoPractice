const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('Client App login', async ({ page }) => {
    const poManager = new POManager(page);
    const username = "anshika@gmail.com";
    const password = "Iamking@000";
    const productName = "ZARA COAT 3";

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
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