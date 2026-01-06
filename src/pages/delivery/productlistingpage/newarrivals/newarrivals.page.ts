import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export class NewArrivalsPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="menu-group"]`);

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isNewArrivalspageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const expectedTitle = t.newarrivalspage('title')
            const currentUrl = await this.page.url();
            let expectedUrl = Config.baseURL + "new-arrivals/";

            if(process.env.LOCALE == "id"){
                expectedUrl = Config.baseURL + "en/new-arrivals/";
            }

            await test.step("New Arrivals page data: ", async () => {
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
            console.error('Error checking new arrivals page:', error);
            return false;
        }
    }

    async getPromotionMessage(prodIndex: number, description?: string): Promise<string | null> {
        return await step(description || "Get promotion message", async () => {
            const productMsg = this.prodItem.nth(prodIndex - 1).locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`).first()
            const productExplanations = this.prodItem.nth(prodIndex - 1).locator(`xpath=.//div[@class="promotions"]//div[contains(@class,"tooltip-explanation")]//span[@id="tooltip-popup"]`).first()
            if (await productMsg.count() > 0) {
                console.log(`Get Promotion Msg of Product at index ${prodIndex}`)
                return (await this.getText(productMsg, `Get Promotion Msg of Product at index ${prodIndex}`))?.trim() ?? null
            } else if (await productExplanations.count() > 0) {
                console.log(`Get Explanation Msg of Product at index ${prodIndex}`)
                return (await this.getText(productExplanations, `Get Explanation Msg of Product at index ${prodIndex}`))?.trim() ?? null
            } else return null
        });
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertNewArrivalsListItems(page: Page): Promise<void> {
        await delay(2000);

        // --- new arrivals ---
        const { newArrivalsItem } = this.testData;

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'new-arrivals', newArrivalsItem, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: true,
            checkPictureTag: true
        });
    }
}
