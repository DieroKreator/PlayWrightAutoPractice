const { test, expect } = require('@playwright/test');
const { assert } = require('console');


test('Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = "Zara Coat 4";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() == productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //Zara Copat 4
    await page.locator("button[routerlink*='cart']").click();
    page.locator("div li").first().waitFor();

    const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[placeholder='Select Country']").pressSequentially('ind');
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    //    const countries = await options.locator("button").allTextContents();
    //    console.log(countries);
    optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    expect(page.locator(".hero-primary").first()).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator (".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    //    await page.pause();
})