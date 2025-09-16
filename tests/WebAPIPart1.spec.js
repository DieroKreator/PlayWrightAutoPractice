const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayload = {"userEmail":"anshika@gmail.com","userPassword":"Iamking@000"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"68a961459320a140fe1ca57a"}]};

let response;
test.beforeAll( async ()=> 
{
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);    
});

test('Place the order', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    //Dinamically find an order
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

})

//Verify if order created is showing in order history page
// Precondition - create order - 