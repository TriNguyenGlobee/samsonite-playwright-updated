import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { PageUtils, t } from "../../../../../utils/helpers/helpers";
import { step } from "allure-js-commons";

export class BrandLandingPage extends BasePage {
    readonly logoImg: Locator;
    readonly activeBanner: Locator;
    readonly ssn_hardcaseMenu: Locator;
    readonly ssn_softcaseMenu: Locator;
    readonly ssn_luggageMenu: Locator;
    readonly ssn_backpacksMenu: Locator;
    readonly ssn_bagsMenu: Locator;
    readonly ssn_bl_briefcaseMenu: Locator;
    readonly ssn_bl_luggageMenu: Locator;
    readonly ssn_bl_backpacksMenu: Locator;
    readonly ssn_bl_bagsMenu: Locator;
    readonly ssn_red_bagsMenu: Locator;
    readonly travelHartmannMenu: Locator;
    readonly backpackHartmannMenu: Locator;
    readonly bagHartmannMenu: Locator;
    readonly accessoryHartmannMenu: Locator;
    readonly brandInforSection: Locator;
    readonly brInforToptitle: Locator;
    readonly brInforTitle: Locator;
    readonly brInforContent: Locator;
    readonly brInforButton: Locator;
    readonly viewAllProducts: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.activeBanner = page.locator(`//div[@class="firstly-content"]//div[@class="owl-stage"]//div[@class="owl-item active"]`)
        this.ssn_hardcaseMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-4"]//div[@class="row no-gutters" and .//a[text()="Hardcase"]]`)
        this.ssn_softcaseMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-4"]//div[@class="row no-gutters" and .//a[text()="Softcase"]]`)
        this.ssn_luggageMenu = page.locator(`//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('luggage')}"]]`)
        this.ssn_backpacksMenu = page.locator(`//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('backpacks')}"]]`)
        this.ssn_bagsMenu = page.locator(`//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('bags')}"]]`)
        this.ssn_bl_briefcaseMenu = page.locator(`(//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('briefcase')}"]] | //div[@class="col-4"]//div[contains(@class,"row no-gutters") and .//a[text()="${t.brandpage('briefcase')}"]])`)
        this.ssn_bl_luggageMenu = page.locator(`(//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('luggage')}"]] | //div[@class="col-4"]//div[contains(@class,"row no-gutters") and .//a[text()="${t.brandpage('luggage')}"]])`)
        this.ssn_bl_backpacksMenu = page.locator(`(//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('backpacks')}"]] | //div[@class="col-4"]//div[contains(@class,"row no-gutters") and .//a[text()="${t.brandpage('backpacks')}"]])`)
        this.ssn_bl_bagsMenu = page.locator(`(//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('bags')}"]] | //div[@class="col-4"]//div[contains(@class,"row no-gutters") and .//a[text()="${t.brandpage('bags')}"]])`)
        this.ssn_red_bagsMenu = page.locator(`(//div[contains(@class,"cat-item") and .//h3[text()="${t.brandpage('bags')}"]] | //div[@class="col-4"]//div[contains(@class,"row no-gutters") and .//a[text()="${t.brandpage('bags')}"]])`)
        this.travelHartmannMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-6 col-md-3" and .//a[text()="Travel"]]`)
        this.backpackHartmannMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-6 col-md-3" and .//a[text()="Backpack"]]`)
        this.bagHartmannMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-6 col-md-3" and .//a[text()="Bag"]]`)
        this.accessoryHartmannMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-6 col-md-3" and .//a[text()="Accessory"]]`)
        this.brandInforSection = page.locator(`//div[@class="secondary-content"]//div[@class="brand-info" or @class="section container"]`)
        this.brInforToptitle = this.brandInforSection.locator(`xpath=.//h4`)
        this.brInforTitle = this.brandInforSection.locator(`xpath=.//h2`)
        this.brInforContent = this.brandInforSection.locator(`xpath=.//p`)
        this.brInforButton = this.brandInforSection.locator(`xpath=.//a[contains(@class,"btn")]`)
        this.viewAllProducts = page.locator(`.button-view-all`)
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================

    // Verify the number of banners, href, image
    async assertCenterBannerDisplayed(page: Page, description?: string) {
        await step(description || "Assert center banner is displayed correctly", async () => {
            await PageUtils.waitForPageLoad(page)

            const banners = page.locator('//div[@class="firstly-content"]//div[@class="owl-stage"]//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]');
            const bannerCount = await banners.count();
            expect(bannerCount).toBeGreaterThan(0);

            await expect(this.activeBanner).toHaveCount(1);

            for (let i = 0; i < bannerCount; i++) {
                const banner = banners.nth(i);
                const img = banner.locator('img');
                await expect(img).toHaveCount(1);
                await expect(img.first()).toHaveAttribute('src', /.+/);
            }

            console.log(`Assert ${bannerCount} banners, with 1 active and all containing images.`);
        })
    }

}
