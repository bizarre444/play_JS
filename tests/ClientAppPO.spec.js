const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.only('Client App login', async({ page }) => {
    //js file - Login js, DashboardPage
    const poManager = new POManager(page);
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    const username = "qa.parent2021@gmail.com";
    const password = "123456QA!q";

    const loginPage = await poManager.getLoginPage();
    await loginPage.goTO();
    await loginPage.validLogin(username, password);
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});