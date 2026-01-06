import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../../src/factories/home.factory";
import { lazyLoad, PageUtils, scrollToTop, t } from "../../../../utils/helpers/helpers";
import { createLuggagePage } from "../../../../src/factories/productlistingpage/luggage.factory";

test.describe("Product Listing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('luggage', "Go to Luggage page")
    })

    test(`
        1. Rating stars and review count under products are displayed
        2. Sort By Rating High to Low
        3. Switch product size
        `, async ({ basicAuthPage }) => {
        const luggagepage = createLuggagePage(basicAuthPage)

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }

            await lazyLoad(basicAuthPage)
        })

        await step("Assert Rating stars and review count under products are displayed", async () => {
            await luggagepage.assertPLPDecimalRatingPointCorrect(
                "Assert BV decimal rating point is correct on PLP"
            );
        })

        await step("Sort By Rating High to Low", async () => {
            await luggagepage.sortPLPProduct(`${t.bvintegration('ratinghightoLow')}`)
            await lazyLoad(basicAuthPage)
        })

        await step("Assert products are sorted by Rating High to Low", async () => {
            await luggagepage.assertPLPProductSortedByRatingPoint("desc", 
                "Assert products are sorted by Rating High to Low")
        })

        await step("Switch PLP product size", async () => {
            await luggagepage.selectPLPProductSizeByIndex(1, 2,
                "Switch the first PLP product size to the second option"
            )
        })

        await step("Assert Rating stars and review count under products are displayed correctly", async () => {
            await luggagepage.assertPLPDecimalRatingPointCorrect(
                "Assert BV decimal rating point is correct on PLP"
            );
        })
    })

    test(`
        4. Filter products by Rating 4 stars & up
        `, async ({ basicAuthPage }) => {
        const luggagepage = createLuggagePage(basicAuthPage)

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }

            await lazyLoad(basicAuthPage)
        })

        await step("Filter 5 stars products", async () => {
            await luggagepage.selectPLPFilter(basicAuthPage, `${t.bvintegration('rating')}->5.0` )
        })

        await step("Assert all products have rating 5 stars", async () => {
            await luggagepage.assertPLPAllProductsHaveMinRatingStars(4.5, "Assert all products have rating 5 stars")
        })

        await step("Filter 4 stars products", async () => {
            await luggagepage.selectPLPFilter(basicAuthPage, `${t.bvintegration('rating')}->4.0` )
        })

        await step("Assert all products have rating 4 stars", async () => {
            await luggagepage.assertPLPAllProductsHaveMinRatingStars(3.5, "Assert all products have rating 4 stars")
        })
    })
});
