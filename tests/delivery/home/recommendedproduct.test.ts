import { test } from "../../../src/fixtures/test-fixture";
import { createHomePage } from "../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { scrollToBottom } from "../../../utils/helpers/helpers";

test.describe("Recommended Products Section", () => {
    test(`1. Recommended products are displayed correctly when click side button`, async ({ basicAuthPage }) => {
        const { recommendedProductItems } = loadTestData()

        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.recommendedSection.scrollIntoViewIfNeeded();
        });

        await step("Verify recommended products section activity", async () => {
            await homePage.checkRecommendSectionActivity(basicAuthPage, recommendedProductItems);
        });
    });
});