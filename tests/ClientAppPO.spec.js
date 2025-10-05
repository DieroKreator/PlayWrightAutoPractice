const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');

test('Client App login', async ({ page }) => {
    const username = "anshika@gmail.com";
    const password = "Iamking@000";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();
    

    
    page.locator("ul.cartWrap li.items").first().waitFor();

    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    //Identify edit box and enter one by one
    await page.locator("input[placeholder*='Select Country']").pressSequentially('ind', { delay: 150 });
    const dropdown = page.locator(".ta-results").first();
    await dropdown.waitFor();

    //Iterate on all the options and select India
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();

    await page.locator("tbody").nth(3).waitFor();
    expect(page.locator(".hero-primary").first()).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //Dinamically find an order
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

})