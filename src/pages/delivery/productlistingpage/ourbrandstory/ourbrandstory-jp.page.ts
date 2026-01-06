import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageJP extends OurBrandStoryPage {

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertOurBrandStoryListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.discoverArticle,
            this.discoverSamsonite
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- discover-article ---
        const { articleItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-articles', articleItems);

        // --- discover-about-Samsonite ---
        const { aboutSamsoniteItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-about-samsonite', aboutSamsoniteItems);
    }
}
