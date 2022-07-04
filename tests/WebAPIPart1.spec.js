const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils')
const loginPayLoad = { userEmail: "qa.parent2021@gmail.com", userPassword: "123456QA!q" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
let response;

test.beforeAll(async() => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);

});

test.beforeEach(() => {

})

//create order is success
test.only('Place the order', async({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    const email = "qa.parent2021@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/")

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
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});