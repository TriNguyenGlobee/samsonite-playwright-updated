import { test } from "../../../src/fixtures/test-fixture"
import { delay, PageUtils, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { Config } from "../../../config/env.config";

test.describe("Browse-search", async () => {
    test(`
        1. Search Form is displayed when clicking on Search icon
        2. Click on Close search icon to close Search form
        3. User can click Popular search term to search
        4. View All Result button is displayed when user type a search term into search textbox
        5. User can click on View All Results button to go to search result page
        6. Verify that the Recent searches are displayed
        7. User can clear the entered search term
        8. User can remove Recent Searches
        `, async ({ basicAuthPageNoWatchdog }) => {
        const homepage = createHomePage(basicAuthPageNoWatchdog);
        const searchTerm = "bags";
        //const MCPBanner = basicAuthPageNoWatchdog.locator(`//button[@class="mcp-close"]`)
        /*    
        await step("Close MCP banner if displayed", async () => {
            if (await MCPBanner.isVisible()) {
                await homepage.click(MCPBanner, "Close MCP banner")
            }
        })*/

        await step("[STEP] Click on Search icon to show Search Form", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(1000)
        })

        await step("[STEP] Verify - 1. Search Form is displayed", async () => {
            await homepage.assertVisible(homepage.searchForm, `Search form is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '01 - Search form');
        })

        await step("[STEP] Click on Close icon to close Search Form", async () => {
            await homepage.click(homepage.searchFormCloseButton, `Click on Close icon`);
            await delay(3000)
        })

        await step("[STEP] Verify - 2. Search form is closed", async () => {
            await homepage.assertHidden(homepage.searchForm, `Search form is closed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '02 - Search form closed');
        })

        await step("[STEP] Click on Search icon to show Search Form again", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(3000)
        })

        const popularSearchTerm = await homepage.popularSearchTermItem.nth(0).innerText();
        await step("[STEP] Click on first popular search term", async () => {
            await homepage.click(homepage.popularSearchTermItem.nth(0), `Click on popular search term: ${popularSearchTerm}`, 15, 3);
        })

        await PageUtils.waitForPageLoad(basicAuthPageNoWatchdog);
        await delay(5000)

        await step("[STEP] Verify - 3. URL of search result page is correct", async () => {
            await homepage.assertUrl(`${Config.baseURL}search?q=${popularSearchTerm}`, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '03 - Search results page')
        })

        await step("[STEP] Clicking on Search icon to show Search Form again", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(3000)
        })
        
        await step("[STEP] Enter a search term into Search textbox", async () => {
            await homepage.typeByManual(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`)
        })

        await step("[STEP] Verify - 4. View All Results button is displayed", async () => {
            await homepage.assertVisible(homepage.viewAllResultsButton, `View All Results button is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '04 - View All Results button');
            await delay(5000)
        })

        await step("[STEP] Click on View All Results button", async () => {
            await homepage.click(homepage.viewAllResultsButton, `Click on View All Results button`);
            await delay(5000)
        })
        

        await step("[STEP] Verify - 5. URL of search result page is correct", async () => {
            await homepage.assertUrl(/search\?q=bags/, `Search results page is displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '05 - Search results page from View All Results button');
        })

        await step("[STEP] Clicking on Search icon to show Search Form again", async () => {
            await homepage.click(homepage.searchIcon, `Click on Search icon`);
            await delay(5000)
        })

        await step("[STEP] Verify - 6. Recent searches are displayed", async () => {
            await delay(3000)
            await homepage.assertVisible(homepage.recentSearchTermList, `Recent searches are displayed`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '06 - Recent searches');
        })

        await step("[STEP] Enter search term into Search Textbox", async () => {
            await delay(5000)
            await homepage.type(homepage.searchtextbox, searchTerm, `Enter search term: ${searchTerm}`);
        })

        await step("[STEP] Verify the entered value is correct", async () => {
            await delay(3000)
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), searchTerm, `Search input has value: ${searchTerm}`);
        })

        await step("[STEP] Click on Clear Search button", async () => {
            await homepage.jsClick(homepage.clearSearchButton, `Click on Clear Search button`)
            await delay(5000)
        })

        await step("[STEP] Verify - 7. Search textbox is cleared", async () => {
            await homepage.assertEqual(await homepage.searchtextbox.inputValue(), "", `Search input is cleared`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '07 - Search input cleared');
        })

        await step("[STEP] Click remove icon to remove all recent searches", async () => {
            await delay(5000)
            await homepage.removeAllRecentSearchTerms();
        })

        await step("[STEP] Verify - 8. Recent searches are removed", async () => {
            await homepage.assertEqual(await homepage.recentSearchTermItem.count(), 0, `Recent searches are cleared`);
            await screenshotAndAttach(basicAuthPageNoWatchdog, './screenshots/Search', '08 - Recent searches cleared');
        })
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Search', 'Final State');
        });
    });
})