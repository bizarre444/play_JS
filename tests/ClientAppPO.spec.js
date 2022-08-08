const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//Json -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataSet) {
    test(`@Web Client App login for ${data.productName}`, async({ page }) => {
        //js file - Login js, DashboardPage
        const poManager = new POManager(page);
        const products = page.locator(".card-body");

        const loginPage = await poManager.getLoginPage();
        await loginPage.goTO();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = await poManager.getDashboardPage();
        console.log(data.productName);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = await poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = await poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = await poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}

customtest(`Client App login`, async({ page, testDataForOrder }) => {
    //js file - Login js, DashboardPage
    const poManager = new POManager(page);
    const products = page.locator(".card-body");

    const loginPage = await poManager.getLoginPage();
    await loginPage.goTO();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = await poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});