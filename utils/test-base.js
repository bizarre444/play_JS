const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "qa.parent2021@gmail.com",
        password: "123456QA!q",
        productName: "zara coat 3"
    }
})