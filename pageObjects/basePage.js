// "BasePage is the parent class for all page classes.
// It stores the Playwright page object so that child pages can access browser actions and elements.
// The benefit is that common methods such as click, wait, screenshot, navigation, or reusable utilities can be added
//  here in the future and inherited by all pages."


const{expect}=require('@playwright/test');

export class basePage {

    constructor(page) {
        this.page = page;
    }
}