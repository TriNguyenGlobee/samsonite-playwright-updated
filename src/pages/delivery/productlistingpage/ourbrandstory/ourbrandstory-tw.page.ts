import { Page, expect } from "@playwright/test";
import { delay, PageUtils, t } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageTW extends OurBrandStoryPage {

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isOurBrandStoryPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "discover/";

            await test.step("Our Brand Story page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.ourbrandstorypage('title')[0] || t.ourbrandstorypage('title')[1], "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!t.ourbrandstorypage('title').includes(title)) {
                return false;
            }

            if (!expectedUrl.includes(currentUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking our brand story page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertOurBrandStoryListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.discoverLatest,
            this.discoverSamsonite
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- discover-article ---
        const { articleItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-latest', articleItems, {
            lastItemIsTextOnly: true
        });

        // --- discover-about-Samsonite ---
        const { aboutSamsoniteItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-about-samsonite', aboutSamsoniteItems);
    }
}
