const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }

    async getLoginPage() {
        return this.loginPage;
    }

    async getDashboardPage() {
        return this.dashboardPage;
    }
}

module.exports = { POManager };