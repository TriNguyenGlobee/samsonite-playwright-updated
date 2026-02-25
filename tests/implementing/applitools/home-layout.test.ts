import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";
import { createHomePage } from "../../../src/factories/home.factory";
import { screenshotAndAttach, scrollToBottom, scrollToTop, disableAnimations } from "../../../utils/helpers/helpers";
import { Target } from "@applitools/eyes-playwright";

test.describe("Home-banner", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await disableAnimations(basicAuthPage);
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Banner");
    });

    const { carouselItems } = loadTestData();

    test(`
        1. First banner item is active by default
        2. Clicking dot button to navigate banner - Banner navigate correctly
        3. Verify banner navigate to correct URL
        `, async ({ basicAuthPage, eyes }) => {
        const homePage = createHomePage(basicAuthPage);

        const carousel = basicAuthPage.locator('//div[contains(@class,"homepage-banner-carouselregion")]');

        const carouselString = '//div[contains(@class,"homepage-banner-carouselregion")]';

        await step("[STEP] Scroll to center banner", async () => {
            await homePage.centerBanner.scrollIntoViewIfNeeded();
        });

        await step("[STEP] Verify - 1. First banner item is active by default", async () => {
            await homePage.assertCenterBannerDisplayed(carousel, carouselItems);
            await screenshotAndAttach(basicAuthPage, "./screenshots/Home-banner", "01 - First banner active");
        });

        await step("Visual Check - Banner Layout (First Slide)", async () => {
            await eyes.check("Banner Layout - First Slide", Target.region(carousel).layout());
        });

        await step("[STEP] Verify - 2. Clicking dot button to navigate banner - Banner navigate correctly", async () => {
            await homePage.assertBannerNavigationByDots(basicAuthPage, carousel);

            await screenshotAndAttach(basicAuthPage, "./screenshots/Home-banner", "02 - Last banner active");
        }
        );

        await step("Visual Check - Banner Layout (After Dot Click)", async () => {
            await eyes.check("Banner Layout - After Dot Click", Target.region(carousel).layout());
        });

        await eyes.close();

        await step("[STEP] Verify - Verify banner navigate to correct URL", async () => {
            await homePage.assertBannerNavigation(basicAuthPage, carouselString);
        });
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-banner', 'Final State');
        });
    });
});

test.describe("Home-highlightcategory", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Highlight Category");
    });

    test(`1. Click highlight category item to navigate to correct URL`, async ({ basicAuthPage, eyes }) => {
        const { hightlightCategoryItems } = await loadTestData();
        const homePage = createHomePage(basicAuthPage);
        const baseUrl = basicAuthPage.url();

        await scrollToBottom(basicAuthPage);
        await homePage.highlightSection.scrollIntoViewIfNeeded();

        await step("Visual Check - Highlight Category Layout", async () => {
            await eyes.check("Highlight Category Layout", Target.region(homePage.highlightSection).layout());
        });

        await eyes.close();

        await step("[STEP] Verify - 1. Click highlight category item to navigate to correct URL", async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-highlightcategory', '01 - Highlight category');
            await homePage.assertHighlightCategoryItemNavigation(basicAuthPage, hightlightCategoryItems, baseUrl);
        });
    });
});

test.describe("Home-Recommended-Products", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Recommended-Products");
    });

    test(`1. Clicking side button to show products - Recommended product shows correctly`, async ({ basicAuthPage, eyes }) => {
        const { recommendedProductItems } = loadTestData()

        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.recommendedSection.scrollIntoViewIfNeeded();
        });

        await step("Visual Check - Recommended Products Layout", async () => {
            await eyes.check("Recommended Products Layout", Target.region(homePage.recommendedSection).layout());
        });

        await eyes.close();

        await screenshotAndAttach(basicAuthPage, './screenshots/Home-recommended-products', '01 - First category is selected');

        await step("[STEP] Clicking side button to show products - Recommended product shows correctly", async () => {
            await homePage.checkRecommendSectionActivity(basicAuthPage, recommendedProductItems);
        });

        await screenshotAndAttach(basicAuthPage, './screenshots/Home-recommended-products', '02 - Last category is selected');
    });
});

test.describe("Home-campaignUnderway", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Campaign Underway");
    });

    test(`
        1. Click left side Image to navigate to correct URL - Left side column infor shows correctly
        2. Click swiper button to navigate the right side product - Last item shows
        `, async ({ basicAuthPage, eyes }) => {
        const { campaignData } = await loadTestData();

        const homePage = createHomePage(basicAuthPage);
        const leftSideColumn = basicAuthPage.locator('//div[contains(@class,"magazine-carousel-column-desktop")]//div[contains(@class,"magazine-main-image placeholder-glow")]')
        const rightSideTitle = basicAuthPage.locator(`//div[contains(@class,"magazine-carousel-column-desktop")]//div[@class="magazine-title"]`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.campaignUnderwaysection.scrollIntoViewIfNeeded();
        });

        await step("Visual Check - Campaign Underway Layout", async () => {
            await eyes.check("Campaign Underway Layout", Target.region(homePage.campaignUnderwaysection).layout());
        });

        await eyes.close();

        await step("[STEP] Verify- 1. Click left side Image to navigate to correct URL - Left side column infor shows correctly", async () => {
            await homePage.assertLocatorInside(leftSideColumn, { href: campaignData[0].href, hasImage: campaignData[0].hasImage })
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, leftSideColumn, campaignData[0].href)
            await homePage.assertText(rightSideTitle, campaignData[0].rightSideTitleText,
                "Verify right side title")

            await screenshotAndAttach(basicAuthPage, './screenshots/Home-campaignunderway', '01 - Left side column');
        });

        await step(`[STEP] Verify- 2. Click swiper button to navigate the right side product - Last item shows`, async () => {
            await homePage.assertRightSideColumnActivity(basicAuthPage, true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-campaignunderway', '03 - Previous button disabled');
        })
    });
});

test.describe("Home-product Review Section", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Product Review");
    });

    test(`
        1. Click swiper button to navigate review - Product Review swiper works correctly
        2. Navigate to correct URL when clicking on product
        `, async ({ basicAuthPage, eyes }) => {

        const homePage = createHomePage(basicAuthPage);
        const prodRoot = basicAuthPage.locator(`//div[contains(@class,"AddProductReviews")]//div[contains(@class,"swiper-slide-active")]`)
        const prodImg = prodRoot.locator(`xpath=.//img`)
        const prodViewButton = prodRoot.locator(`xpath=.//button`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.productReviewSection.scrollIntoViewIfNeeded();
        });

        await step("Visual Check - Product Review Layout", async () => {
            await eyes.check("Product Review Layout", Target.region(homePage.productReviewSection).layout());
        });

        await eyes.close();

        await step("[STEP] Verify - 1. Click swiper button to navigate review - Product Review swiper works correctly", async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-productReview', '01 - Product Review Initial view');
            await homePage.assertProductReviewActivity(basicAuthPage, true)
        })

        await step("[STEP] Verify- 2. Navigate to correct URL when clicking on product - Previous button disabled", async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Home-productReview', '03 - First product review');

            const prodURL = (await homePage.getReviewedProductURL(basicAuthPage)).url
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodImg, prodURL)
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodViewButton, prodURL)

        })
    });
});

test.describe("Home-Explore Samsonite", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Explore Samsonite");
    });

    test(`
        1. Explore Samsonite section layout should be correct
        `, async ({ basicAuthPage, eyes }) => {
        const exploreSamsonite = basicAuthPage.locator(`//div[@class="home-instagram"]`)
        const box = await exploreSamsonite.boundingBox();
        const pageHeight = await basicAuthPage.evaluate(() => document.body.scrollHeight);
        const viewport = basicAuthPage.viewportSize();

        await scrollToBottom(basicAuthPage);

        await step("[STEP] Visual Check - Explore Samsonite Section", async () => {
            await eyes.check("Section To Bottom",
                Target.region({
                    x: 0,
                    y: box!.y,
                    width: viewport!.width,
                    height: pageHeight - box!.y
                }).layout()
            );
        });

        await eyes.close();
    });
});

test.describe("Home-full page", () => {
    test.beforeEach(async ({ basicAuthPage, eyes }) => {
        await eyes.open(basicAuthPage, "My Samsonite", "Homepage Full Page");
    });

    test(`
        1. Full page layout should be correct
        `, async ({ basicAuthPage, eyes }) => {
        await scrollToBottom(basicAuthPage);
        //await scrollToTop(basicAuthPage);

        await step("[STEP] Visual Check - Full Page Layout", async () => {
            await eyes.check("Full Page", Target.window().fully().layout());
        });

        await eyes.close();
    });
});