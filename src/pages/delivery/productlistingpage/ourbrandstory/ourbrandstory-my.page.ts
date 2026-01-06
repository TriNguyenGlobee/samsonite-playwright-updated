import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageMY extends OurBrandStoryPage {
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

        let elementsToCheck: any

        elementsToCheck = [
            this.discoverLatest,
            this.discoverSamsonite,
        ];

        if (process.env.ENV === 'stg') {
            elementsToCheck = [
                this.discoverLatest,
                this.discoverSamsonite,
                this.discoverCollection
            ];
        }

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- discover-article ---
        const { articleItems } = this.testData;
        if (process.env.ENV === 'stg') { // For SSSG STG only
            await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-latest', articleItems, {
                lastItemIsTextOnly: true
            });
        } else {
            await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-latest', articleItems);
        }

        // --- discover-about-Samsonite ---
        const { aboutSamsoniteItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-about-samsonite', aboutSamsoniteItems);

        // --- collections ---
        if (process.env.ENV === 'stg') { // For SSSG STG only
            console.log('Running on STG SSSG')
            const { aboutCollections } = this.testData;

            await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-collection', aboutCollections);
        }
    }
}
