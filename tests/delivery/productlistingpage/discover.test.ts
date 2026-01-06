import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { PageUtils, t } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";

test.describe("Discover/Our Brand Story Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('discover', "Go to Discover page")
    })

    test(`
        1. Assert that the Discover/Our Brand Story page is displayed
        `, async ({ basicAuthPage }) => {
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)
        const expectedURL = t.ourbrandstorypage('url')

        await step("Verity Discover/Our Brand Story page URL", async () => {
            await ourbrandstorypage.assertUrl(expectedURL.toString(), "Assert Discover/Our Brand Story page URL")
        })
    })
});

test.describe("Discover sub-categories", async () => {
    tests(["jp", "ph", "sg", "tw", "id"], `
        1. Go to Fathers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Father day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('fathersday')}`,
                "Discover -> Latest -> Father's day gifts"
            )
        })

        await step("Verity Father day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/fathers-day-gifts/, "Assert Father day gifts URL")
        })
    })

    tests(["sg", "tw", "ph", "my", "nz"], `
        2. Go to Mothers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Mothers day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('mothersday')}`,
                "Discover -> Latest -> Mother's day gifts"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/mothers-day-gifts/, "Assert Mothers day gifts URL")
        })
    })

    tests(["sg", "tw", "ph"], `
        3. Go to Wedding and honeymoon page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Wedding and honeymoon type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('weddingandhoneymoon')}`,
                "Discover -> Latest -> Wedding and honeymoon"
            )
        })

        await step("Verity Wedding and honeymoon URL", async () => {
            await ourbrandstorypage.assertUrl(/wedding-and-honeymoon/, "Assert Wedding and honeymoon URL")
        })
    })

    tests(["sg", "tw", "ph", "my"], `
        4. Go to Your Business Look page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Your Business Look type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('yourbusinesslook')}`,
                "Discover -> Latest -> Your Business Look"
            )
        })

        await step("Verity Your Business Look URL", async () => {
            await ourbrandstorypage.assertUrl(/your-business-look/, "Assert Your Business Look URL")
        })
    })

    tests(["sg", "ph", "my", "nz"], `
        5. Go to Your Backpack Look page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Your Backpack Look type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('yourbackpacklook')}`,
                "Discover -> Latest -> Your Backpack Look"
            )
        })

        await step("Verity Your Backpack Look URL", async () => {
            await ourbrandstorypage.assertUrl(/your-backpack-look/, "Assert Your Backpack Look URL")
        })
    })

    tests(["sg", "ph", "my"], `
        6. Go to Lavish Travels page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Lavish Travels type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('lavishtravels')}`,
                "Discover -> Latest -> Lavish Travels"
            )
        })

        await step("Verity Lavish Travels URL", async () => {
            await ourbrandstorypage.assertUrl(/lavish-travels/, "Assert Lavish Travels URL")
        })
    })

    tests(["sg", "jp", "au", "nz"], `
        7. Go to The Art of Packing page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to The Art of Packing type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('theartofpacking')}`,
                "Discover -> Latest -> The Art of Packing"
            )
        })

        await step("Verity The Art of Packing URL", async () => {
            await ourbrandstorypage.assertUrl(/(art-of-packing|packing)/, "Assert The Art of Packing URL")
        })
    })

    tests(["sg"], `
        8. Go to The Best Bags for every Travel Need page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to The Best Bags for every Travel Need type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('thebestbagsforeverytravelneed')}`,
                "Discover -> Latest -> The Best Bags for every Travel Need"
            )
        })

        await step("Verity The Best Bags for every Travel Need URL", async () => {
            await ourbrandstorypage.assertUrl(/best-bags/, "Assert The Best Bags for every Travel Need URL")
        })
    })

    tests(["jp", "sg", "tw", "ph", "au", "my", "id", "nz"], `
        9. Go to Beyond The Design page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await steps(["jp"], "Go to Beyond The Design type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('goingbeyonddesign')}`,
                "Discover -> Latest -> Going Beyond Design"
            )
        })

        await steps(["sg", "tw", "au", "my", "id", "nz"], "Go to Beyond The Design type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('goingbeyonddesign')}`,
                "Discover -> About -> Going Beyond Design"
            )
        })

        await step("Verity Going Beyond Design URL", async () => {
            await ourbrandstorypage.assertUrl(/going-beyond-design|2025-going-beyond-design/, "Assert Going Beyond Design URL")
        })
    })

    tests(["jp", "sg", "tw", "ph", "au", "my", "id", "nz"], `
        10. Go to Beyond The Average Test page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await steps(["jp"], "Go to Beyond The Average Test type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('goingbeyondtesting')}`,
                "Discover -> Latest -> Going Beyond Testing"
            )
        })

        await steps(["sg", "tw", "ph", "au", "my", "id", "nz"], "Go to Beyond The Average Test type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('goingbeyondtesting')}`,
                "Discover -> About -> Going Beyond Testing"
            )
        })

        await step("Verity Going Beyond Testing URL", async () => {
            await ourbrandstorypage.assertUrl(/going-beyond-testing|2025-going-beyond-testing/, "Assert Going Beyond Testing URL")
        })
    })

    tests(["jp"], `
        11. Go to VS series page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to VS series type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('vsseries')}`,
                "Discover -> Latest -> VS Series"
            )
        })

        await step("Verity VS Series URL", async () => {
            await ourbrandstorypage.assertUrl(/vs-series/, "Assert VS Series URL")
        })
    })

    tests(["jp"], `
        12. Go to first suitcase page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to first suitcase type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('firstsuitcase')}`,
                "Discover -> Latest -> First Suitcase"
            )
        })

        await step("Verity First Suitcase URL", async () => {
            await ourbrandstorypage.assertUrl(/first_suitcase/, "Assert First Suitcase URL")
        })
    })

    tests(["jp"], `
        13. Go to business bags page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to business bags type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('businessbags')}`,
                "Discover -> Latest -> Business Bags"
            )
        })

        await step("Verity Business Bags URL", async () => {
            await ourbrandstorypage.assertUrl(/business-bags/, "Assert Business Bags URL")
        })
    })

    tests(["jp"], `
        14. Go to unpack your world page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to unpack your world type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('unpackyourworld')}`,
                "Discover -> Latest -> Unpack Your World"
            )
        })

        await step("Verity Unpack Your World URL", async () => {
            await ourbrandstorypage.assertUrl(/unpack-your-world/, "Assert Unpack Your World URL")
        })
    })

    test(`
        15. Go to Our Responsible Journey page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Our Responsible Journey type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('ourresponsiblejourney')}`,
                "Discover -> About -> Our Responsible Journey"
            )
        })

        await step("Verity Our Responsible Journey URL", async () => {
            await ourbrandstorypage.assertUrl(/sustainability/, "Assert Our Responsible Journey URL")
        })
    })

    tests(["sg", "jp", "tw", "my", "id"], `
        16. Go to Brand story page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Brand story type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('ourbrandstory')}`,
                "Discover -> About -> Our Brand Story"
            )
        })

        await step("Verity Our Brand Story URL", async () => {
            await ourbrandstorypage.assertUrl(/brand-story/, "Assert Our Brand Story URL")
        })
    })

    tests(["sg", "my"], `
        17. Go to Friends of Samsonite page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Friends of Samsonite type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('friendsofsamsonite')}`,
                "Discover -> About -> Friends of Samsonite"
            )
        })

        await step("Verity Friends of Samsonite URL", async () => {
            await ourbrandstorypage.assertUrl(/friends-of-samsonite/, "Assert Friends of Samsonite URL")
        })
    })

    tests(["sg", "tw", "ph", "my", "id"], `
        18. Go to Browse Our Collections page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Browse Our Collections type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('discover-collection')}->${t.lv2MenuItem('browseourcollections')}`,
                "Discover -> About -> Browse Our Collections"
            )
        })

        await step("Verity Browse Our Collections URL", async () => {
            await ourbrandstorypage.assertUrl(/collection/, "Assert Browse Our Collections URL")
        })
    })

    tests(["jp"], `
        19. Go to About Hartmann page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to About Hartmann type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('about-hartmann')}`,
                "Discover -> About -> About Hartmann"
            )
        })

        await step("Verity About Hartmann URL", async () => {
            await ourbrandstorypage.assertUrl(/about-hartmann/, "Assert About Hartmann URL")
        })
    })

    tests(["tw", "id"], `
        20. Go to Family-Friendly Travels page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Family-Friendly Travels type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('familyfriendlytravels')}`,
                "Discover -> Latest -> Family-Friendly Travels"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/family-friendly-travels/, "Assert Family-Friendly Travels URL")
        })
    })

    tests(["tw", "ph"], `
        21. Go to Travel Hard, Travel Smart page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Travel Hard, Travel Smart type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('travelhardtravelsmart')}`,
                "Discover -> Latest -> Travel Hard, Travel Smart"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/travel-hard-travel-smart/, "Assert Travel Hard, Travel Smart URL")
        })
    })

    tests(["sg", "tw", "au", "id"], `
        22. Go to Discover All page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Discover All type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('discoverall')}`,
                "Discover -> Latest -> Discover All"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/discover-all|en_ID\/Discover-Show/, "Assert Discover All URL")
        })
    })

    tests(["nz"], `
        23. Go to Oc2lite page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Oc2lite type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('Oc2lite')}`,
                "Discover -> Latest -> Oc2lite"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/oc2lite-collection/, "Assert Oc2lite URL")
        })
    })

    tests(["au"], `
        24. Go to Paralux page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Paralux type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('paralux')}`,
                "Discover -> Latest -> Paralux"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/paralux/, "Assert Paralux URL")
        })
    })

    tests(["au", "nz"], `
        25. Go to Samsonite VS Series page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Samsonite VS Series type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('samsonitevsseries')}`,
                "Discover -> Latest -> Samsonite VS Series"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/vs-series/, "Assert Samsonite VS Series URL")
        })
    })

    tests(["au", "nz"], `
        26. Go to Gift Guide page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Gift Guide type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('giftguide')}`,
                "Discover -> Latest -> Gift Guide"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/gift-guid/, "Assert Gift Guide URL")
        })
    })

    tests(["au"], `
        27. Go to C-Lite x VEXX page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to C-Lite x VEXX type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('clitexvexx')}`,
                "Discover -> Latest -> C-Lite x VEXX"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/c-lite-vexx/, "Assert C-Lite x VEXX URL")
        })
    })

    tests(["au", "nz"], `
        28. Go to Dad’s who Travel page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Dad’s who Travel type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('dadswhotravel')}`,
                "Discover -> Latest -> Dad’s who Travel"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/fathers-day-gifts.html/, "Assert Dad’s who Travel URL")
        })
    })

    tests(["au", "nz"], `
        29. Go to 5 Essential Tips For Travelling Queenstown page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to 5 Essential Tips For Travelling Queenstown type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('5essentialtipsfortravellingqueenstown')}`,
                "Discover -> Latest -> 5 Essential Tips For Travelling Queenstown"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/5-essential-tips-for-travelling-queenstown.html/, "Assert 5 Essential Tips For Travelling Queenstown URL")
        })
    })

    tests(["au"], `
        30. Go to Essential Accessories page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Essential Accessories type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('essentialaccessories')}`,
                "Discover -> Latest -> Essential Accessories"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/accessories-you-never-knew-you-needed.html/, "Assert Essential Accessories URL")
        })
    })

    tests(["au", "nz"], `
        31. Go to Choosing the Right Luggage page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Choosing the Right Luggage type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('choosingtherightluggage')}`,
                "Discover -> Latest -> Choosing the Right Luggage"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/choosing-the-right-luggage.html/, "Assert Choosing the Right Luggage URL")
        })
    })

    tests(["au"], `
        32. Go to Backpack Styles page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Backpack Styles type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('backpackstyles')}`,
                "Discover -> Latest -> Backpack Styles"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/your-backpack-look.html/, "Assert Backpack Styles URL")
        })
    })

    tests(["au"], `
        33. Go to Family Friendly Travels page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Family Friendly Travels type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('discover-familyfriendlytravels')}`,
                "Discover -> Latest -> Family Friendly Travels"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/family-friendly-travels.html/, "Assert Family Friendly Travels URL")
        })
    })

    tests(["au", "nz"], `
        34. Go to Personalisation page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Personalisation type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('personalisation')}`,
                "Discover -> Latest -> Personalisation"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/personalisation/, "Assert Personalisation URL")
        })
    })

    tests(["au", "nz"], `
        35. Go to Proxis Space Launch page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Proxis Space Launch type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('proxisspacelaunch')}`,
                "Discover -> Latest -> Proxis Space Launch"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/samsonite-space-launch/, "Assert Proxis Space Launch URL")
        })
    })

    tests(["au", "nz"], `
        36. Go to One Tree Planted page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to One Tree Planted type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('onetreeplanted')}`,
                "Discover -> Latest -> One Tree Planted"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/one-tree-planted/, "Assert One Tree Planted URL")
        })
    })
})