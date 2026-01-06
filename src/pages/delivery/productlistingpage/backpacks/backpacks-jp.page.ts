import { BackpacksPage } from "./backpacks.page";
import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";

export class BackpacksPageJP extends BackpacksPage {

    // =========================
    // ✅ Assertions
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertBackpacksListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.backpackType,
            this.backpackColor,
            this.backpackSmartFunction,
            this.backpackBrand,
            this.backpackLaptop,
            this.backpackCollection
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- backpack-type ---
        const { typeItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-type', typeItemsBP, {
            lastItemIsTextOnly: true
        });

        // --- backpack-color ---
        const { colorItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-color', colorItemsBP);

        // --- backpack-smart-function ---
        const { smartFunctionItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-smart-function', smartFunctionItemsBP);

        // --- backpack-brand ---
        const { brandItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-brand', brandItemsBP);

        // --- backpack-laptop ---
        const { laptopItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-laptop', laptopItemsBP);

        // --- backpack-collection ---
        const { collectionItemsBP } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-collection', collectionItemsBP, {
            twoLinksPerLi: false
        });
    }

}