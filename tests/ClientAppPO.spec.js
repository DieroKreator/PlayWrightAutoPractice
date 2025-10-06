const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
//Json->string->js object
const dataset = require('../utils/placeOrderTestData.json');

for (const data of dataset) {
    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);

        /*Data is coming from json file */

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
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
}