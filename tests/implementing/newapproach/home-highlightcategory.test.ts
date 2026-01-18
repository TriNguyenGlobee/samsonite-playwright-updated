import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory"
import { screenshotAndAttach, scrollToBottom } from "../../../utils/helpers/helpers";

test.describe("Home-highlightcategory", () => {
    test(`1. Click highlight category item to navigate to correct URL - Highlight category shows correctly`, async ({ basicAuthPage }) => {
        const { hightlightCategoryItems } = await loadTestData();
        const homePage = createHomePage(basicAuthPage);
        const baseUrl = basicAuthPage.url();

        await step("Verify - 1. Click highlight category item to navigate to correct URL - Highlight category shows correctly", async () => {
            await scrollToBottom(basicAuthPage);
            await homePage.highlightSection.scrollIntoViewIfNeeded();
            
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-highlightcategory', '01 - Highlight category');
            await homePage.assertHighlightCategoryItemNavigation(basicAuthPage, hightlightCategoryItems, baseUrl);
        });
    });
});