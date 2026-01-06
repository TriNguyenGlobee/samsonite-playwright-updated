import { AccessoriesPage } from "./accessories.page";
import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers/helpers";

export class AccessoriesPageNZ extends AccessoriesPage {
    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertAccesoriesListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.accessoriesType,
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // accessories-type
        const { typeItemAS } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'accessories-type', typeItemAS, {
            lastItemIsTextOnly: true
        });
    }
}