const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')
const loginPayLoad = { userEmail: "qa.parent22@gmail.com", userPassword: "Iamking@00" };
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
test('@API Place the order', async({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    const email = "qa.parent2021@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62c528ace26b7e1a10f02bf4",
        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62c3f53be26b7e1a10efc997' })
    )
    await page.locator("button:has-text('View')").first().click();
    await page.pause();

});