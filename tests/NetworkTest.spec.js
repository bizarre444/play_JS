const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')
const loginPayLoad = { userEmail: "qa.parent2021@gmail.com", userPassword: "123456QA!q" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async() => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(() => {})

//create order is success
test('Place the order', async({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    const email = "qa.parent2021@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62beabfce26b7e1a10ef72dd",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = fakePayLoadOrders;
            route.fulfill({
                    response,
                    body,
                })
                //intercepting response - API response -> |playwright fake response| -> browser -> render data on frontend
        });



    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();

    console.log(await page.locator(".mt-4").textContent());


});