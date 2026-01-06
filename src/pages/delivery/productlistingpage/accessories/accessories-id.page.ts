import { AccessoriesPage } from "./accessories.page";
import { t, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class AccessoriesPageID extends AccessoriesPage {
    // =========================
    // 📦 Helpers
    // =========================
    async isAccessoriesPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "en/accessories/";

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
}