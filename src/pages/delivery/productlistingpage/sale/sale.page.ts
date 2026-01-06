import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { PageUtils, t } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";

export class SalePage extends BasePage {
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
    async isSalePageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            if (!title.includes(t.sale('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "sale/";
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

}
