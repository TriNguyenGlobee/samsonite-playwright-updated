import { BackpacksPage } from "./backpacks.page";
import { Page, expect } from "@playwright/test";
import { t, PageUtils, delay } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class BackpacksPageID extends BackpacksPage {

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

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-color', colorItemsBP, {
            lastItemIsTextOnly: true
        });

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

    // =========================
    // 📦 Helpers
    // =========================
    async isBackpacksPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "en/backpack/";
            const expectedTitle = t.backpackspage('title').toString();

            await test.step("Backpacks page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle, "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(expectedTitle)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking backpacks page:', error);
            return false;
        }
    }

}