import { test, expect } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom } from "../../../utils/helpers/helpers";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Campaign Underway Section", () => {
    test(`
        1. Left side column displayed
        2. Click left side Image to navigate to correct URL
        3. Right side title is displayed
        4. Click swiper button to navigate the right side product
        `, async ({ basicAuthPage }) => {
        const { campaignData } = await loadTestData();

        const homePage = createHomePage(basicAuthPage);
        const leftSideColumn = basicAuthPage.locator('//div[contains(@class,"magazine-carousel-column-desktop")]//div[contains(@class,"magazine-main-image placeholder-glow")]')
        const rightSideTitle = basicAuthPage.locator(`//div[contains(@class,"magazine-carousel-column-desktop")]//div[@class="magazine-title"]`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.campaignUnderwaysection.scrollIntoViewIfNeeded();
        });

        await step("Verify Left Side Column Info", async () => {
            await homePage.assertLocatorInside(leftSideColumn, { href: campaignData[0].href, hasImage: campaignData[0].hasImage })
        });

        await step("Verify banner navigate to correct URL", async () => {
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, leftSideColumn, campaignData[0].href)
        })

        await step(`Verify right side title`, async () => {
            await expect(rightSideTitle).toHaveText(campaignData[0].rightSideTitleText)
        })

        await step(`Verify right side swiper activity`, async () => {
            await homePage.assertRightSideColumnActivity(basicAuthPage)
        })
    });
});