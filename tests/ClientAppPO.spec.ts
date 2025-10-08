import { test, expect } from "@playwright/test";
import { customtest } from "../utils_ts/test-base";
import { POManager } from "../pageObjects_ts/POManager";
//Json->string->js object
const dataset = require('../utils/placeOrderTestData.json');

for (const data of dataset) {
    test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
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
        let orderId: any;
        orderId = await orderReviewPage.submitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
    })
}

customtest(`Client App login`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);

    /*Data is coming from json file */

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkout();
})