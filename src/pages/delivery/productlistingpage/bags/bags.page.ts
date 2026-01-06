import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export abstract class BagsPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly bagType: Locator;
    readonly bagColor: Locator;
    readonly bagBrand: Locator;
    readonly bagLaptop: Locator;
    readonly bagCollection: Locator;
    readonly bagAttribute: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-bag"]`);
        this.bagType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-type")]`);
        this.bagColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-color")]`);
        this.bagBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-brand")]`);
        this.bagLaptop = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-laptop")]`);
        this.bagCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-collection")]`);
        this.bagAttribute = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-attribute")]`)

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBagsPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "bags/";
            const expectedTitle = t.bagspage('title').toString();

            await test.step("Bags page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle, "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(expectedTitle)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking bags page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertBagsListItems(page: Page): Promise<void>;

}
