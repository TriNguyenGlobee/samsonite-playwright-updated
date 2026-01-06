import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { description, step } from "allure-js-commons";
import { delay, t, extractNumber, getDecimalRatingStar, generateSentence, generateReadableTimeBasedId, PageUtils, getReviewDecimalRatingStar, isSorted } from "../../../../utils/helpers/helpers";

export class PDPPage extends BasePage {
    readonly logoImg: Locator;
    readonly breadcrumbRow: Locator;
    readonly breadcrumbItem: Locator;
    readonly prodDetailImg: Locator;
    readonly prodInfor: Locator;
    readonly prodBrand: Locator;
    readonly prodCollecton: Locator;
    readonly prodName: Locator;
    readonly prodSticker: Locator;
    readonly prodStatus: Locator;
    readonly prodPrice: Locator;
    readonly addToCartButton: Locator;
    readonly buyNowButton: Locator;
    readonly prodDescriptionsDetail: Locator;
    readonly longDescription: Locator;
    readonly readMoreLessButton: Locator;
    readonly prodInforTabBar: Locator;
    readonly amazonePayButton: Locator;
    readonly wishlistIcon: Locator;
    readonly wishlistMsg: Locator;
    readonly viewWishListButton: Locator;
    readonly bazaarvoiceLogo: Locator;
    readonly bazaarvoiceTrustmark: Locator;
    readonly bazaarvoiceTrustmarkCloseButton: Locator;
    readonly ratingStarGroup: Locator;
    readonly overallPoint: Locator;
    readonly overallNumberofReview: Locator;
    readonly bvWriteReviewBtn: Locator
    readonly bvReviewModal: Locator
    readonly bvOverallRatingMSG: Locator
    readonly bvReivewGuidelinesBtn: Locator
    readonly bvGuidelinesPopup: Locator
    readonly bvGuidelinesPopupCloseBtn: Locator
    readonly bvGuidelinesSubmitBtn: Locator
    readonly bvReviewReq: Locator
    readonly bvReviewTitleReq: Locator
    readonly bvNicknameReq: Locator
    readonly bvEmailReq: Locator
    readonly reviewField: Locator
    readonly reviewTitleField: Locator
    readonly nicknameField: Locator
    readonly emailField: Locator
    readonly termCheckbox: Locator
    readonly step1completedLabel: Locator
    readonly step1EditButton: Locator
    readonly step2completedLabel: Locator
    readonly step2EditButton: Locator
    readonly locatedTextbox: Locator
    readonly step3completedLabel: Locator
    readonly step3EditButton: Locator
    readonly reviewSuccessModal: Locator
    readonly successModalCloseButton: Locator
    readonly imagesVideosSection: Locator
    readonly averageCustomerRating: Locator
    readonly viewMoreReviewLink: Locator
    readonly reviewContainer: Locator
    readonly reviewItemRow: Locator
    readonly searchReviewTextbox: Locator
    readonly rightBtn: Locator
    readonly leftBtn: Locator
    readonly qaQuestionTextbox: Locator;
    readonly qaQuestionTextArea: Locator;
    readonly qaSortQuestionDropdown: Locator;
    readonly questionContainer: Locator;
    readonly submitNewQuestionButton: Locator;
    readonly clearSearchQuestionButton: Locator;
    readonly submitQuestionButton: Locator;
    readonly nicknameTextbox: Locator;
    readonly emailTextbox: Locator;
    readonly locationTextbox: Locator;
    readonly nicknameReqErrorMsg: Locator;
    readonly emailReqErrorMsg: Locator;
    readonly submitQuestionSuccessPopup: Locator;
    readonly successPopupCloseButton: Locator;
    readonly noVideosAvalableMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.breadcrumbRow = page.locator(`//ol[contains(@class,"breadcrumb")]`)
        this.breadcrumbItem = this.breadcrumbRow.locator(`xpath=.//li[@class="breadcrumb-item"]`)
        this.prodDetailImg = page.locator(`//div[contains(@class,"product-detail-images")]`)
        this.prodInfor = page.locator(`//div[@id="product-informations"]`)
        this.prodBrand = this.prodInfor.locator(`xpath=.//div[@class="product-brand"]`)
        this.prodCollecton = this.prodInfor.locator(`xpath=.//h2[@class="product-collection"]`)
        this.prodName = this.prodInfor.locator(`xpath=.//h2[@class="product-name"]`)
        this.prodSticker = this.prodInfor.locator(`xpath=.//div[@class="product-sticker-wrapper"]`)
        this.prodStatus = this.prodInfor.locator(`xpath=.//ul[contains(@class,"availability-msg")]`)
        this.prodPrice = this.prodInfor.locator(`xpath=.//div[contains(@class,"product-detail-section")]//div[@class="price"]//span[@class="sales"]`)
        this.addToCartButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"add-to-cart")]`)
        this.buyNowButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"quick-checkout")]`)
        this.prodDescriptionsDetail = this.prodInfor.locator(`xpath=.//div[@class="description-and-detail"]`)
        this.longDescription = this.prodInfor.locator(`xpath=.//div[@class="value content show"]`)
        this.readMoreLessButton = this.prodDescriptionsDetail.locator(`xpath=.//div[contains(@class,"product-description-readmore")]`)
        this.prodInforTabBar = this.prodInfor.locator(`xpath=.//div[@id="product-information-tabs"]`)
        this.amazonePayButton = page.locator(`//div[@id="product-informations"]`).locator('div.amazonpay-button-view1');
        this.wishlistIcon = this.prodInfor.locator(`xpath=.//i[contains(@class,"fa fa-heart")]`)
        this.wishlistMsg = page.locator(`//div[@class="wishlist-message"]//p`)
        this.viewWishListButton = page.locator(`//div[@class="wishlist-message"]//a[text()="${t.PDP('viewwishlistbtn')}"]`)
        this.bazaarvoiceLogo = page.locator(`#bv_review_maincontainer button img`)
        this.bazaarvoiceTrustmark = page.locator(`#bv_review_maincontainer div#bv-popup-47`)
        this.bazaarvoiceTrustmarkCloseButton = page.locator(`#bv_review_maincontainer div#bv-popup-47 button svg`)
        this.ratingStarGroup = page.locator(`section.bv-rnr__rpifwc-0.kZapjS div.table`)
        this.overallPoint = page.locator(`section#bv-reviews-overall-ratings-container div.bv-rnr__sc-157rd1w-1.ljrlPW`)
        this.overallNumberofReview = page.locator(`div.bv-rnr__sc-157rd1w-2.krTpQg`)
        this.bvWriteReviewBtn = page.locator(`//button[normalize-space(text())="${t.bvintegration('writeareview')}"]`)
        this.bvReviewModal = page.locator(`div.bv-ips-modal-window`)
        this.bvOverallRatingMSG = page.locator(`label#bv-label-text-undefined`)
        this.bvReivewGuidelinesBtn = page.locator(`//button[text()="${t.bvintegration('reviewguidelines')}"]`)
        this.bvGuidelinesPopup = page.locator(`div[type="popup"] div.bv-ips-modal-window`)
        this.bvGuidelinesPopupCloseBtn = page.locator(`div[type="popup"] div.bv-ips-modal-window button#bv-ips-undefined`)
        this.bvGuidelinesSubmitBtn = page.locator(`button#bv-ips-submit`)
        this.bvReviewReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('reviewreq')}"]`)
        this.bvReviewTitleReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('reviewtitlereq')}"]`)
        this.bvNicknameReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('nicknamereq')}"]`)
        this.bvEmailReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('emailreq')}"]`)
        this.reviewField = page.locator(`//textarea[@name="${t.bvintegration('reviewfield')}"]`)
        this.reviewTitleField = page.locator(`//input[@name="${t.bvintegration('reviewtitle')}"]`)
        this.nicknameField = page.locator(`//input[@name="${t.bvintegration('nickname')}"]`)
        this.emailField = page.locator(`//input[@name="${t.bvintegration('email')}"]`)
        this.termCheckbox = page.locator(`div#sps-termsAndConditions-styledcheckbox`)
        this.step1completedLabel = page.locator(`fieldset#bv-ips-step-0 span[color="#296300"]`)
        this.step1EditButton = page.locator(`fieldset#bv-ips-step-0 button`)
        this.step2completedLabel = page.locator(`fieldset#bv-ips-step-1 span[color="#296300"]`)
        this.step2EditButton = page.locator(`fieldset#bv-ips-step-1 button`)
        this.locatedTextbox = page.locator(`fieldset#bv-ips-step-2 input`)
        this.step3completedLabel = page.locator(`fieldset#bv-ips-step-2 span[color="#296300"]`)
        this.step3EditButton = page.locator(`fieldset#bv-ips-step-2 button`)
        this.reviewSuccessModal = page.locator(`div[type="success"]`)
        this.successModalCloseButton = this.reviewSuccessModal.locator(`button`)
        this.imagesVideosSection = page.locator(`bv-tab-summary`)
        this.averageCustomerRating = page.locator(`//div[h3[normalize-space(text())="Average Customer Ratings"]]`)
        this.viewMoreReviewLink = page.locator(`//a[normalize-space(text())="${t.bvintegration('moreviews')}"]`)
        this.reviewContainer = page.locator(`section#reviews_container`)
        this.reviewItemRow = page.locator(`section#reviews_container section`)
        this.searchReviewTextbox = page.locator(`input#search-input`)
        this.rightBtn = page.locator(`button.right`)
        this.leftBtn = page.locator(`button.left`)
        this.qaQuestionTextbox = page.locator(`//input[@id="${t.bvintegration('qatextbox')}"]`);
        this.qaQuestionTextArea = page.locator(`//textarea[contains(@id,"bv-questions")]`);
        this.qaSortQuestionDropdown = page.locator(`span#bv-dropdown-select-sort`);
        this.questionContainer = page.locator(`//div[contains(@id,"bv-question-container")]`)
        this.submitNewQuestionButton = page.locator(`button#bv-question-btn`);
        this.clearSearchQuestionButton = page.locator(`//button[@aria-label="${t.bvintegration('clearsearch')}"]`);
        this.submitQuestionButton = page.locator(`//div[@class="bv-questions"]//button[normalize-space(text())="${t.bvintegration('submitbutton')}"]`)
        this.nicknameTextbox = page.locator(`//input[@name="usernickname"]`);
        this.emailTextbox = page.locator(`//div[@class="bv-questions"]//input[@type="email"]`);
        this.locationTextbox = page.locator(`//input[@name="userlocation"]`);
        this.nicknameReqErrorMsg = page.locator(`//label[contains(text(),"${t.bvintegration('nicknamereq')}")]`)
        this.emailReqErrorMsg = page.locator(`//label[contains(text(),"${t.bvintegration('emailreq')}")]`)
        this.submitQuestionSuccessPopup = page.locator(`//label[contains(text(),"${t.bvintegration('qasubmitsuccessmsg')}")]/ancestor::div[@type="popup"]`);
        this.successPopupCloseButton = this.submitQuestionSuccessPopup.locator(`xpath=.//button[normalize-space(text())="${t.bvintegration('submitsuccessclosepopup')}"]`);
        this.noVideosAvalableMsg = page.locator(`//div[normalize-space(text())="${t.bvintegration('novidesmsg')}"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillReviewForm(data?: {
        review?: string;
        reviewTitle?: string;
        nickname?: string;
        email?: string;
        //sweepstakes?: boolean;
        term?: boolean;
    }) {
        const review = data?.review ?? `Review content ${generateSentence(100)}`;
        const reviewTitle = data?.reviewTitle ?? `Title ${generateSentence(15)}`;
        const nickname = data?.nickname ?? `User${generateReadableTimeBasedId()}`;
        const email = data?.email ?? `auto_${generateReadableTimeBasedId()}@yopmail.com`;
        //const sweepstakes = data?.sweepstakes ?? false;
        const term = data?.term ?? true;

        //const sweepstakesYesButton = this.page.locator(`//div[@id="0_IncentivizedReview-True"]`)
        //const sweepstakesNoButton = this.page.locator(`//div[@id="0_IncentivizedReview-False"]`)

        await this.reviewField.fill(review);
        await this.reviewTitleField.fill(reviewTitle);
        await this.nicknameField.fill(nickname);
        await this.emailField.fill(email);
        await delay(1000)
        /*
        if (sweepstakes) {
            await this.hover(sweepstakesYesButton)
            await delay(1000)
            await this.click(sweepstakesYesButton,
                "Clicking Yes button on sweepstakes section")
            await delay(1000)
        } else {
            await this.hover(sweepstakesNoButton)
            await delay(1000)
            await this.click(sweepstakesNoButton,
                "Clicking No button on sweepstakes section")
            await delay(1000)
        }*/
        if (
            term &&
            ['au', 'hk', "th", "tw", "sg", "ph", "nz", "my", "jp", "in", "id"].includes(process.env.LOCALE ?? '')
        ) {
            await this.termCheckbox.click();
        }

        await delay(1000)
    }

    // Upload images for review
    async uploadImages(page: Page, filePaths: string[], description?: string) {
        await step(description || "Upload image for reviewing", async () => {
            const input = page.locator('#bv-ips-photo-upload-input');
            //await input.waitFor();
            await input.setInputFiles(filePaths);
            await PageUtils.waitForDomAvailable(page)
        })
    }

    // Upload videos for review
    async uploadVideos(page: Page, filePaths: string[], description?: string) {
        await step(description || "Upload video for reviewing", async () => {
            const input = page.locator('#bv-ips-uploadVideo-input');
            //await input.waitFor();
            await input.setInputFiles(filePaths);
            const lastVideoIndex = filePaths.length - 1;
            await page.locator('video').nth(lastVideoIndex).waitFor({ state: 'visible' });
        })
    }

    async selectTab(tabName: string, description?: string) {
        await step(description || `Select tab: ${tabName}`, async () => {
            const tabLocator = this.page.getByRole('tab', { name: tabName });
            await tabLocator.click();
            await PageUtils.waitForDomAvailable(this.page);
        })
    }

    /**
     * Select sort by value to sort review
     * @param option 
     * @param description 
     */
    async sortReview(option: string, description?: string) {
        await step(description || `Sort review by: ${option}`, async () => {
            const sortByDropdown = this.page.locator(`//span[normalize-space(text())="${t.bvintegration('sortby')}"]/parent::div`)
            const optionRow = this.page.locator(`//ul[contains(@id,"bv-reviews-sort-by")]//li[span[div[normalize-space(text())="${option}"]]]`)

            await sortByDropdown.scrollIntoViewIfNeeded()

            await this.hover(sortByDropdown.first())
            await this.waitFor(optionRow)
            await this.click(optionRow)

            await PageUtils.waitForDomAvailable(this.page)
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isPDPPageDisplayed(): Promise<boolean> {
        try {
            const elementsToCheck = [
                this.prodDetailImg,
                this.prodInfor,
                this.prodBrand.first(),
                this.prodCollecton,
                this.prodName,
                this.prodSticker,
                this.prodStatus,
                this.prodPrice
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Error checking PDP page:', error);
            return false;
        }
    }

    async getPromotionMessage(description?: string): Promise<string | null> {
        return await step(description || "Get promotion message", async () => {
            const productMsg = this.prodInfor.locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`)
            if (await productMsg.count() > 0) {
                return (await this.getText(productMsg.first(), `Get Promotion Msg of Product`))?.trim() ?? null
            } else return null
        });
    }

    async getDecimalRatingPoint(description?: string): Promise<number> {
        return await step(description || "Get decimal rating point", async () => {
            const decimalRatingPoint = this.page.locator(`//div[@class="bv-inline-rating"]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text"]`)
            const ratingPoint = extractNumber(await decimalRatingPoint.first().innerText())
            return ratingPoint
        })
    }

    async getNumberOfReview(description?: string): Promise<number> {
        return await step(description || "Get the number of review", async () => {
            const ratingCount = this.page.locator(`//div[@class="bv-inline-rating"]//div[@class="bv_numReviews_component_container"]//div[@class="bv_text"]`)
            const numberOfReview = extractNumber(await ratingCount.first().innerText())
            return numberOfReview
        })
    }

    async clickThroughSlides(page: Page) {
        while (await this.rightBtn.isVisible().catch(() => false)) {
            await this.rightBtn.click();
            await page.waitForTimeout(200);
        }

        while (await this.leftBtn.isVisible().catch(() => false)) {
            await this.leftBtn.click();
            await page.waitForTimeout(200);
        }
        console.log("Done clicking right → left");
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertInformationTabs(page: Page, description?: string) {
        const tabBar = page.locator('//div[@id="product-information-tabs"]');
        const tabs = tabBar.locator('xpath=.//button[contains(@class,"nav-link")]');
        const tabCount = await tabs.count();

        for (let i = 1; i < tabCount; i++) {
            await step(`Assert the tab ${i + 1}`, async () => {
                const tab = tabs.nth(i);

                await tab.click();
                await expect(tab).toHaveClass(/active/, { timeout: 3000 });

                await delay(200);
            });
        }

        if (tabCount > 1) {
            await step("Assert the first tab again", async () => {
                const firstTab = tabs.first();

                if (await firstTab.isVisible() == true) {
                    await firstTab.click();
                    await expect(firstTab).toHaveClass(/active/, { timeout: 3000 });

                    await delay(200);
                }
            });
        }
    }

    /**
     * Assert rating star equal rating point
     * Allowable error ~0.1
     */
    async assertRating(page: Page, expectedRating: number, description?: string) {
        await step(description || `Assert rating star to be: ${expectedRating}`, async () => {
            const actualRating = await getDecimalRatingStar(page);

            const tolerance = 0.1;
            const min = expectedRating - tolerance;
            const max = expectedRating + tolerance;

            expect(actualRating).toBeGreaterThanOrEqual(min);
            expect(actualRating).toBeLessThanOrEqual(max);

            console.log(`Expected: ${expectedRating}, Actual: ${actualRating}`);
        })
    }

    async assertRatingStarGroup(page: Page, description?: string) {
        await step(description || "Assert rating group displayed correctly", async () => {
            const lineElement = page.locator(`//section[@class="bv-rnr__rpifwc-0 kZapjS"]//div[@class="table"]//div[@role="button"]//p//span[@aria-hidden="true"]`)

            const fiveStarLabel = `${t.bvintegration('fiveStarLabel')}`
            const fourStarLabel = `${t.bvintegration('fourStarLabel')}`
            const threeStarLabel = `${t.bvintegration('threeStarLabel')}`
            const twoStarLabel = `${t.bvintegration('twoStarLabel')}`
            const oneStarLabel = `${t.bvintegration('oneStarLabel')}`

            expect(await lineElement.count()).toBe(5)

            expect(await lineElement.nth(0).innerText()).toEqual(fiveStarLabel)
            expect(await lineElement.nth(1).innerText()).toEqual(fourStarLabel)
            expect(await lineElement.nth(2).innerText()).toEqual(threeStarLabel)
            expect(await lineElement.nth(3).innerText()).toEqual(twoStarLabel)
            expect(await lineElement.nth(4).innerText()).toEqual(oneStarLabel)
        })
    }

    /**
    * Assert media when clicking tab All - Images - Videos
    */
    async assertMediaTabs(page: Page) {
        await step('Assert that Videos and Images are displayed when clicking specified tab correctly', async () => {
            const tabAll = page.getByRole('tab', { name: 'All' });
            const tabImages = page.getByRole('tab', { name: `${t.bvintegration('images')}` });
            const tabVideos = page.getByRole('tab', { name: `${t.bvintegration('videos')}` });

            const mediaItems = page.locator("ul.bv-rnr__sc-11cxkec-4 > li");

            const isVideo = async (el: Locator) => {
                return await el.locator("svg").isVisible().catch(() => false);
            };

            const isImage = async (el: Locator) => {
                return await el.locator("img").isVisible();
            };

            // Assert all tabs
            await this.jsClick(tabAll)
            await PageUtils.waitForDomAvailable(page);
            await this.clickThroughSlides(page)

            let count = await mediaItems.count();
            expect(count).toBeGreaterThan(0);
            await delay(1000)

            let photos = 0, videos = 0;
            for (let i = 0; i < count; i++) {
                console.log(`Checking item ${i}`)
                await delay(500)

                if (!await isImage(mediaItems.nth(i))) {
                    await this.rightBtn.click();
                    await page.waitForTimeout(200)
                }

                const item = mediaItems.nth(i);
                if (await isVideo(item)) videos++;
                else if (await isImage(item)) photos++;

                await delay(500)
            }

            expect(photos + videos).toBe(count);

            await delay(1000)

            // Assert images tab
            if (photos > 0) {
                await this.jsClick(tabImages)
                await delay(1000)
                await PageUtils.waitForDomAvailable(page);
                await this.clickThroughSlides(page)
                await delay(1000)

                count = await mediaItems.count();
                expect(count).toBeGreaterThan(0);

                for (let i = 0; i < count; i++) {
                    console.log(`Checking item ${i}`)
                    await delay(500)

                    if (!await isImage(mediaItems.nth(i))) {
                        await this.rightBtn.click();
                        await page.waitForTimeout(200)
                    }

                    await delay(1000)

                    const item = mediaItems.nth(i);
                    expect(await isVideo(item)).toBeFalsy();
                    expect(await isImage(item)).toBeTruthy();
                }
            } else {
                await tabImages.click();
                await delay(1000)
                await PageUtils.waitForDomAvailable(page);
                count = await mediaItems.count();
                expect(count).toBe(0);
                console.log("No images to assert in Images tab")
            }

            await delay(500)

            // Assert videos tab
            if (videos > 0) {
                await this.jsClick(tabVideos)
                await delay(500)
                await PageUtils.waitForDomAvailable(page);
                await this.clickThroughSlides(page)
                await delay(1000)

                count = await mediaItems.count();
                expect(count).toBeGreaterThan(0);

                for (let i = 0; i < count; i++) {
                    console.log(`Checking item ${i}`)
                    await delay(500)

                    if (!await isImage(mediaItems.nth(i))) {
                        await this.rightBtn.click();
                        await page.waitForTimeout(200)
                    }

                    await delay(1000)

                    const item = mediaItems.nth(i);
                    expect(await isImage(item)).toBeTruthy();
                    expect(await isVideo(item)).toBeTruthy();
                }
            } else {
                await tabVideos.click();
                await delay(1000)
                await PageUtils.waitForDomAvailable(page);
                await this.assertVisible(this.noVideosAvalableMsg, `No Videos available message is displayed`)
            }
        })
    }

    async assertReivewSorted(order: "asc" | "desc" = "asc", description?: string) {
        await step(description || `Assert reviews are sorted: ${order}`, async () => {
            const decimalPointArr: number[] = []

            for (let index = 1; index < 9; index++) {
                let currentRatingStar = await getReviewDecimalRatingStar(this.page, index)
                decimalPointArr.push(currentRatingStar)
            }

            console.log(`Review point array: ${decimalPointArr.toString()}`)
            expect(isSorted(decimalPointArr, order)).toBe(true)
        })
    }
}
