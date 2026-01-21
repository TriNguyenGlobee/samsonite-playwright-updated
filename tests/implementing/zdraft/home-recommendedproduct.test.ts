import { test } from "../../../src/fixtures/test-fixture";
import { createHomePage } from "../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { scrollToBottom, screenshotAndAttach } from "../../../utils/helpers/helpers";

test.describe("Home-Recommended-Products", () => {
    test(`1. Clicking side button to show products - Recommended product shows correctly`, async ({ basicAuthPage }) => {
        const { recommendedProductItems } = loadTestData()

        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.recommendedSection.scrollIntoViewIfNeeded();
        });

        await screenshotAndAttach(basicAuthPage, './screenshots/Home-recommended-products', '01 - First category is selected');

        await step("Verify recommended products section activity", async () => {
            await homePage.checkRecommendSectionActivity(basicAuthPage, recommendedProductItems);
        });

        await screenshotAndAttach(basicAuthPage, './screenshots/Home-recommended-products', '02 - Last category is selected');
    });
});