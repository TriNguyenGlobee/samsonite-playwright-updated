import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";
import { BagsPage } from "./bags.page";

export class BagsPageMY extends BagsPage {

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertBagsListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.bagType,
            this.bagColor,
            this.bagBrand,
            this.bagLaptop,
            this.bagCollection
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- bag-type ---
        const { typeItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-type', typeItemsB, {
            lastItemIsTextOnly: true
        });

        // --- bag-color ---
        const { colorItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-color', colorItemsB, {
            lastItemIsTextOnly: true
        });

        // --- bag-brand ---
        const { brandItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-brand', brandItemsB);

        // --- bag-laptop ---
        const { laptopItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-laptop', laptopItemsB);

        // --- bag-collection ---
        const { collectionItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-collection', collectionItemsB, {
            twoLinksPerLi: false
        });
    }

}
