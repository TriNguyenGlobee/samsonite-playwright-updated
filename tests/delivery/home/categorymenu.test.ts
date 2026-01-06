import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createLuggagePage } from "../../../src/factories/productlistingpage/luggage.factory";
import { createBackpacksPage } from "../../../src/factories/productlistingpage/backpacks.factory"
import { createBagsPage } from "../../../src/factories/productlistingpage/bags.factory"
import { createBrandPage } from "../../../src/factories/productlistingpage/brand.factory"
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";
import { OffersPage } from "../../../src/pages/delivery/productlistingpage/offers/offers.page";
import { createHomePage } from "../../../src/factories/home.factory"
import { delay, PageUtils } from "../../../utils/helpers/helpers";
import { steps } from "../../../utils/helpers/localeStep"
import { createAccessoriesPage } from "../../../src/factories/productlistingpage/accessories.factory";

test.describe("Category Menu", () => {
    test("1. All level 2 categories are displayed", async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const newarrivalspage = new NewArrivalsPage(basicAuthPage);
        const luggagepage = createLuggagePage(basicAuthPage);
        const backpackspage = createBackpacksPage(basicAuthPage);
        const bagspage = createBagsPage(basicAuthPage);
        const brandpage = createBrandPage(basicAuthPage);
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage);
        const offerspage = new OffersPage(basicAuthPage);
        const accessoriespage = createAccessoriesPage(basicAuthPage);

        await step("Hover over 'New Arrivals' menu", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage, 5000)
            await PageUtils.waitForDomAvailable(basicAuthPage, 3000)
            await homePage.hover(homePage.newArrivalsMenuItem);
        });
        
        await step("Verify that all categories under 'New Arrivals' are displayed", async () => {
            await newarrivalspage.assertNewArrivalsListItems(basicAuthPage);
        });
        
        await step("Hover over 'Luggage' menu", async () => {
            await homePage.hover(homePage.luggageMenuItem);
        });

        await step("Verify that all categories under 'Luggage' are displayed", async () => {
            await luggagepage.assertLuggageListItems(basicAuthPage);
        });

        await step("Hover over 'Backpacks' menu", async () => {
            await homePage.hover(homePage.backPacksMenuItem);
        });

        await step("Verify that all categories under 'Backpacks' are displayed", async () => {
            await backpackspage.assertBackpacksListItems(basicAuthPage);
        });

        await step("Hover over 'Bags' menu", async () => {
            await homePage.hover(homePage.bagsMenuItem);
        });

        await step("Verify that all categories under 'Bags' are displayed", async () => {
            await bagspage.assertBagsListItems(basicAuthPage);
        });

        await steps(["jp", "ph", "sg", "tw", "my", "id"], "Hover over 'Brand' menu", async () => {
            await homePage.hover(homePage.labelsMenuItem);
        });

        await steps(["jp", "ph", "sg", "tw", "my", "id"], "Verify that all categories under 'Brand' are displayed", async () => {
            await brandpage.assertBrandItems(basicAuthPage);
        });

        await step("Hover over 'Discover' menu", async () => {
            await homePage.hover(homePage.discoverMenuItem);
        });

        await step("Verify that all categories under 'Discover' are displayed", async () => {
            await ourbrandstorypage.assertOurBrandStoryListItems(basicAuthPage);
        });

        await steps(["sg"], "Hover over 'Offers' menu", async () => {
            await homePage.hover(homePage.offersMenuItem);
        });

        await steps(["sg"], "Verify that all categories under 'Offers' are displayed", async () => {
            await offerspage.assertOffersListItems(basicAuthPage);
        });
        
        await steps(["tw", "ph", "au", "my", "id", "nz"], "Hover over 'Accessories' menu", async () => {
            await homePage.hover(homePage.accessoriesMenuItem);
        });

        await steps(["tw", "ph", "au", "my", "id", "nz"], "Verify that all categories under 'Accessories' are displayed", async () => {
            await accessoriespage.assertAccesoriesListItems(basicAuthPage)
        });
    });
});
