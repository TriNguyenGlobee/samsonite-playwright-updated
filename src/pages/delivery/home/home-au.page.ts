import { Locator, expect } from "@playwright/test";
import { t, PageUtils } from "../../../../utils/helpers/helpers";
import { HomePage } from "./home.page";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";
import { step } from "allure-js-commons";
import { Config } from "../../../../config/env.config";

export class HomePageAU extends HomePage {
    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isHomepageDisplayed(): Promise<boolean> {
        try {
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
        const realItems = this.page.locator(
            'xpath=.//div[contains(@class,"homepage-banner")]//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]'
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
                    await expect(link.first()).toHaveAttribute('href', expected.href!);
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

        if (await activeItems.isVisible()) {
            const activeCount = await activeItems.count();
            expect(activeCount).toEqual(1);
        }
    }

    async assertWhyShopWithUsContent(): Promise<void> {
        await test.step("why shop with us section data: ", async () => {
            await attachment("Stringent Quality Tests and a Truly Global Warranty", t.whyshopwithus('warranty'), "text/plain");
            await attachment("Fast, Secure Payment and Delivery", t.whyshopwithus('fastdelivery'), "text/plain");
            await attachment("115 Years of Innovation", t.whyshopwithus('officialwebsite'), "text/plain");
            await attachment("A World of Choice", t.whyshopwithus('fullcollection'), "text/plain");
        });

        await this.assertLocatorInside(this.withUsWarranty, {
            hasImage: true,
            text: `${t.whyshopwithus('warranty')}`
        })

        await this.assertLocatorInside(this.withUsFastDelivery, {
            hasImage: true,
            text: `${t.whyshopwithus('fastdelivery')}`
        })

        await this.assertLocatorInside(this.withUsOfficalSite, {
            hasImage: true,
            text: `${t.whyshopwithus('officialwebsite')}`
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