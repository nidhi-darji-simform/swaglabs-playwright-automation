
// "LoginPage represents the login screen of the application.
// Following the Page Object Model approach, all page locators and actions are maintained in one place."
// "All UI elements are stored as locators.
// If the application UI changes, I only need to update the locator here rather than across multiple test files."

const {basePage} = require('./basePage');
export class loginPage extends basePage{
    constructor(page) {
        super(page);

        this.userNameTextArea = page.locator('//input[@id="user-name"]');
        this.passwordInput = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//input[@id="login-button"]');
    }

    async enterUsername(username) {
        await this.userNameTextArea.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isLogoutSuccessfully() {
        return await this.loginButton.isVisible();

    }
};