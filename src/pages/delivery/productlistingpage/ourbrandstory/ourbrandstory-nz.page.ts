import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageNZ extends OurBrandStoryPage {
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
            this.discoverDiscover,
            this.discoverSamsonite,
            this.discoverMaterials,
            this.discoverServices
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

        // --- discover-DISCOVER ---
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

        // --- discover-materials ---
        const { aboutMaterials } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-collections', aboutMaterials);

        // --- discover-services ---
        const { aboutCollections } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-service', aboutCollections, { lastItemIsTextOnly: true });
    }
}
