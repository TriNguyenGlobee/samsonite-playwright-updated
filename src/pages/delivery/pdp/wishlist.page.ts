import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { t, PageUtils } from "../../../../utils/helpers/helpers";

export class WishlistPage extends BasePage {
    readonly logoImg: Locator
    readonly prodName: Locator
    readonly prodCollection: Locator

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.prodName = page.locator(`//div[@class="product-tile product-info"]//div[@class="pdp-link text-uppercase"]//a`)
        this.prodCollection = page.locator(`//div[@class="product-tile product-info"]//h4[@class="product-collection text-uppercase"]//a`)
    }

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isWishlistPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page);
        await PageUtils.waitForPageLoadComplete(this.page);
        try {
            const title = await this.page.title();
            if (!title.includes(t.wishlist('title'))) {
                await step(`Check title of page: ${title.toString()}`, async () => {
                    console.log(`Element not visible: ${title.toString()}`);
                });
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking wishlist page:', error);
            return false;
        }
    }


    // =========================
    // ✅ Assertions
    // =========================
    async assertProdExist(proName: string, prodCollection: string, description?: string): Promise<void> {
        await step(description || "Assert product exist in wishlist page", async () => {
            const productNameLocator = this.prodName.filter({
                hasText: proName.trim()
            });
            const productCollectionLocator = this.prodCollection.filter({
                hasText: prodCollection.trim()
            });

            await expect(productNameLocator.first()).toBeVisible();
            await expect(productCollectionLocator.first()).toBeVisible();
        })
    }

    async assertProdNotExist(proName: string, prodCollection: string, description?: string): Promise<void> {
        await step(description || "Assert product not exist in wishlist page", async () => {
            const productNameLocator = this.prodName.filter({
                hasText: proName.trim()
            });
            const productCollectionLocator = this.prodCollection.filter({
                hasText: prodCollection.trim()
            });

            await expect(productNameLocator.first()).toBeHidden();
            await expect(productCollectionLocator.first()).toBeHidden();
        })
    }

}