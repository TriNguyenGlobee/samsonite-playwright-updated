import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, PageUtils } from "../../../../../utils/helpers/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { loadTestData } from "../../../../../utils/data";

export abstract class OurBrandStoryPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly discoverArticle: Locator;
    readonly discoverSamsonite: Locator;
    readonly discoverLatest: Locator;
    readonly discoverCollection: Locator;
    readonly discoverMaterials: Locator;
    readonly discoverServices: Locator;
    readonly discoverDiscover: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator('//div[contains(@id,"category-discover")]');
        this.discoverArticle = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-article")]');
        this.discoverLatest = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-latest")]');
        this.discoverSamsonite = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-about-samsonite")]');
        this.discoverCollection = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-collection")]');
        this.discoverMaterials = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-collections")]');
        this.discoverServices = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-service")]');
        this.discoverDiscover = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-latest")]');

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isOurBrandStoryPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = [
                Config.baseURL + "brand-story.html",
                Config.baseURL + "our-brand-story/"
            ];

            await test.step("Our Brand Story page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.ourbrandstorypage('title')[0] || t.ourbrandstorypage('title')[1], "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl[0] || expectedUrl[1], "text/plain");
            });

            if (!t.ourbrandstorypage('title').includes(title)) {
                return false;
            }

            if (!expectedUrl.includes(currentUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking our brand story page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertOurBrandStoryListItems(page: Page): Promise<void>;
}
