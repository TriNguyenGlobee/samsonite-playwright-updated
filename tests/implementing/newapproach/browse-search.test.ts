import { test } from "../../../src/fixtures/test-fixture"
import { delay, PageUtils, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { Config } from "../../../config/env.config";

test.describe("Browse-search", async () => {
    test(`
        1. Search form is displayed
        2. Search form is closed
        3. Select popular search term - Search results page is displayed
        4. Enter search term - View All Results button is displayed
        5. Click View All Results - Search results page is displayed
        6. Recent searches are displayed
        7. Clear search input - Search input is cleared
        8. Clear recent searches - Recent searches are cleared
        `, async ({ basicAuthPageNoWatchdog }) => {
        const homepage = createHomePage(basicAuthPageNoWatchdog);
        const MCPBanner = basicAuthPageNoWatchdog.locator(`//button[@class="mcp-close"]`)

        await step("Close MCP banner if displayed", async () => {
            if (await MCPBanner.isVisible()) {
                await homepage.click(MCPBanner, "Close MCP banner")
            }
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(1000)
        })

        await step("Verify - 1. Search form is displayed", async () => {
            await homepage.assertVisible(homepage.searchForm, `Search form is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '01 - Search form');
        })

        await step("Clicking on Close icon", async () => {
            await homepage.click(homepage.searchFormCloseButton, `Click on Close icon`);
            await delay(3000)
        })

        await step("Verify - 2. Search form is closed", async () => {
            await homepage.assertHidden(homepage.searchForm, `Search form is closed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '02 - Search form closed');
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(3000)
        })

        await step("Verify - 3. Select popular search term - Search results page is displayed", async () => {
            const popularSearchTerm = await homepage.popularSearchTermItem.nth(0).innerText();
            await homepage.click(homepage.popularSearchTermItem.nth(0), `Click on popular search term: ${popularSearchTerm}`, 15, 3);
            await PageUtils.waitForPageLoad(basicAuthPageNoWatchdog);

            await delay(5000)

            await homepage.assertUrl(`${Config.baseURL}search?q=${popularSearchTerm}`, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '03 - Search results page')
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
        })

        await step("Verify - 4. Enter search term - View All Results button is displayed", async () => {
            const searchTerm = "bags";
            await delay(3000)
            //await homepage.type(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`);
            await homepage.typeByManual(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`)
            await homepage.assertVisible(homepage.viewAllResultsButton, `View All Results button is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '04 - View All Results button');
            await delay(5000)
        })

        await step("Verify - 5. Click View All Results - Search results page is displayed", async () => {
            await homepage.click(homepage.viewAllResultsButton, `Click on View All Results button`);
            await delay(5000)

            await homepage.assertUrl(/search\?q=bags/, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '05 - Search results page from View All Results button');
        })

        await step("Clicking on Search icon", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(5000)
        })

        await step("Verify - 6. Recent searches are displayed", async () => {
            await delay(3000)
            await homepage.assertVisible(homepage.recentSearchTermList, `Recent searches are displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '06 - Recent searches');
        })

        await step("Verify - 7. Clear search input - Search input is cleared", async () => {
            await delay(5000)
            const searchTerm = "bags";
            await homepage.type(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`);
            await delay(3000)
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), searchTerm, `Search input has value: ${searchTerm}`);

            await homepage.jsClick(homepage.clearSearchButton, `Click on Clear Search button`)
            await delay(5000)
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), "", `Search input is cleared`);

            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '07 - Search input cleared');
        })

        await step("Verify - 8. Clear recent searches - Recent searches are cleared", async () => {
            await delay(5000)
            await homepage.removeAllRecentSearchTerms();
            await homepage.assertEqual(await homepage.recentSearchTermItem.count(), 0, `Recent searches are cleared`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '08 - Recent searches cleared');
        })

    });
})