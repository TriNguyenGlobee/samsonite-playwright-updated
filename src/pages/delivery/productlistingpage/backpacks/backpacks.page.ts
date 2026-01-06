import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export abstract class BackpacksPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly backpackType: Locator;
    readonly backpackColor: Locator;
    readonly backpackSmartFunction: Locator;
    readonly backpackBrand: Locator;
    readonly backpackLaptop: Locator;
    readonly backpackCollection: Locator;
    readonly backpackAttribute: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-backpack"]`);
        this.backpackType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-type")]`);
        this.backpackColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-color")]`);
        this.backpackSmartFunction = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-smart-function")]`);
        this.backpackBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-brand")]`);
        this.backpackLaptop = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-laptop")]`);
        this.backpackCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-collection")]`);
        this.backpackAttribute = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-attribute")]`);

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBackpacksPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "backpacks/";
            const expectedTitle = t.backpackspage('title').toString();

            await test.step("Backpacks page data: ", async () => {
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
            console.error('Error checking backpacks page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertBackpacksListItems(page: Page): Promise<void>;

}
