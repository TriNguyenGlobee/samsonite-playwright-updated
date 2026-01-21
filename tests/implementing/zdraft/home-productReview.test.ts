import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory";


test.describe("Home-product Review Section", () => {
    test(`
        1. Click swiper button to navigate review - Product Review swiper works correctly
        2. Navigate to correct URL when clicking on product
        `, async ({ basicAuthPage }) => {

        const homePage = createHomePage(basicAuthPage);
        const prodRoot = basicAuthPage.locator(`//div[contains(@class,"AddProductReviews")]//div[contains(@class,"swiper-slide-active")]`)
        const prodImg = prodRoot.locator(`xpath=.//img`)
        const prodViewButton = prodRoot.locator(`xpath=.//button`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.productReviewSection.scrollIntoViewIfNeeded();
        });

        await step("Verify - 1. Click swiper button to navigate review - Product Review swiper works correctly", async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-productReview', '01 - Product Review Initial view');
            await homePage.assertProductReviewActivity(basicAuthPage, true)
        })

        await step("Verify- 2. Navigate to correct URL when clicking on product - Previous button disabled", async()=>{
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-productReview', '03 - First product review');

            const prodURL = (await homePage.getReviewedProductURL(basicAuthPage)).url
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodImg, prodURL)
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodViewButton, prodURL)
            
        })
    });
});