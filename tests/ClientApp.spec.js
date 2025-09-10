const { test, expect } = require('@playwright/test');
const { assert } = require('console');


test.only('Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() == productName) {
            //add to cart
            await products.nth(i).locator("button:has-text('Add To Cart')").click();
            break;
        }
    }

    //Zara Coat 3
    await page.locator("[routerlink*='cart']").click();
    page.locator("ul.cartWrap li.items").first().waitFor();

    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    //Identify edit box and enter one by one
    await page.locator("input[placeholder*='Select Country']").pressSequentially('ind');
    const options = page.locator(".ta-results").first();
    await options.waitFor();

    const optionsCount = await options.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await options.locator("button").nth(i).textContent();
        if (text === " India") {
            await options.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.pause();

    await page.locator(".action__submit").click();

    expect(page.locator(".hero-primary").first()).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
})