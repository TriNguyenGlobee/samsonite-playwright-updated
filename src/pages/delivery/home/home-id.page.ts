import { t, PageUtils } from "../../../../utils/helpers/helpers";
import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./home.page";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class HomePageID extends HomePage {
    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

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

    async assertWhyShopWithUsContent(): Promise<void> {
        await test.step("why shop with us section data: ", async () => {
            await attachment("115 Years of Innovation", t.whyshopwithus('officialwebsite'), "text/plain");
            await attachment("Fast, Secure Payment and Delivery", t.whyshopwithus('securityShop'), "text/plain");
            await attachment("115 Years of Innovation", t.whyshopwithus('fastdelivery'), "text/plain");
            await attachment("World of Choice", t.whyshopwithus('fullcollection'), "text/plain");
        });

        await this.assertLocatorInside(this.withUsOfficalSite, {
            hasImage: true,
            text: `${t.whyshopwithus('officialwebsite')}`
        })

        await this.assertLocatorInside(this.withUsSafeShopping, {
            hasImage: true,
            text: `${t.whyshopwithus('securityShop')}`
        })

        await this.assertLocatorInside(this.withUsFastDelivery, {
            hasImage: true,
            text: `${t.whyshopwithus('fastdelivery')}`
        })

        await this.assertLocatorInside(this.withUsCollection, {
            hasImage: true,
            text: `${t.whyshopwithus('fullcollection')}`
        })
    }
}

type CarouselItem = {
    text?: string;
    href?: string;
    hasImage?: boolean;
};
