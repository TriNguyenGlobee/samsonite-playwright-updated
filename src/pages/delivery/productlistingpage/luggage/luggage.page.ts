import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { PageUtils, t } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export abstract class LuggagePage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly luggageType: Locator;
    readonly luggageSize: Locator;
    readonly luggageColor: Locator;
    readonly luggageSmartFeature: Locator;
    readonly luggageBrand: Locator;
    readonly luggageDestination: Locator;
    readonly luggageCollection: Locator;
    readonly luggageAttribute: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-luggage"]`);
        this.luggageType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-type")]`);
        this.luggageSize = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-size")]`);
        this.luggageColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-color")]`);
        this.luggageSmartFeature = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-smart-feature")]`);
        this.luggageBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-brand")]`);
        this.luggageAttribute = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-attribute")]`);
        this.luggageDestination = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-destination")]`);
        this.luggageCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-collection")]`);

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isLuggagePageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const expectedTitle = t.luggagepage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "luggage/";

            await test.step("Luggage page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle.toString(), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!expectedTitle.includes(title)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking luggage page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertLuggageListItems(page: Page): Promise<void>
}
