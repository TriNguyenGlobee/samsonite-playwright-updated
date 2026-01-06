import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export class OffersPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly referFriendItem: Locator;
    readonly top10PicksItem: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-category-promotion-page"]`);
        this.referFriendItem = this.baseLocator.locator(`xpath=.//li[@role="menuitem" and .//text()="Refer a Friend"]`)
        this.top10PicksItem = this.baseLocator.locator(`xpath=.//li[@role="menuitem" and .//text()="Top 10 Picks"]`)

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isOffersPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "special-offers/";

            await test.step("Offers page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.offers('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.offers('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking sale page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertOffersListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.referFriendItem
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // Refer a friend
        const { referAFriend } = this.testData;

        this.assertLocatorInside(this.referFriendItem, referAFriend[0])

    }
}
