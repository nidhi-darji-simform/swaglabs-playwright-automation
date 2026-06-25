const {basePage} = require('./basePage');
const logger = require('../logger');
export class productPage extends basePage{
    constructor(page) {
        super(page);

      this.productHeader = page.locator('//span[@class="title"]');
      this.addToCartButton = (itemName) => page.locator(`//div[text()='${itemName}']//..//parent::div[@class='inventory_item_label']//following-sibling::div[@class='pricebar']//button`);
      this.cartIcon = page.locator('//a[@class="shopping_cart_link"]');    
      this.removeButton = (itemName) => page.locator(`//div[text()='${itemName}']/../../div/button`);  
      this.checkoutButton = page.locator("//button[@id='checkout']");
      this.firstName = page.locator("//input [@id='first-name']");
      this.lastName = page.locator("//input [@id='last-name']");
      this.postalCode = page.locator("//input [@id='postal-code']");
      this.continueButton = page.locator("//input [@id='continue']");
      this.cartbadge = page.locator ("//span[@class = 'shopping_cart_badge']");
      this.removeButton = (itemName) => page.locator("//button [@id='remove-sauce-labs-backpack']");
      this.isItemVisibleInCart = (itemName) => page.locator(`//div[@class='inventory_item_name'][text()='${itemName}']`);
      this.ischeckoutInfoPageHeader = page.locator("//span [text()='Checkout: Your Information']");
      this.ischeckoutOverviewPageHeader = page.locator("//span [text()='Checkout: Overview']");
      this.menuButton = page.locator("//button [@id='react-burger-menu-btn']");
      this.menuItems = (linkName) => page.locator(`//a[text()='${linkName}']`);
      this.allItemLink = page.locator ("//a [text() = 'All Items']");
      this.aboutLink = page.locator ("//a [text() = 'About']");
      this.logout = page.locator("//a[text()='Logout']");
      this.filterDropdown = page.locator('[data-test="product-sort-container"]');
      this.filteroptions = page.locator("(//div[@class='inventory_item_price'])");
      this.finishButton = page.locator("//button[@id='finish']");
      this.orderConfirmationContainer = page.locator("//div[@class='checkout_complete_container']");
      this.orderConfirmationHeader = page.locator("//h2[@class='complete-header']");

    }

      async isProductPageDisplayed() {
        logger.info('Checking if product page is displayed');
        return await this.productHeader.isVisible();
      }

      async clickOnAddToCartButton(itemName) {
        await this.addToCartButton(itemName).click();
      }

      async clickOncartIcon() {
        await this.cartIcon.click();
      }

      async clickOnRemoveButton(itemName) {
        await this.removeButton(itemName).click();
      }

      async clickOnCheckoutButton() {
        await this.checkoutButton.click();
      }

      async enterCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
      
      }

      async clickOnContinueButton() {
        await this.continueButton.click();

      }

      async getCartBadgeCount() {
      return await this.cartbadge.innerText();
      }

      async isRemoveButtonVisible(itemName) {
      return await this.removeButton(itemName).isVisible();
      }

      async ItemVisibleInCart(itemName) {
      return await this.isItemVisibleInCart(itemName).isVisible();
      } 

     async isCheckoutInfoPageHeaderVisible() {
      return await this.ischeckoutInfoPageHeader.isVisible();
      }

     async isCheckoutOverviewPageHeaderVisible() {
      return await this.ischeckoutOverviewPageHeader.isVisible();
      }

      async clickOnMenuButton() {
        await this.menuButton.click();
      }

      async isMenuItemsVisible(linkName){
      return await this.menuItems(linkName).isVisible();
      }

      async isallMenuItemspageVisible() {
        await this.allItemLink.click();
      }

      async isaboutMenuItemspageVisible() {
        await this.aboutLink.click();
      }

      async clickOnLogout() {
      await this.logout.click();
      }

      async selectFilterOption(text) {
      await this.filterDropdown.selectOption(text);
      }  
      
      async getFirstProductPrice() {
      return await this.filteroptions.allInnerTexts();
      }

      async clickOnFinishButton() {
        await this.finishButton.click();
      }

      async isOrderConfirmationVisible() {
        return await this.orderConfirmationContainer.isVisible();
      }

      async getOrderConfirmationText() {
        return await this.orderConfirmationHeader.innerText();
      }
  };