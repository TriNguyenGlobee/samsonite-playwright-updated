import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, PageUtils, getRandomInt, extractNumber, screenshotAndAttach } from "../../../../utils/helpers/helpers";
import { step } from "allure-js-commons";
import { Config } from "../../../../config/env.config";
import { test } from "../../../fixtures/test-fixture";

export abstract class HomePage extends BasePage {
    readonly logoImg: Locator;
    readonly centerBanner: Locator;
    readonly highlightSection: Locator;
    readonly recommendedSection: Locator;
    readonly campaignUnderwaysection: Locator;
    readonly productReviewSection: Locator;
    readonly journalsSection: Locator;
    readonly journalsNextbutton: Locator;
    readonly journalsPreviousButton: Locator;
    readonly whyShopWithUsSection: Locator;
    readonly withUsTitle: Locator;
    readonly withUsOfficalSite: Locator;
    readonly withUsSafeShopping: Locator;
    readonly withUsGift: Locator;
    readonly withUsWarranty: Locator;
    readonly withUsFastDelivery: Locator;
    readonly withUsCollection: Locator;
    readonly bvRecommendedCategoryButtons01: Locator;
    readonly bvRecommendedCategoryButtons02: Locator;
    readonly bvRecommendedCategoryButtons03: Locator;
    readonly bvRecommendedCategoryButtons04: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.centerBanner = page.locator('//div[contains(@class,"homepage-banner-carouselregion")]');
        this.highlightSection = page.locator('//div[contains(@class,"category-highlight")]');
        this.recommendedSection = page.locator('//div[contains(@class,"category-product initialized-component")]');
        this.campaignUnderwaysection = page.locator('//div[contains(@class,"magazine-carousel-column-desktop")]');
        this.productReviewSection = page.locator(`//div[contains(@class,"AddProductReviews") or contains(@class,"productReviews")]`);
        this.journalsSection = page.locator(`//div[contains(@class,"journals-articles")]//div[@class="owl-stage"]`);
        this.journalsNextbutton = page.locator(`//div[contains(@class,"journals-articles")]//button[span[@aria-label="Next"]]`);
        this.journalsPreviousButton = page.locator(`//div[contains(@class,"journals-articles")]//button[span[@aria-label="Previous"]]`);
        this.whyShopWithUsSection = page.locator(`//div[contains(@class,"home-why-shop-with-us")]//div[@class="content"]`);
        this.withUsTitle = this.whyShopWithUsSection.locator(`xpath=.//h2[normalize-space(text())="Why shop with us?"]`);
        this.withUsOfficalSite = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('officialwebsitetitle')}"] or div//h6[text()="${t.whyshopwithus('officialwebsitetitle')}"]]`);
        this.withUsSafeShopping = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('securityShoptitle')}"]]`);
        this.withUsGift = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('gifttitle')}"]]`);
        this.withUsWarranty = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('warrantytitle')}"] or div//h6[text()="${t.whyshopwithus('warrantytitle')}"]]`);
        this.withUsFastDelivery = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('fastdeliverytitle')}"] or div//h6[text()="${t.whyshopwithus('fastdeliverytitle')}"]]`)
        this.withUsCollection = this.whyShopWithUsSection.locator(`xpath=.//li[h6[text()="${t.whyshopwithus('fullcollectiontitle')}"] or div//h6[text()="${t.whyshopwithus('fullcollectiontitle')}"]]`)
        this.bvRecommendedCategoryButtons01 = page.locator(`//button[@id="product-pills-tab-1"]`);
        this.bvRecommendedCategoryButtons02 = page.locator(`//button[@id="product-pills-tab-2"]`);
        this.bvRecommendedCategoryButtons03 = page.locator(`//button[@id="product-pills-tab-3"]`);
        this.bvRecommendedCategoryButtons04 = page.locator(`//button[@id="product-pills-tab-4"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================
    async clickRatedRecommendedProductItemByIndex(categoryIndex: number, productIndex: number, description?: string) {
        await step(description || `Click recommended product item at category index ${categoryIndex} and rated product index ${productIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page);
            const recommendedRatedItems = this.page.locator(`//div[contains(@class,"tab-pane fade product-pills-${categoryIndex}")]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text" and normalize-space(text())!="0.0"]/ancestor::div[@class="product"]`);
            const targetProduct = recommendedRatedItems.nth(productIndex - 1);
            await targetProduct.click({ button: 'middle' })
            //await this.click(targetProduct, `Click recommended rated product at category index ${categoryIndex} and product rated index ${productIndex}`);
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isHomepageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!t.homepage('title').includes(title)) {
                await step(`Check title of page: ${title.toString()}`, async () => {
                    console.log(`Element not visible: ${title.toString()}`);
                });
                return false;
            }

            const currentUrl = new URL(await this.page.url());
            const baseUrl = new URL(Config.baseURL);

            if (currentUrl.origin !== baseUrl.origin) {
                await step(`Check Url: ${currentUrl}`, async () => {
                    console.log(`Current URL is: ${currentUrl}`);
                });
                return false;
            }

            const path = currentUrl.pathname.replace(/\/+$/, '');
            if (path !== '' && path !== '/home') {
                await step(`Check path: ${path}`, async () => {
                    console.log(`Current path is: ${path}`);
                });
                return false;
            }

            const elementsToCheck = [
                this.newArrivalsMenuItem,
                this.luggageMenuItem,
                this.backPacksMenuItem,
                this.bagsMenuItem,
                this.labelsMenuItem,
                this.discoverMenuItem,
                this.ginzaFlagshipStore,
                this.saleMenuItem,
                this.friendsOfSamsoniteMenuItem,
                this.searchIcon,
                this.wishlistIcon,
                this.loginIcon,
                this.locationIcon,
                this.cartIcon
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking homepage:', error);
            return false;
        }
    }

    // Get a random product URL and index
    async getReviewedProductURL(page: Page): Promise<ReviewedItem> {
        const reviewedProduct = this.productReviewSection.locator(`xpath=.//div[contains(@class,"swiper-slide")]`)
        const numberOfProduct = await reviewedProduct.count()
        const rdIndex = getRandomInt(1, numberOfProduct)

        const nextButton = this.productReviewSection.locator('xpath=.//div[@role="button" and contains(@class,"swiper-button-next")]');
        const desProduct = this.productReviewSection.locator(`xpath=.//div[contains(@class,"swiper-slide")][${rdIndex}]`)
        const productLink = desProduct.locator(`xpath=.//picture//a`)

        for (let i = 1; i < rdIndex; i++) {
            await nextButton.click();
            await page.waitForTimeout(300);
        }

        const productURL = await productLink.getAttribute('href') ?? '';

        return {
            url: productURL,
            index: rdIndex
        };
    }

    async getJournalsActiveItemIndexes(): Promise<number[]> {
        const items = this.journalsSection.locator(`xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]`);
        const count = await items.count();
        const activeIndexes: number[] = [];

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            const className = await item.getAttribute('class');

            if (className?.includes('active')) {
                activeIndexes.push(i);
            }
        }
        return activeIndexes;
    }

    async bvGetRecommendedProductItemsCount(categoryIndex: number, description?: string): Promise<number> {
        return await step(description || `Get recommended products count of category index ${categoryIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page);

            const recommendedItems = this.page.locator(`//div[contains(@class,"tab-pane fade product-pills-${categoryIndex}")]//div[@class="product"]`);
            return await recommendedItems.count();
        });
    }

    async bvGetRatedRecommendedProductItemsCount(categoryIndex: number, description?: string): Promise<number> {
        return await step(description || `Get Rated recommended products count of category index ${categoryIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page);

            const recommendedItems = this.page.locator(`//div[contains(@class,"tab-pane fade product-pills-${categoryIndex}")]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text" and normalize-space(text())!="0.0"]/ancestor::div[@class="product"]`);
            return await recommendedItems.count();
        });
    }

    async bvGetRecommendedDecimalReviewPoint(categoryIndex: number, prodIndex: number, description?: string): Promise<number> {
        return await step(description || `Get decimal review point of product index ${prodIndex} at category index ${categoryIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page);

            const recommendedItems = this.page.locator(`//div[contains(@class,"tab-pane fade product-pills-${categoryIndex}")]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text" and normalize-space(text())!="0.0"]/ancestor::div[@class="product"]`);
            const targetProduct = recommendedItems.nth(prodIndex - 1);
            const reviewPointText = await targetProduct.locator(`xpath=.//div[@class="bv_averageRating_component_container"]//div[@class="bv_text"]`).innerText();
            return parseFloat(reviewPointText);
        }
        );
    }

    async bvGetRecommendedNumberOfReviews(categoryIndex: number, prodIndex: number, description?: string): Promise<number> {
        return await step(description || `Get number of reviews of product index ${prodIndex} at category index ${categoryIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page);

            const recommendedItems = this.page.locator(`//div[contains(@class,"tab-pane fade product-pills-${categoryIndex}")]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text" and normalize-space(text())!="0.0"]/ancestor::div[@class="product"]`);
            const targetProduct = recommendedItems.nth(prodIndex - 1);
            const numberofreviews = await targetProduct.locator(`xpath=.//div[@class="bv_numReviews_component_container"]//div[@class="bv_text"]`).innerText();
            return extractNumber(numberofreviews);
        }
        );
    }

    async bvGetReviewDecicalRatingStar(reviewIndex: number, description?: string): Promise<number> {
        return await step(description || `Get decimal rating star at index ${reviewIndex}`, async () => {
            const ratingContainer = this.page.locator('.pr-rating-stars');
            const stars = ratingContainer.nth(reviewIndex - 1).locator('.pr-star-v4');
            const count = await stars.count();

            let rating = 0;

            for (let i = 0; i < count; i++) {
                const className = await stars.nth(i).getAttribute('class');

                if (!className) continue;

                if (className.includes('pr-star-v4-100-filled')) {
                    rating += 1;
                } else if (className.includes('pr-star-v4-50-filled')) {
                    rating += 0.5;
                }
            }
            return Number(rating.toFixed(1));
        })
    }

    async bvGetReviewNumberOfReviews(reviewIndex: number, description?: string): Promise<number> {
        return await step(description || `Get number of reviews at index ${reviewIndex}`, async () => {
            const reviewAmount = this.page.locator('.review-amount');
            const reviewAmountText = await reviewAmount.nth(reviewIndex - 1).innerText()
            return extractNumber(reviewAmountText)
        })
    }

    // =========================
    // ✅ Assertions
    // =========================
    // Center banner carousel
    // Verify the number of banners, href, image and text
    async assertCenterBannerDisplayed(
        carouselLocator: Locator,
        expectedItems: CarouselItem[]
    ) {
        await PageUtils.waitForDomAvailable(this.page);
        const realItems = carouselLocator.locator(
            'xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]'
        );

        await test.step(`Verify correct number of real banners, xpath=${realItems.toString()}`, async () => {
            await expect(realItems).toHaveCount(expectedItems.length);
        });

        for (let i = 0; i < expectedItems.length; i++) {
            const item = realItems.nth(i);
            const expected = expectedItems[i];

            if (expected.text) {
                await expect(item, `Banner ${i + 1} does not contain text "${expected.text}"`).toContainText(expected.text);
            }

            if (expected.href) {
                const link = item.locator('xpath=.//a');
                await test.step(`Verify banner ${i + 1} has correct href`, async () => {
                    await expect(link).toHaveAttribute('href', expected.href!);
                });
            }

            if (expected.hasImage) {
                const pic = item.locator('xpath=.//picture//img');
                await test.step(`Verify banner ${i + 1} contains an image`, async () => {
                    await expect(pic).toHaveCount(1);
                });
            }
        }

        const activeItems = this.page.locator(
            '//div[contains(@class,"homepage-banner-carouselregion")]//div[contains(@class,"owl-item") and not(contains(@class,"cloned")) and contains(@class,"active")]'
        );

        const activeCount = await activeItems.count();
        expect(activeCount).toEqual(1);
    }

    // Click dot button to navigate banner
    // Verify dot and banner active state after clicking
    async assertBannerNavigationByDots(
        page: Page,
        carouselRootLocator: Locator
    ) {
        await PageUtils.waitForDomAvailable(this.page);
        await page.waitForTimeout(500);
        const dotButtons = this.page.locator('//button[contains(@class,"owl-dot") and contains(@class,"custom-tracking-onetag-element")]');
        const dotCount = await dotButtons.count();

        const banners = carouselRootLocator.locator(
            'xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]'
        );

        await test.step(`Verify correct number of banners and dots, banner-xpath=${banners.toString()} (${await banners.count()}) and dotbutton-xpath=${dotButtons.toString()} (${dotCount})`, async () => {
            await expect(await banners.count()).toEqual(dotCount);
        });

        for (let i = 0; i < dotCount; i++) {
            const dot = dotButtons.nth(i);

            await dot.click();

            await page.waitForTimeout(500);

            await test.step(`Verify Dot ${i + 1} should be active`, async () => {
                await expect(dot).toHaveClass(/active/);
            });

            const banner = banners.nth(i);
            await test.step(`Verify Banner ${i + 1} should be active`, async () => {
                await expect(banner).toHaveClass(/active/);
            });
        }
    }

    // Click each banner to open link in new tab
    // Verify the link is correct
    async assertBannerNavigation(
        page: Page,
        carouselRootSelector: string
    ) {
        const carousel = page.locator(carouselRootSelector);
        const dotButtons = carousel.locator('//button[contains(@class,"owl-dot") and contains(@class,"custom-tracking-onetag-element")]');
        const banners = carousel.locator('xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]');

        const dotCount = await dotButtons.count();
        const bannerCount = await banners.count();

        expect(dotCount).toBe(bannerCount);

        for (let i = 0; i < dotCount; i++) {
            const dot = dotButtons.nth(i);
            const expectedBanner = banners.nth(i);

            await dot.click();

            await expect(expectedBanner).toHaveClass(/active/);

            const link = expectedBanner.locator('a[href]');
            await expect(link).toHaveCount(1);

            const href = await link.getAttribute('href');
            if (!href) {
                console.warn(`Banner ${i + 1} has no href`);
                continue;
            }

            const [newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                link.click({ button: 'middle' }),
            ]);

            await newPage.waitForLoadState('domcontentloaded');
            const currentUrl = newPage.url();

            if (href.includes('/sale/')) {
                await expect(
                    currentUrl === href ||
                    currentUrl.startsWith('https://ssjp.dev.samsonite-asia.com/login')
                ).toBeTruthy();
            } else {
                await expect(currentUrl).toContain(href);
            }

            await newPage.close();
        }
    }

    // Category highlight section
    // Verify the number of items, href, image, English text and Japanese text
    async assertHighlightCategoryItems(page: Page, data: HighlightCategoryItem[]) {
        const cards: Locator = page.locator('//div[contains(@class,"category-hightlight-column")]');

        await expect(cards).toHaveCount(data.length);

        for (let i = 0; i < data.length; i++) {
            const card = cards.nth(i);
            const item = data[i];

            const link = card.locator('a.card-link');
            console.log(`Received url: -${link.getAttribute('href')}--- Expected url: -${item.href}-`)
            await expect(link).toHaveAttribute('href', item.href);

            if (item.hasImage) {
                PageUtils.waitForDomAvailable(page)
                const img = card.locator('xpath=.//picture//img');
                await expect(img).toHaveCount(1);
                const srcAttr = await img.getAttribute('src') || await img.getAttribute('data-src');
                expect(srcAttr).toMatch(/.+\.(jpg|jpeg|png|webp)/);
            }

            const aboveText = card.locator('p.card-text');
            await expect(aboveText).toHaveText(item.aboveText);

            const underText = card.locator('span');
            await expect(underText).toHaveText(item.underText);
        }
    }

    // Click each highlight category item to navigate to correct URL
    // Verify the URL is correct
    async assertHighlightCategoryItemNavigation(
        page: Page,
        data: HighlightCategoryItem[],
        baseUrl: string
    ) {
        for (let i = 0; i < data.length; i++) {
            await page.goto(baseUrl);

            const card = page.locator('//div[contains(@class,"category-hightlight-column")]').nth(i);
            const link = card.locator('xpath=.//a[@class="card-link"]');

            await Promise.all([
                page.waitForURL(data[i].href, { timeout: 60000 }),
                link.click()
            ]);

            expect(page.url()).toBe(data[i].href);
        }
    }

    // Recommended products section
    // Click each side button to navigate and verify the active state
    async checkRecommendSectionActivity(page: Page, expectedItems: RecommendedProductItem[]) {
        for (const { buttonText, divClass } of expectedItems) {
            const button = page.locator(`//button[normalize-space(text())="${buttonText}"]`);
            await button.click();

            const activeDiv = page.locator(`//div[contains(@class,"${divClass}") and contains(@class,"active") and contains(@class,"show")]`);
            await expect(activeDiv).toBeVisible({ timeout: 300000 });

            await expect(button).toHaveClass(/nav-link(?:\s+\S+)*\s+active(?:\s+show)?/);

            for (const other of expectedItems) {
                if (other.buttonText === buttonText) continue;
                const otherButton = page.locator(`//button[normalize-space(text())="${other.buttonText}"]`);
                await expect(otherButton).not.toHaveClass(/nav-link(?:\s+\S+)*\s+active/);

                const otherDiv = page.locator(`//div[contains(@class,"${other.divClass}")]`);
                await expect(otherDiv).not.toHaveClass(/active/);
                await expect(otherDiv).not.toHaveClass(/show/);
            }
        }
    }

    // Right side of campaign underway section
    // Check nextButton Until nextButton Disabled
    // Click prevButton Until prevButton Disabled
    async assertRightSideColumnActivity(page: Page, screenshot: boolean = false) {
        await PageUtils.waitForDomAvailable(page, 20000)
        const title = page.locator('//div[@class="magazine-title"]');
        const itemList = page.locator(`//div[@class="magazine-title"]/following-sibling::div[@class="swiper-wrapper"]`)
        const itemRow = page.locator(`//div[@class="magazine-title"]/following-sibling::div[@class="swiper-wrapper"]//div[contains(@class,"swiper-slide") and @aria-label]`)

        const prevButton = title.locator('xpath=./following-sibling::div[contains(@class,"swiper-button-prev")]');
        const nextButton = title.locator('xpath=./following-sibling::div[contains(@class,"swiper-button-next")]');
        const getActiveItem = () => itemList.locator('xpath=.//div[contains(@class,"swiper-slide-active")]');
        const items = await itemRow.count()

        await expect(prevButton).toHaveClass(/swiper-button-disabled/);
        await expect(nextButton).not.toHaveClass(/swiper-button-disabled/);

        while (true) {
            await nextButton.click();
            await page.waitForTimeout(300);

            const nextClass = await nextButton.getAttribute('class');
            if (nextClass?.includes('swiper-button-disabled')) {
                break;
            }
        }
        const currentActive = getActiveItem();
        const currentLabel = await currentActive.getAttribute('aria-label');
        expect(currentLabel).not.toBe(`1 / ${items}`);

        if (screenshot){
            await screenshotAndAttach(page, './screenshots/Home-campaignunderway', '02 - Last item shows, next button disabled');
        }
        
        const item1 = page.locator(`//div[@class="tile-item swiper-slide" and @aria-label="1 / ${items}"]`);
        await expect(item1).not.toHaveClass(/swiper-slide-active/);

        while (true) {
            await prevButton.click();
            await page.waitForTimeout(300);

            const prevClass = await prevButton.getAttribute('class');
            if (prevClass?.includes('swiper-button-disabled')) {
                const activeItem = getActiveItem();
                const ariaLabel = await activeItem.getAttribute('aria-label');
                expect(ariaLabel).toBe(`1 / ${items}`);
                break;
            }
        }
    }

    // Product Review section
    // Check nextButton Until nextButton Disabled
    // Click prevButton Until prevButton Disabled
    async assertProductReviewActivity(page: Page, screenshot: boolean = false) {
        await PageUtils.waitForDomAvailable(page, 20000)

        const prevButton = this.productReviewSection.locator('xpath=.//div[@role="button" and contains(@class,"swiper-button-prev")]');
        const nextButton = this.productReviewSection.locator('xpath=.//div[@role="button" and contains(@class,"swiper-button-next")]');
        const reviewItem = this.productReviewSection.locator('xpath=.//div[contains(@class,"swiper-slide")]');
        const getActiveItem = () => this.productReviewSection.locator('xpath=.//div[contains(@class,"swiper-slide") and contains(@class,"slide-active")]');

        const itemAmount = await reviewItem.count()

        await expect(itemAmount).toBeGreaterThan(0)
        await expect(itemAmount).toBeLessThanOrEqual(10)

        await expect(prevButton).toHaveClass(/swiper-button-disabled/);
        await expect(nextButton).not.toHaveClass(/swiper-button-disabled/);

        while (true) {
            await nextButton.click();
            await page.waitForTimeout(300);

            const nextClass = await nextButton.getAttribute('class');
            if (nextClass?.includes('swiper-button-disabled')) {
                break;
            }
        }
        const currentActive = getActiveItem();
        const currentLabel = await currentActive.getAttribute('aria-label');
        expect(currentLabel).not.toBe(`1 / ${itemAmount}`);

        if (screenshot) {
            await screenshotAndAttach(page, './screenshots/Home-productReview', '02 - Last reivew shows, next button disabled');
        }

        const item1 = page.locator(`//div[contains(@class,"AddProductReviews")]//div[contains(@class,"swiper-slide") and @aria-label="1 / ${itemAmount}"]`);
        await expect(item1).not.toHaveClass(/slide-active/);

        while (true) {
            await prevButton.click();
            await page.waitForTimeout(300);

            const prevClass = await prevButton.getAttribute('class');
            if (prevClass?.includes('swiper-button-disabled')) {
                const activeItem = getActiveItem();
                const ariaLabel = await activeItem.getAttribute('aria-label');
                expect(ariaLabel).toBe(`1 / ${itemAmount}`);
                break;
            }
        }
    }

    abstract assertWhyShopWithUsContent(page: Page): Promise<void>;
}

type CarouselItem = {
    text?: string;
    href?: string;
    hasImage?: boolean;
};

interface HighlightCategoryItem {
    href: string;
    hasImage: boolean;
    aboveText: string;
    underText: string;
}

interface RecommendedProductItem {
    buttonText: string;
    divClass: string;
}

interface ReviewedItem {
    url: string;
    index: number;
}