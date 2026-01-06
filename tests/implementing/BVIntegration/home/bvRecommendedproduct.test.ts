import { expect, test } from "../../../../src/fixtures/test-fixture";
import { createHomePage } from "../../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../../utils/data";
import { delay, scrollToBottom, openNewTab } from "../../../../utils/helpers/helpers";
import { PDPPage } from "../../../../src/pages/delivery/pdp/pdp.page";

test.describe("Recommended Products Section", () => {
    test(`1. Rating stars and review count under products are displayed`, async ({ basicAuthPage }) => {
        const { recommendedProductItems } = loadTestData()
        const homePage = createHomePage(basicAuthPage);
        const pdppage = new PDPPage(basicAuthPage)
        const recommendedProductCol = basicAuthPage.locator(`//div[contains(@class,"homepage-product-listing")]//div[@class="tile-item swiper-slide swiper-slide-active"]`)
        //const recommendedProductCol = basicAuthPage.locator(`//div[@class="homepage-product-listing swiper-wrapper"]`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.bvRecommendedCategoryButtons01.scrollIntoViewIfNeeded();
            await homePage.waitFor(recommendedProductCol.first(), "Wait for product column visible")
        });

        await step("Verify recommended products section activity", async () => {
            await homePage.checkRecommendSectionActivity(basicAuthPage, recommendedProductItems);
        });

        await step("Select first category", async () => {
            await homePage.bvRecommendedCategoryButtons01.click();
        });

        await step("Verify rating stars and review count under products", async () => {
            const ratedProductsCount = await homePage.bvGetRatedRecommendedProductItemsCount(1, "Get rated recommended products count")
            const firstProductDecimalReviewPoint = await homePage.bvGetRecommendedDecimalReviewPoint(1, 1, "Get first product decimal review point");
            const firstProductNumberOfReviews = await homePage.bvGetRecommendedNumberOfReviews(1, 1, "Get first product number of reviews");

            expect(ratedProductsCount).toBeGreaterThan(0);

            const pdpNewTab01 = await openNewTab(basicAuthPage, () =>
                homePage.clickRatedRecommendedProductItemByIndex(1, 1, "Click first rated recommended product")
            )

            const pdppageNewTab = new PDPPage(pdpNewTab01)
            await scrollToBottom(pdpNewTab01)

            let ratingPointValue01 = await pdppageNewTab.getDecimalRatingPoint()
            let numberOfReview01 = await pdppageNewTab.getNumberOfReview("Get number of reviews on PDP")

            expect(ratingPointValue01).toBe(firstProductDecimalReviewPoint);
            expect(numberOfReview01).toBe(firstProductNumberOfReviews);

            await pdpNewTab01.close()

            //await pdppage.goBack("Home page");
        });

        await step("Select second category", async () => {
            await homePage.bvRecommendedCategoryButtons02.click();
            await delay(1000);
        });

        await step("Verify rating stars and review count under products", async () => {
            const ratedProductsCount = await homePage.bvGetRatedRecommendedProductItemsCount(2, "Get rated recommended products count")
            const firstProductDecimalReviewPoint = await homePage.bvGetRecommendedDecimalReviewPoint(2, 1, "Get first product decimal review point");
            const firstProductNumberOfReviews = await homePage.bvGetRecommendedNumberOfReviews(2, 1, "Get first product number of reviews");

            expect(ratedProductsCount).toBeGreaterThan(0);

            const pdpNewTab02 = await openNewTab(basicAuthPage, () =>
                homePage.clickRatedRecommendedProductItemByIndex(2, 1, "Click first rated recommended product")
            )

            const pdppageNewTab = new PDPPage(pdpNewTab02)
            await scrollToBottom(pdpNewTab02)

            let ratingPointValue02 = await pdppageNewTab.getDecimalRatingPoint()
            let numberOfReview02 = await pdppageNewTab.getNumberOfReview("Get number of reviews on PDP")

            expect(ratingPointValue02).toBe(firstProductDecimalReviewPoint);
            expect(numberOfReview02).toBe(firstProductNumberOfReviews);

            await pdpNewTab02.close()
            //await pdppage.goBack("Home page");
        });

        await step("Select third category", async () => {
            await homePage.bvRecommendedCategoryButtons03.click();
            await delay(1000);
        });

        await step("Verify rating stars and review count under products", async () => {
            const ratedProductsCount = await homePage.bvGetRatedRecommendedProductItemsCount(3, "Get rated recommended products count")
            const firstProductDecimalReviewPoint = await homePage.bvGetRecommendedDecimalReviewPoint(3, 1, "Get first product decimal review point");
            const firstProductNumberOfReviews = await homePage.bvGetRecommendedNumberOfReviews(3, 1, "Get first product number of reviews");

            expect(ratedProductsCount).toBeGreaterThan(0);

            const pdpNewTab03 = await openNewTab(basicAuthPage, () =>
                homePage.clickRatedRecommendedProductItemByIndex(3, 1, "Click first rated recommended product")
            )

            const pdppageNewTab = new PDPPage(pdpNewTab03)
            await scrollToBottom(pdpNewTab03)

            let ratingPointValue03 = await pdppageNewTab.getDecimalRatingPoint()
            let numberOfReview03 = await pdppageNewTab.getNumberOfReview("Get number of reviews on PDP")

            expect(ratingPointValue03).toBe(firstProductDecimalReviewPoint);
            expect(numberOfReview03).toBe(firstProductNumberOfReviews);

            await pdpNewTab03.close()
            //await pdppage.goBack("Home page");
        });

        await step("Select fourth category", async () => {
            await homePage.bvRecommendedCategoryButtons04.click();
            await delay(1000);
        });

        await step("Verify rating stars and review count under products", async () => {
            const ratedProductsCount = await homePage.bvGetRatedRecommendedProductItemsCount(4, "Get rated recommended products count")
            const firstProductDecimalReviewPoint = await homePage.bvGetRecommendedDecimalReviewPoint(4, 1, "Get first product decimal review point");
            const firstProductNumberOfReviews = await homePage.bvGetRecommendedNumberOfReviews(4, 1, "Get first product number of reviews");

            expect(ratedProductsCount).toBeGreaterThan(0);

            const pdpNewTab04 = await openNewTab(basicAuthPage, () =>
                homePage.clickRatedRecommendedProductItemByIndex(4, 1, "Click first rated recommended product")
            )

            const pdppageNewTab = new PDPPage(pdpNewTab04)
            await scrollToBottom(pdpNewTab04)

            let ratingPointValue04 = await pdppageNewTab.getDecimalRatingPoint()
            let numberOfReview04 = await pdppageNewTab.getNumberOfReview("Get number of reviews on PDP")

            expect(ratingPointValue04).toBe(firstProductDecimalReviewPoint);
            expect(numberOfReview04).toBe(firstProductNumberOfReviews);
        });

    });
});