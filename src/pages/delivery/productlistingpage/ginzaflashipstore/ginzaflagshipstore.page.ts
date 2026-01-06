import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";

export class GinzaFlagshipStorePage extends BasePage {
    readonly logoImg: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isGinzaFlagshipStorePageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.ginzaflagshipstore('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "ginza-flagship-store/";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking ginza-flagship-store page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
