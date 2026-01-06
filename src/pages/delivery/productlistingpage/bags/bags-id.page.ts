import { Page, expect } from "@playwright/test";
import { delay, t, PageUtils} from "../../../../../utils/helpers/helpers";
import { BagsPage } from "./bags.page";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class BagsPageID extends BagsPage {

    // =========================
    // ✅ Assertions
    // =========================
    async assertBagsListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.bagType,
            this.bagColor,
            this.bagBrand,
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

        // --- bag-collection ---
        const { collectionItemsB } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-collection', collectionItemsB, {
            twoLinksPerLi: false
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isBagsPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "en/bag/";
            const expectedTitle = t.bagspage('title').toString();

            await test.step("Bags page data: ", async () => {
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
            console.error('Error checking bags page:', error);
            return false;
        }
    }
}
