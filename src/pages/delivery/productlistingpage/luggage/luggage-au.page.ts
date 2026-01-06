import { LuggagePage } from "./luggage.page";
import { Page, expect } from "@playwright/test";
import { PageUtils, t, delay } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { test } from "@playwright/test";
import { attachment } from "allure-js-commons";

export class LuggagePageAU extends LuggagePage {

    // =========================
    // 📦 Helpers
    // =========================
    async isLuggagePageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const expectedTitle = t.luggagepage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "suitcases/";

            await test.step("Luggage page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle.toString(), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!expectedTitle.includes(title)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking luggage page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertLuggageListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.luggageType,
            this.luggageSize,
            this.luggageColor,
            this.luggageAttribute,
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

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-color', colorItems, { lastItemIsTextOnly: true });

        // --- luggage-smart-feature ---
        const { smartFeatureItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-attribute', smartFeatureItems, { twoLinksPerLi: false });

        // --- luggage-collection ---
        const { collectionItems } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}