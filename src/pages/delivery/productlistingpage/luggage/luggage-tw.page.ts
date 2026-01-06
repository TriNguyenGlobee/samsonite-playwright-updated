import { LuggagePage } from "./luggage.page";
import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";

export class LuggagePageTW extends LuggagePage {

    // =========================
    // ✅ Assertions
    // =========================
    async assertLuggageListItems(page: Page): Promise<void> {
        await delay(5000);
        
        const elementsToCheck = [
            this.luggageType,
            this.luggageSize,
            this.luggageColor,
            this.luggageSmartFeature,
            this.luggageBrand,
            this.luggageCollection
        ];
        
        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- luggage-type ---
        const { typeItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-type', typeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: true,
            checkPictureTag: true
        });

        // --- luggage-size ---
        const { sizeItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-size', sizeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: false,
            checkPictureTag: true
        });

        // --- luggage-color ---
        const { colorItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-color', colorItems, {
            lastItemIsTextOnly: true
        });

        // --- luggage-smart-feature ---
        const { smartFeatureItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-smart-feature', smartFeatureItems);

        // --- luggage-brand ---
        const { brandItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-brand', brandItems);

        // --- luggage-collection ---
        const { collectionItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}