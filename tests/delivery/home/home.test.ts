import { test, expect } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createLuggagePage } from "../../../src/factories/productlistingpage/luggage.factory";
import { createBackpacksPage } from "../../../src/factories/productlistingpage/backpacks.factory";
import { createBagsPage } from "../../../src/factories/productlistingpage/bags.factory";
import { createBrandPage } from "../../../src/factories/productlistingpage/brand.factory";
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";
import { GinzaFlagshipStorePage } from "../../../src/pages/delivery/productlistingpage/ginzaflashipstore/ginzaflagshipstore.page";
import { SalePage } from "../../../src/pages/delivery/productlistingpage/sale/sale.page";
import { MembershipPage } from "../../../src/pages/delivery/home/membership.page";
import { scrollToBottom } from "../../../utils/helpers/helpers";
import { steps } from "../../../utils/helpers/localeStep";
import { createHomePage } from "../../../src/factories/home.factory"
import { createOffersPage } from "../../../src/factories/productlistingpage/offers.factory";
import { tests } from "../../../utils/helpers/localeTest"

test.describe("Home Tests", () => {
    test("1. Home page is displayed", async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);

        await step("Verify that the Home page is displayed", async () => {
            expect(await homePage.isHomepageDisplayed()).toBe(true);
        });
    });

    test(`
        2. Go to New Arrivals Page
        3. Go to Luggage Page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const newArrivalsPage = new NewArrivalsPage(basicAuthPage);
        const luggagepage = createLuggagePage(basicAuthPage);

        await step("Go to New Arrivals Page", async () => {
            await homePage.clickMenuItem("newarrivals");
        });

        await step("Verify that the New Arrivals page is displayed", async () => {
            expect(await newArrivalsPage.isNewArrivalspageDisplayed()).toBe(true);
        })

        await step("Go to Luggage Page", async () => {
            await homePage.clickMenuItem("luggage");
        });

        await step("Verify that the Luggage page is displayed", async () => {
            expect(await luggagepage.isLuggagePageDisplayed()).toBe(true);
        })

    });

    test(`
        4. Go to Back Packs Page
        5. Go to Bags Page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const backpacks = createBackpacksPage(basicAuthPage);
        const bags = createBagsPage(basicAuthPage);

        await step("Go to Back Packs Page", async () => {
            await homePage.clickMenuItem("backpacks");
        });

        await step("Verify that the Back Packs page is displayed", async () => {
            expect(await backpacks.isBackpacksPageDisplayed()).toBe(true);
        })

        await step("Go to Bags Page", async () => {
            await homePage.clickMenuItem("bags");
        });

        await step("Verify that the Bags page is displayed", async () => {
            expect(await bags.isBagsPageDisplayed()).toBe(true);
        })
    });

    test(`
        6. Go to Brand Page
        7. Go to Our Brand Story Page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const brandpage = createBrandPage(basicAuthPage);
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage);

        await steps(["jp", "ph", "sg", "tw"], "Go to Labels Page", async () => {
            await homePage.clickMenuItem("label");
        });

        await steps(["jp", "ph", "sg", "tw"], "Verify that the Labels page is displayed", async () => {
            expect(await brandpage.isBrandPageDisplayed()).toBe(true);
        })

        await step("Go to Discover Page", async () => {
            await homePage.clickMenuItem("discover");
        });

        await step("Verify that the Discover page is displayed", async () => {
            expect(await ourbrandstorypage.isOurBrandStoryPageDisplayed()).toBe(true);
        })
    });

    tests(["jp"],`
        8. Go to Ginza Flagship Store Page
        9. Go to Sale Page
        10. Go to membership page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const ginzaflagshipstorepage = new GinzaFlagshipStorePage(basicAuthPage);
        const Salepage = new SalePage(basicAuthPage);
        const membershippage = new MembershipPage(basicAuthPage);

        await step("Go to Ginza Flagship Store Page", async () => {
            await homePage.clickMenuItem("ginzaflagshipstore");
        });

        await step("Verify that the Ginza Flagship Store page is displayed", async () => {
            expect(await ginzaflagshipstorepage.isGinzaFlagshipStorePageDisplayed()).toBe(true);
        })

        if (process.env.LOCALE !== "jp" && process.env.ENV !== "dev") {
            await step("Go to Sale Page", async () => {
                await homePage.clickMenuItem("offers");
            });

            await step("Verify that the Sale page is displayed", async () => {
                expect(await Salepage.isSalePageDisplayed()).toBe(true);
            });

            await step("Go to membership page", async () => {
                await homePage.clickMenuItem("friendofsamsonite");
            });

            await step("Verify that the membership page is displayed", async () => {
                expect(await membershippage.isMembershipPageDisplayed()).toBe(true);
            });
        }
    });

    test(`11. Why Shop With Us section is displayed`, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Why Shop With Us section", async () => {
            await homePage.whyShopWithUsSection.scrollIntoViewIfNeeded();
        });

        await step(`Verify the Why Shop With Us title displayed`, async () => {
            await homePage.assertVisible(homePage.withUsTitle)
        })

        await step(`Verify that Why Shop With Us content exactly`, async () => {
            await homePage.assertWhyShopWithUsContent(basicAuthPage)
        })
    })

    tests(["sg", "tw"],`
        12. Go to Offers Page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const offerspage = createOffersPage(basicAuthPage)

        await step("Go to Labels Page", async () => {
            await homePage.clickMenuItem("offers");
        });

        await step("Verify that the Labels page is displayed", async () => {
            expect(await offerspage.isOffersPageDisplayed()).toBe(true);
        })
    });
});
