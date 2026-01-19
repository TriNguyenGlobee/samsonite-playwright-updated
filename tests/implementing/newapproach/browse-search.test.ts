import { test, expect } from "../../../src/fixtures/test-fixture"
import { t, clickUntil, PageUtils, delay, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutLoginPage } from "../../../src/pages/implementing/checkout/checkoutlogin.page";
import { step } from "allure-js-commons";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { loadTestData } from "../../../utils/data";
import { Config } from "../../../config/env.config";

test.describe("Browse-search", async () => {
    test(`
        1. Search form is displayed
        2. Search form is closed
        3. Select popular search term - Search results page is displayed
        4. Enter search term - View All Results button is displayed
        5. Click View All Results - Search results page is displayed
        6. Recent searches are displayed
        7. Clear recent searches - Recent searches are cleared
        8. Clear search input - Search input is cleared
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage);

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
        })

        await homepage.pause()

        await step("Verify - 1. Search form is displayed", async () => {
            await homepage.assertVisible(homepage.searchForm, `Search form is displayed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '01 - Search form');
        })

        await step("Clicking on Close icon", async () => {
            await homepage.click(homepage.searchFormCloseButton, `Click on Close icon`);
        })

        await step("Verify - 2. Search form is closed", async () => {
            await homepage.assertVisible(homepage.searchForm, `Search form is closed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '02 - Search form closed');
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
        })

        await step("Verify - 3. Select popular search term - Search results page is displayed", async () => {
            const popularSearchTerm = await homepage.popularSearchTermItem.nth(0).innerText();
            await homepage.click(homepage.popularSearchTermItem.nth(0), `Click on popular search term: ${popularSearchTerm}`);

            await homepage.assertUrl(`/search?q=${popularSearchTerm}`, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '03 - Search results page')
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
        })

        await step("Verify - 4. Enter search term - View All Results button is displayed", async () => {
            const searchTerm = "bags";
            await homepage.type(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`);
            await homepage.assertVisible(homepage.viewAllResultsButton, `View All Results button is displayed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '04 - View All Results button');
        })

        await step("Verify - 5. Click View All Results - Search results page is displayed", async () => {
            await homepage.click(homepage.viewAllResultsButton, `Click on View All Results button`);
            await homepage.assertUrl(`/search?q=bags`, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '05 - Search results page from View All Results button');
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
        })

        await step("Verify - 6. Recent searches are displayed", async () => {
            await homepage.assertVisible(homepage.recentSearchTermList, `Recent searches are displayed`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '06 - Recent searches');
        })

        await step("Verify - 7. Clear recent searches - Recent searches are cleared", async () => {
            await homepage.removeAllRecentSearchTerms();
            await homepage.assertEqual(await homepage.recentSearchTermItem.count(), 0, `Recent searches are cleared`);
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '07 - Recent searches cleared');
        })

        await step("Verify - 8. Clear search input - Search input is cleared", async () => {
            const searchTerm = "bags";
            await homepage.type(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`);
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), searchTerm, `Search input has value: ${searchTerm}`);

            await homepage.click(homepage.clearSearchButton, `Click on Clear Search button`);
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), "", `Search input is cleared`);

            await screenshotAndAttach(basicAuthPage, './screenshots/Search', '08 - Search input cleared');
        })
    });
})