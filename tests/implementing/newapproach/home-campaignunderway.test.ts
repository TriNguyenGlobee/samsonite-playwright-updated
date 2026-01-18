import { test, expect } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Home-campaignUnderway", () => {
    test(`
        1. Click left side Image to navigate to correct URL - Left side column infor shows correctly
        2. Click swiper button to navigate the right side product - Last item shows
        `, async ({ basicAuthPage }) => {
        const { campaignData } = await loadTestData();

        const homePage = createHomePage(basicAuthPage);
        const leftSideColumn = basicAuthPage.locator('//div[contains(@class,"magazine-carousel-column-desktop")]//div[contains(@class,"magazine-main-image placeholder-glow")]')
        const rightSideTitle = basicAuthPage.locator(`//div[contains(@class,"magazine-carousel-column-desktop")]//div[@class="magazine-title"]`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.campaignUnderwaysection.scrollIntoViewIfNeeded();
        });

        await step("Verify- 1. Click left side Image to navigate to correct URL - Left side column infor shows correctly", async () => {
            await homePage.assertLocatorInside(leftSideColumn, { href: campaignData[0].href, hasImage: campaignData[0].hasImage })
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, leftSideColumn, campaignData[0].href)
            await homePage.assertText(rightSideTitle, campaignData[0].rightSideTitleText,
                "Verify right side title")

            await screenshotAndAttach(basicAuthPage, './screenshots/Home-campaignunderway', '01 - Left side column');
        });

        await step(`Verify- 2. Click swiper button to navigate the right side product - Last item shows`, async () => {
            await homePage.assertRightSideColumnActivity(basicAuthPage, true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-campaignunderway', '03 - Previous button disabled');
        })
    });
});