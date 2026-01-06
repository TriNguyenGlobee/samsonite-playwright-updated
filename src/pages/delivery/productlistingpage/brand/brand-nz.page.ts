import { Page, Locator } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";
import { BrandPage } from "./brand.page";

export class BrandPageNZ extends BrandPage {
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

    // =========================
    // ✅ Assertions
    // =========================
    async assertBrandItems(page: Page): Promise<void> {
        await delay(3000);

        const { brandItemsBR } = this.testData;
        await this.assertItemsListForCategoryMenu(this.baseLocator, undefined, brandItemsBR);
    }

}
