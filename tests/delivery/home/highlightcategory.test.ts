import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Highlight category", () => {
    test(`1. Highlight category section is displayed with full information`, async ({ basicAuthPage }) => {
        const { hightlightCategoryItems } = await loadTestData();
        const homePage = createHomePage(basicAuthPage);

        await step("Scroll to highlight section", async () => {
            await homePage.highlightSection.scrollIntoViewIfNeeded();
        });

        await step("Verify highlight category items displayed correctly", async () => {
            await homePage.assertHighlightCategoryItems(basicAuthPage, hightlightCategoryItems);
        });
    });

    test(`2. Click highlight category item to navigate to correct URL`, async ({ basicAuthPage }) => {
        const { hightlightCategoryItems } = await loadTestData();
        const homePage = createHomePage(basicAuthPage);
        const baseUrl = basicAuthPage.url();

        await step("Verify highlight category item navigation", async () => {
            await homePage.assertHighlightCategoryItemNavigation(basicAuthPage, hightlightCategoryItems, baseUrl);
        });
    });
});