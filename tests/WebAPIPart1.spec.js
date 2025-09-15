const { test, expect, request } = require('@playwright/test');
const loginPayload = {"userEmail":"anshika@gmail.com","userPassword":"Iamking@000"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"68a961459320a140fe1ca57a"}]};
let token;
let orderId;

test.beforeAll( async ()=> 
{
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayload 
    }) //200, 201
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                 },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
});

test.beforeEach( () => {
    console.log("Before each of the tests");
});

test.only('Place the order', async ({ page }) => {


    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    page.pause();
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

//Verify if order created is showing in order history page
// Precondition - create order - 