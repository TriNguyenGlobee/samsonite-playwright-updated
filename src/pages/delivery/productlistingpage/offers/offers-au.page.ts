import { OffersPage } from "./offers.page";
import { PageUtils, t } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class OffersPageAU extends OffersPage {
    // =========================
    // 📦 Helpers
    // =========================
    async isOffersPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "offer/";

            await test.step("Offers page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.offers('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL TW", expectedUrl, "text/plain");
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


}