import { test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom, extractNumber, getDecimalRatingStar, PageUtils } from "../../../../utils/helpers/helpers";
import { createHomePage } from "../../../../src/factories/home.factory";
import { PDPPage } from "../../../../src/pages/delivery/pdp/pdp.page";

test.describe("Product Review Section", () => {
    test(`
        1. Navigate to correct URL when clicking on product
        2. Displays up to 10 of the newest reviews, each with a rating between 4.5 and 5 stars
        `, async ({ basicAuthPage }) => {

        const homePage = createHomePage(basicAuthPage);
        const pdppage = new PDPPage(basicAuthPage)

        let prodCollection: string;
        let prodName: string;
        let prodPrice: number;
        let decimalRatingStar: number;
        let numberOfReviews: number;

        const prodRoot = basicAuthPage.locator(`//div[contains(@class,"AddProductReviews") or contains(@class,"productReviews")]//div[contains(@class,"swiper-slide-active")]`)
        const prodImg = prodRoot.locator(`xpath=.//img`)
        const prodViewButton = prodRoot.locator(`xpath=.//button`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.productReviewSection.scrollIntoViewIfNeeded();
        });

        await step("Verify Product Review swiper activity", async () => {
            await homePage.assertProductReviewActivity(basicAuthPage)
        })

        await step("Verify navigate to correct URL when clicking on product", async () => {
            const prodURL = (await homePage.getReviewedProductURL(basicAuthPage)).url

            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodImg, prodURL)
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodViewButton, prodURL)
        })

        await step("Get current product information", async () => {
            prodCollection = await prodRoot.locator(`xpath=.//div[@class="product-collection"]`).innerText()
            prodName = await prodRoot.locator(`xpath=.//div[@class="product-name"]`).innerText()
            prodPrice = await extractNumber(await prodRoot.locator(`xpath=.//span[@class="product-price-sale"]`).innerText() as string)
            decimalRatingStar = await homePage.bvGetReviewDecicalRatingStar(1)
            numberOfReviews = await homePage.bvGetReviewNumberOfReviews(1)
        });

        await step("Go to PDP and verify review information", async () => {
            await homePage.click(prodViewButton, "Click View Product button to navigate to PDP");
            await PageUtils.waitForPageLoad(basicAuthPage)

            const pdpCollection = await pdppage.getText(pdppage.prodCollecton)
            const pdpName = await pdppage.getText(pdppage.prodName)
            const pdpPrice = await extractNumber((await pdppage.getText(pdppage.prodPrice)) as string)
            //const pdpDecimalRatingStar = await getDecimalRatingStar(basicAuthPage)
            const numberOfReview = await pdppage.getNumberOfReview("Get number of reviews on PDP")

            await pdppage.assertEqual(prodCollection, pdpCollection, "Verify product collection matches");
            await pdppage.assertEqual(prodName, pdpName, "Verify product name matches");
            await pdppage.assertEqual(prodPrice, pdpPrice, "Verify product price matches");

            await pdppage.assertRating(basicAuthPage, decimalRatingStar, "Verify decimal rating star matches");
            await pdppage.assertEqual(numberOfReviews, numberOfReview, "Verify number of reviews matches");
        });
    });
});