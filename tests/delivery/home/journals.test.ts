import { test, expect } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom, delay } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Samsonite Journals section", () => {
    test(`
        1. Verify the slides visible on initial load
        2. Verify the slide works properly
        3. Verify that clicking on the active item navigates to the correct URL 
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Journals section", async () => {
            await homePage.journalsSection.scrollIntoViewIfNeeded();
        });

        await step(`Verify the initial slides are displayed correctly`, async () => {
            const expectedIndexs = [0, 1, 2]
            const activeItemIndexs = await homePage.getJournalsActiveItemIndexes()

            expect(activeItemIndexs).toEqual(expectedIndexs)
        })

        await step(`Verify the Journals slide works properly when clicking the next button`, async () => {
            const expectedIndexes_01 = [0, 1, 2]
            const expectedIndexes_02 = [3, 4, 5]

            const activeItemIndexs_01 = await homePage.getJournalsActiveItemIndexes()

            await homePage.click(homePage.journalsNextbutton, `Click Next button`)
            await delay(300)
            const activeItemIndexs_02 = await homePage.getJournalsActiveItemIndexes()

            expect(activeItemIndexs_01).toEqual(expectedIndexes_01)
            expect(activeItemIndexs_02).toEqual(expectedIndexes_02)
        })

        await step(`Verify the Journals slide works properly when clicking the previous button`, async () => {
            const expectedIndexes_02 = [0, 1, 2]
            const expectedIndexes_01 = [3, 4, 5]

            const activeItemIndexs_01 = await homePage.getJournalsActiveItemIndexes()

            await homePage.click(homePage.journalsPreviousButton, `Click previous button`)
            await delay(300)
            const activeItemIndexs_02 = await homePage.getJournalsActiveItemIndexes()

            expect(activeItemIndexs_01).toEqual(expectedIndexes_01)
            expect(activeItemIndexs_02).toEqual(expectedIndexes_02)
        })

        await step(`Verify that clicking on the active item navigates to the correct URL `, async () => {
            const activeItems = basicAuthPage.locator('//div[contains(@class,"journals-articles")]//div[contains(@class,"owl-item active")][1]');
            const firstItem = activeItems
            const href = await homePage.getLocatorURL(firstItem)

            await expect(firstItem).toBeVisible();
            await firstItem.waitFor({ state: 'visible' });
            await basicAuthPage.waitForTimeout(500);

            await firstItem.click()

            expect(basicAuthPage.url()).toContain(href)
        })
    });
});