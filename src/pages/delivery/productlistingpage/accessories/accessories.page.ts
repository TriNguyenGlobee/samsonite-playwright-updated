import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export abstract class AccessoriesPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly accessoriesType: Locator;
    readonly accessoriesColor: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-accessories"]`);
        this.accessoriesType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-accessories-type")]`);
        this.accessoriesColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-accessories-color")]`);

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isAccessoriesPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "accessories/";

            await test.step("Offers page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.accessories('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.offers('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking sale page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertAccesoriesListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.accessoriesType,
            this.accessoriesColor
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // accessories-type
        const { typeItemAS } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'accessories-type', typeItemAS, {
            lastItemIsTextOnly: true
        });

        // accessories-color
        const { colorItemAS } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'accessories-color', colorItemAS, {
            lastItemIsTextOnly: true
        });
    }
}
