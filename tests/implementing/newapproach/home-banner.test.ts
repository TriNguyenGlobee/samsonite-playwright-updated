import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory"
import { screenshotAndAttach } from "../../../utils/helpers/helpers";

test.describe("Home-banner", () => {
    const { carouselItems } = loadTestData();

    test(`
        1. First banner item is active by default - Homepage banner
    `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const carousel = basicAuthPage.locator('//div[contains(@class,"homepage-banner-carouselregion")]');
        const carouselString = '//div[contains(@class,"homepage-banner-carouselregion")]';

        await step("Scroll to center banner", async () => {
            await homePage.centerBanner.scrollIntoViewIfNeeded();
        });

        await step("Verify - 1. First banner item is active by default - Homepage banner", async () => {
            await homePage.assertCenterBannerDisplayed(carousel, carouselItems);
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-banner', '01 - First banner active');
        });

        await step("Verify - 2. Clicking dot button to navigate banner - Banner navigate correctly", async () => {
            await homePage.assertBannerNavigationByDots(basicAuthPage, carousel);
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-banner', '02 - Last banner active');
        });

        await step("Verify banner navigate to correct URL", async () => {
            await homePage.assertBannerNavigation(basicAuthPage, carouselString);
        });
    });
});