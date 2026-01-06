import { Page, Locator } from "@playwright/test";
import { BrandPage } from "./brand.page";
import { t, PageUtils, delay } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { step } from "allure-js-commons";

export class BrandPageID extends BrandPage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-brand"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBrandPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();

            if (!title.includes(t.brandpage('title'))) {
                await step(`Check title: ${title}`, async () => {
                    console.log(`Element not visible: ${title}`);
                });
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedBaseUrl = Config.baseURL;
            const validSuffixes = ["en/brand/", "en/labels/"];
            const isValid = validSuffixes.some(suffix => currentUrl.startsWith(expectedBaseUrl + suffix));

            if (!isValid) {
                await step(`URL check failed`, async () => {
                    console.log(`Current: ${currentUrl} | Expected one of: ${validSuffixes.map(s => expectedBaseUrl + s).join(", ")}`);
                });
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking brand page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertBrandItems(page: Page): Promise<void> {
        await delay(3000);

        const { brandItemsBR } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, undefined, brandItemsBR);
    }

}
