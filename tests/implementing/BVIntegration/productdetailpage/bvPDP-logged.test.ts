import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { PDPPage } from "../../../../src/pages/delivery/pdp/pdp.page";
import { t, scrollToBottom, extractNumber, generateReadableTimeBasedId, delay, scrollToTop, lazyLoad, generateSentence, scrollDownUntilVisible } from "../../../../utils/helpers/helpers";
import { createHomePage } from "../../../../src/factories/home.factory";
import { createLuggagePage } from "../../../../src/factories/productlistingpage/luggage.factory";
import { tests } from "../../../../utils/helpers/localeTest";


test.describe("PDP is shown correctly - [Logged]", async () => {
    test.beforeEach(async ({ loggedInPage }) => {
        const homepage = createHomePage(loggedInPage)
        const luggagepage = createLuggagePage(loggedInPage)

        await step("Go to Luggage Page", async () => {
            await homepage.clickMenuItem('luggage', "Go to Luggage page")
        })

        await step("Click In-stock checkbox", async () => {
            if (await homepage.productTableShow.isVisible()) {
                await homepage.clickCheckbox(loggedInPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await lazyLoad(loggedInPage)
        await luggagepage.selectBvRatedProd()
    });

    test(`
        1. Rating star is shown exactly
        2. Review count is displayed
        3. Bazaarvoice logo is displayed
        4. Bazaarvoice trustmark is shown when clicking Bazaarvoice logo
        5. Close Bazaarvoice trustmark
        6. Rating stars groups is displayed
        7. Overall rating is shown correctly
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)

        // await pdppage.goto("https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html")

        await scrollToBottom(loggedInPage)

        let ratingPointValue = await pdppage.getDecimalRatingPoint()
        let numberOfReview = await pdppage.getNumberOfReview("Get number of reviews on PDP")

        await step('Verify the rating star and rating point value', async () => {
            await pdppage.assertRating(loggedInPage, ratingPointValue)
        })

        await step('Verify the review count is displayed', async () => {
            expect(numberOfReview).toBeGreaterThanOrEqual(1)
        })
        /*
        await step('Verify tha Bazaarvoice logo is displayed', async () => {
            await pdppage.assertVisible(pdppage.bazaarvoiceLogo)
        })

        await step('Clicking on Bazaarvoice logo', async () => {
            await pdppage.click(pdppage.bazaarvoiceLogo)
        })

        await step('Verify Bazaarvoice trustmark is shown', async () => {
            await pdppage.assertVisible(pdppage.bazaarvoiceTrustmark)
        })

        await step('Closing Bazaarvoice trustmark', async () => {
            await pdppage.click(pdppage.bazaarvoiceTrustmarkCloseButton,
                "Clicking on Close button"
            )
        })

        await step('Verify the bazaarvoice trustmark is hidden', async () => {
            await pdppage.assertHidden(pdppage.bazaarvoiceTrustmark)
        })*/

        await step('Verify the rating star group is displayed correctly', async () => {
            await pdppage.assertVisible(pdppage.ratingStarGroup,
                "Assert that rating star group is displayed"
            )

            await pdppage.assertRatingStarGroup(loggedInPage,
                "Assert rating star group contains 5 lines correctly"
            )
        })

        await step('Overall rating is show correctly', async () => {
            const overallPointNumber = extractNumber(await pdppage.overallPoint.innerText())
            const overallNumberofreview = extractNumber(await pdppage.overallNumberofReview.innerText())

            await pdppage.assertEqual(overallPointNumber, ratingPointValue,
                "Assert overall rating point"
            )

            await pdppage.assertEqual(overallNumberofreview, numberOfReview,
                "Assert overall number of review"
            )
        })
    })

    tests(["au", "hk", "sg", "th", "id", "in", "jp", "my", "nz", "ph", "tw"],`
        8. Write a review button is displayed
        9. BV review modal is displayed when clicking Write a review button
        10. User can select Overall rating stars
        11. Click on review guildelines
        12. Submit review without entering anything
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)
        const ovRatingStar1 = loggedInPage.locator(`div#bv-ips-star-rating-1`)
        const ovRatingStar2 = loggedInPage.locator(`div#bv-ips-star-rating-2`)
        const ovRatingStar3 = loggedInPage.locator(`div#bv-ips-star-rating-3`)
        const ovRatingStar4 = loggedInPage.locator(`div#bv-ips-star-rating-4`)
        const ovRatingStar5 = loggedInPage.locator(`div#bv-ips-star-rating-5`)

        //await pdppage.goto("https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html")

        await scrollToBottom(loggedInPage)

        await pdppage.assertVisible(pdppage.bvWriteReviewBtn,
            "Assert the Write A Reivew button is displayed"
        )

        await step("Clicking on Write A Reivew button", async () => {
            await pdppage.jsClick(pdppage.bvWriteReviewBtn)
        })

        await step('Assert the BV Review Modal is displayed', async () => {
            await pdppage.assertVisible(pdppage.bvReviewModal)
        })

        await step('User can select Overall Rating star', async () => {
            await pdppage.click(ovRatingStar1, "Clicking on 1st start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('1stmsg')}`,
                "1 out of 5 stars selected. Product is Poor.")

            await pdppage.click(ovRatingStar2, "Clicking on 2nd start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('2ndmsg')}`,
                "2 out of 5 stars selected. Product is Fair.")

            await pdppage.click(ovRatingStar3, "Clicking on 3rd start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('3rdmsg')}`,
                "3 out of 5 stars selected. Product is Average.")

            await pdppage.click(ovRatingStar4, "Clicking on 4th start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('4thmsg')}`,
                "4 out of 5 stars selected. Product is Good.")

            await pdppage.click(ovRatingStar5, "Clicking on 5th start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('5thmsg')}`,
                "5 out of 5 stars selected. Product is Excellent.")
        })

        await step('Clicking on Review Guidelines button', async () => {
            await pdppage.click(pdppage.bvReivewGuidelinesBtn)
        })

        await step('Verify the Guidelines popup is displayed', async () => {
            await pdppage.assertVisible(pdppage.bvGuidelinesPopup)
        })

        await step('Closing Guidelines popup', async () => {
            await pdppage.click(pdppage.bvGuidelinesPopupCloseBtn,
                "Clicking on close button"
            )

            await pdppage.assertHidden(pdppage.bvGuidelinesPopup,
                "Assert the Guidelines popup is hidden"
            )
        })

        await step('Clicking on submit button withou inputting anything', async () => {
            await pdppage.bvGuidelinesSubmitBtn.scrollIntoViewIfNeeded()
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn,
                "Clicking on submit button without inputting anything"
            )

            await pdppage.assertVisible(pdppage.bvReviewReq,
                "Error message: Required: Review."
            )

            await pdppage.assertVisible(pdppage.bvReviewTitleReq,
                "Error message: Required: Review Title."
            )

            await pdppage.assertVisible(pdppage.bvEmailReq,
                "Error message: Required: Nickname."
            )

            await pdppage.assertVisible(pdppage.bvEmailReq,
                "Error message: Required: Email."
            )
        })
    })

    tests(["au", "hk", "sg", "th", "id", "in", "jp", "my", "nz", "ph", "tw"],`
        13. Submit review after entering fully information
        14. User can add Images/Videos and completed Add Images/Videos step
        15. Completed the Personal/Product Information step
        16. Completed the Product Rating step
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)
        const starQuality = loggedInPage.locator(`div#bv-ips-star-Quality-5`)
        const starValue = loggedInPage.locator(`div#bv-ips-star-Value-5`)
        const starStyle = loggedInPage.locator(`div#bv-ips-star-Style-5`)
        const prosHighQuality = loggedInPage.locator(`//div[@id="2_Pros-HighQuality"]`)
        const dreamDesContent = `Dream destination revuew ${await generateReadableTimeBasedId()}`
        const dramDesTextbox = loggedInPage.locator(`//input[@id="3_DreamDestination"]`)

        //await pdppage.goto("https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html")

        await scrollToBottom(loggedInPage)

        await step("Clicking on Write A Reivew button", async () => {
            await pdppage.jsClick(pdppage.bvWriteReviewBtn)
        })

        await step('Fill review information to field', async () => {
            await pdppage.fillReviewForm()
        })

        await step('Clicking on submit button', async () => {
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn)
        })

        await step('Your Reviews step is completed', async () => {
            await pdppage.assertVisible(pdppage.step1completedLabel,
                "Assert that the Your reviews completed label is displayed"
            )

            await pdppage.assertVisible(pdppage.step1EditButton,
                "Assert that the Your reviews edit button is displayed"
            )
        })

        await step('Upload a image', async () => {
            await pdppage.uploadImages(loggedInPage, ["utils/data/images/sample.jpg"],
                "Uploading a image in to review section"
            )
        })

        await step('Upload a video', async () => {
            await pdppage.uploadVideos(loggedInPage, ["utils/data/images/video.mp4"],
                "Uploading a video in to review section"
            )
        })

        await step('Clicking on submit button', async () => {
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn)
        })

        await step('Add Images/Videos step is completed', async () => {
            await pdppage.assertVisible(pdppage.step2completedLabel,
                "Assert that the Add Images/Videos completed label is displayed"
            )

            await pdppage.assertVisible(pdppage.step2EditButton,
                "Assert that the Add Images/Videos edit button is displayed"
            )
        })

        /*
       await step('Enter value in located textbox', async () => {
           await pdppage.type(pdppage.locatedTextbox, "NY")
       })*/

        await step('Select pros on Personal/Product Information section', async () => {
            await pdppage.click(prosHighQuality, "Selecting High Quality pros")
        })

        await step('Clicking on submit button', async () => {
            await delay(1000)
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn)
        })

        await step('Personal/Product Information step is completed', async () => {
            await pdppage.assertVisible(pdppage.step3completedLabel,
                "Assert that the Personal/Product Information completed label is displayed"
            )

            await pdppage.assertVisible(pdppage.step3EditButton,
                "Assert that the Personal/Product Information edit button is displayed"
            )
        })

        /*
        await step('Selecting rating star on Product Rating section', async () => {
            await pdppage.click(starQuality, "Select Quality: 5 stars")
            await pdppage.click(starValue, "Select Value: 5 stars")
            await pdppage.click(starStyle, "Select Style: 5 stars")
        })*/

        await step('Entering dream destination content', async () => {
            await pdppage.type(dramDesTextbox, dreamDesContent,
                "Entering dream destination content"
            )
        })

        await step('Clicking on submit button', async () => {
            await delay(1000)
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn)
        })

        await step('Verify the review success modal is displayed', async () => {
            await pdppage.assertVisible(pdppage.reviewSuccessModal)
        })

        await step('Close success modal', async () => {
            await pdppage.click(pdppage.successModalCloseButton,
                "Clicking on close modal button"
            )
        })

        await step('Verify that the BV review modal is close', async () => {
            await pdppage.assertHidden(pdppage.bvReviewModal)
        })
    })

    test(`
        17. Customer Images and Videos section is displayed
        18. Average Customer Rating is shown
        19. Click view more reviews link to show more reviews
        20. Check next and prev review button
        21. User can sort review by Highest to Lowest rating or vice versa
        22. Searching topics and reviews
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)
        const nextReviewButton = loggedInPage.locator(`a.next`)
        const prevReviewButton = loggedInPage.locator(`a.prev`)
        const searchNATerm = await generateReadableTimeBasedId()

        //await pdppage.goto("https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html")

        await scrollToBottom(loggedInPage)

        const numberOfReview = await pdppage.getNumberOfReview("Get number of reviews on PDP")

        await step('Scroll to Customer Images And Videos section', async () => {
            await scrollToTop(loggedInPage)
            await scrollDownUntilVisible(loggedInPage, pdppage.imagesVideosSection)
        })

        await step('Assert Images and Videos are displayed correctly', async () => {
            await pdppage.assertMediaTabs(loggedInPage)
        })
        /*
        await step('Assert average customer rating shown', async () => {
            await pdppage.assertVisible(pdppage.averageCustomerRating)
        })*/

        await step('Clicking view more reviews link', async () => {
            await scrollToTop(loggedInPage)
            await pdppage.viewMoreReviewLink.scrollIntoViewIfNeeded()
            await pdppage.click(pdppage.viewMoreReviewLink)
        })

        await step('Assert review container is displayed', async () => {
            await pdppage.assertVisible(pdppage.reviewContainer)
        })

        await step(`Assert next and prev review button activities with ${numberOfReview} reviews`, async () => {
            if (numberOfReview > 8) {
                await step('Clicking on next review button', async () => {
                    await scrollToTop(loggedInPage)
                    await nextReviewButton.scrollIntoViewIfNeeded()
                    await pdppage.click(nextReviewButton)
                })

                await pdppage.assertVisible(prevReviewButton, 'Previous review button is displayed')
                await pdppage.assertHidden(nextReviewButton, 'Next review button is hidden')

                await step('Clicking on previous review button', async () => {
                    await scrollToTop(loggedInPage)
                    await prevReviewButton.scrollIntoViewIfNeeded()
                    await pdppage.click(prevReviewButton)
                })

                await pdppage.assertVisible(nextReviewButton, 'Next review button is displayed')
                await pdppage.assertHidden(prevReviewButton, 'Previous review button is hidden')

            } else test.skip(true, 'The number of reviews less than 8')
        })

        await step('Sort review by Lowest to Highest Rating', async () => {
            await scrollToTop(loggedInPage)
            await pdppage.sortReview("Lowest to Highest Rating")
        })

        await step('Assert that reviews are sorted by Lowest to Highest Rating', async () => {
            await pdppage.assertReivewSorted("asc")
        })

        await step('Sort review by Highest to Lowest Rating', async () => {
            await scrollToTop(loggedInPage)
            await pdppage.sortReview("Highest to Lowest Rating")
        })

        await step('Assert that reviews are sorted by Highest to Lowest Rating', async () => {
            await pdppage.assertReivewSorted("desc")
        })

        await step('Input terms to search review', async () => {
            await pdppage.type(pdppage.searchReviewTextbox, searchNATerm,
                "Searching review with wrong terms"
            )

            await delay(2000)

            await pdppage.assertHidden(pdppage.reviewItemRow,
                "Assert no review item row shown"
            )

            await pdppage.type(pdppage.searchReviewTextbox, "Review content",
                "Searching review with correct terms"
            )

            await delay(2000)

            expect(await pdppage.reviewItemRow.count()).toBeGreaterThan(0)
        })
    })

    tests(["au", "kr"], `
        23. Q&A section is displayed correctly
        24. Submit new question displayed when entering into question textbox
        25. Clear question textbox
        26. Clicking on Submit new question button
        27. Clicking Submit button without entering any information
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)
        const questionText = `Auto question ${await generateReadableTimeBasedId()}`
        const nickname = `Auto Nickname ${await generateSentence(5)}`
        const email = `autoemail${await generateReadableTimeBasedId()}@mailinator.com`
        const location = "NY"

        //await pdppage.goto("https://ssau.dev.samsonite-asia.com/upscape/spinner-55-exp/ss-143108-1041.html")

        await scrollToBottom(loggedInPage)
        await delay(1000)

        await pdppage.selectTab("Q&A", "Select Q&A tab")

        await step('Assert Q&A section is displayed correctly', async () => {
            await pdppage.assertVisible(pdppage.qaQuestionTextbox)
            await pdppage.assertVisible(pdppage.qaSortQuestionDropdown)
            expect(await pdppage.questionContainer.count()).toBeGreaterThan(0)
        })

        await step('Input question into question textbox', async () => {
            await pdppage.type(pdppage.qaQuestionTextbox, questionText)
        })

        await step('Assert Submit New Question button is displayed', async () => {
            await pdppage.assertVisible(pdppage.submitNewQuestionButton)
        })

        await step('Clear question textbox', async () => {
            await pdppage.click(pdppage.clearSearchQuestionButton,
                "Clicking on clear search question button"
            )
            expect(await pdppage.qaQuestionTextbox.inputValue()).toBe("")

            await pdppage.assertHidden(pdppage.submitNewQuestionButton,
                "Assert Submit New Question button is hidden"
            )
        })

        await step('Input question into question textbox', async () => {
            await pdppage.type(pdppage.qaQuestionTextbox, questionText)
        })

        await step('Clicking on Submit New Question button', async () => {
            await pdppage.click(pdppage.submitNewQuestionButton)
        })

        await step('Assert information form is displayed', async () => {
            await pdppage.assertVisible(pdppage.nicknameTextbox)
            await pdppage.assertVisible(pdppage.emailTextbox)
            await pdppage.assertVisible(pdppage.locationTextbox)
            await pdppage.assertVisible(pdppage.submitQuestionButton)
        })

        await step('Clicking on Submit button without entering any information', async () => {
            await pdppage.click(pdppage.submitQuestionButton)
        })

        await step('Assert required error messages are displayed', async () => {
            await delay(1000)

            await pdppage.assertVisible(pdppage.nicknameReqErrorMsg,
                "Assert Nickname required error message is displayed"
            )
            await pdppage.assertVisible(pdppage.emailReqErrorMsg,
                "Assert Email required error message is displayed"
            )
        })
    })

    tests(["au", "kr"], `
        28. Submit question after entering fully information
        29. Close question submitted success popup
        `, async ({ loggedInPage }) => {
        const pdppage = new PDPPage(loggedInPage)
        const questionText = `Auto question ${await generateReadableTimeBasedId()}`
        const nickname = `Auto Nickname ${await generateSentence(5)}`
        const email = `autoemail${await generateReadableTimeBasedId()}@mailinator.com`
        const location = "NY"

        //await pdppage.goto("https://ssau.dev.samsonite-asia.com/upscape/spinner-55-exp/ss-143108-1041.html")

        await scrollToBottom(loggedInPage)
        await delay(1000)

        await pdppage.selectTab("Q&A", "Select Q&A tab")

        await step('Input question into question textbox', async () => {
            await pdppage.typeIfVisible(pdppage.qaQuestionTextbox, questionText)
        })

        await step('Clicking on Submit New Question button', async () => {
            await pdppage.click(pdppage.submitNewQuestionButton)
        })

        await step('Input new question into question text area if visible', async () => {
            await pdppage.typeIfVisible(pdppage.qaQuestionTextArea, questionText)
        })

        await step('Fill information form', async () => {
            await pdppage.typeByManual(pdppage.nicknameTextbox, nickname)
            await pdppage.typeByManual(pdppage.emailTextbox, email)
            await pdppage.typeByManual(pdppage.locationTextbox, location)
        })

        await step('Clicking on Submit button', async () => {
            await delay(1000)
            await pdppage.click(pdppage.submitQuestionButton)
        })

        await step('Assert question submitted success popup is displayed', async () => {
            await pdppage.assertVisible(pdppage.submitQuestionSuccessPopup)
        })

        await step('Close question submitted success popup', async () => {
            await pdppage.click(pdppage.successPopupCloseButton,
                "Clicking on close button"
            )
        })

        await step('Assert question submitted success popup is closed', async () => {
            await pdppage.assertHidden(pdppage.submitQuestionSuccessPopup)
        })
    })
});