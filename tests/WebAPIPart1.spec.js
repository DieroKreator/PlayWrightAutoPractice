const { test, expect, request } = require('@playwright/test');
const loginPayload = {"userEmail":"anshika@gmail.com","userPassword":"Iamking@000"};

test.beforeAll( async ()=> 
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload 
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    const token = loginResponseJson.token;
});

test.beforeEach( () => {
    console.log("Before each of the tests");
});

test('Client App login', async ({ page }) => {
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

    // await page.pause();
    /* TO CHECK */
    // const cvvTxtBox = await page.locator('input[class="input txt"]').first().waitFor();
    // await cvvTxtBox.fill("123");

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

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
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