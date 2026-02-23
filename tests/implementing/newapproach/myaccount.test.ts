import { test, expect } from "../../../src/fixtures/test-fixture"
import { createHomePage } from "../../../src/factories/home.factory";
import { openNewTab, screenshotAndAttach, getLocalPhone, randomAlphaString, lazyLoad, t, PageUtils, delay } from "../../../utils/helpers/helpers";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { MyorderPage } from "../../../src/pages/implementing/mypage/myorder.page";
import { MyMembershipPage } from "../../../src/pages/implementing/mypage/mymembership.page";
import { MyAddressBookPage } from "../../../src/pages/implementing/mypage/myaddressbook.page";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { MyCouponsPage } from "../../../src/pages/implementing/mypage/mycoupons.page";
import { WishlistPage } from "../../../src/pages/delivery/pdp/wishlist.page";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";

test.describe("My Account-My Orders", () => {
    test(`
        1. Verify that order page is displayed with full elements
        2. Order detail page is displayed correctly when clicking on order item
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const myOrdersPage = new MyorderPage(loggedInPage);

            await step("Verify - 1. My Page is displayed - Your detail form shows correctly", async () => {
                expect(await myAccountPage.isMyPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '01 - My Page');
            })

            await step("[STEP] Click on My Orders link", async () => {
                await myAccountPage.click(myAccountPage.myOrdersLink);
                await loggedInPage.waitForURL(/orders/, { waitUntil: 'networkidle' })
            });

            await step("[STEP] Verify - 2. Verify that order page is displayed with full elements", async () => {
                expect(await myOrdersPage.isMyOrderPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '02 - My Orders Page');
            })

            if (process.env.ENV === 'stg') {
                await step("[STEP] Click on an Order item", async () => {
                    await myOrdersPage.orderRow.first().click();
                });

                await step("[STEP] Verify - 3. Oder detail page is navigated", async () => {
                    await myOrdersPage.assertUrl(/\/orderdetail.*orderID/);
                    await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '03 - Order Details Page');
                })
            }
        }
    );

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/MyAccount-Order', 'Final State');
        });
    });
});

test.describe("My Account-My Membership", () => {
    test(`
        1. Verify that My Membership page is displayed with correct membership details
        2. User can redirect to Friends of Samsonite page when clicking Membership card image
        3. Verify the Under content is displayed when clicking on Rewards and Benefits link
        4. User can redirect to Friends of Samsonite page when clicking here link under Rewards and Benefits
        5. Verify the Under content is displayed when clicking on My Coupons
        6. User can redirect to My Coupon page when clicking here link under My Coupons
        7. Verify the Under content is displayed when clicking on Terms and Conditions link
        8. User can redirect to Terms and Conditions page when clicking here link under Terms and Conditions link
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const mymembershippage = new MyMembershipPage(loggedInPage);

            await step("[STEP] Click on My Membership link", async () => {
                await myAccountPage.click(myAccountPage.membershipLink);
                await loggedInPage.waitForURL(/membership/, { waitUntil: 'networkidle' })
            });

            await step("[STEP] Verify - 1. Verify My Membership Page is displayed", async () => {
                expect(await mymembershippage.isMyMembershipDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '01 - My Membership Page');
            })

            await step("[STEP] Verify - 2. Click on Membership card image and check navigated page correct", async () => {
                const friendofsamsonite = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(mymembershippage.membershipCardImg);
                });

                const friendofsamsonitepage = new MyMembershipPage(friendofsamsonite);

                await friendofsamsonitepage.assertUrl(/\/friends-of-samsonite/);
                
                await screenshotAndAttach(friendofsamsonite, './screenshots/MyAccount-Membership', '02 - Friends of Samsonite page');
                await friendofsamsonite.close();
            });

            await step("[STEP] Verify - 3. Click on Rewards and Benefits link and check under content is shown", async () => {
                await mymembershippage.click(mymembershippage.rewardsAndMembershipBtn);
                expect(await mymembershippage.rewardsandmembershipUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '03 - Rewards and Benefits Under Content');
            });

            await step("[STEP] Verify - 4. Click here link under Rewards and Benefits and check navigated page correct", async () => {
                const hereLink = mymembershippage.rewardsandmembershipUnderContent.locator('xpath=.//a');
                const friendofsamsonite = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(hereLink);
                });
                const friendofsamsonitepage = new MyMembershipPage(friendofsamsonite);

                await friendofsamsonitepage.assertUrl(/\/friends-of-samsonite/);
                await screenshotAndAttach(friendofsamsonite, './screenshots/MyAccount-Membership', '04 - Friends of Samsonite page');
                await friendofsamsonite.close();
            });

            await step("[STEP] Verify - 5. Click on My Coupons link and check under content is shown", async () => {
                await mymembershippage.click(mymembershippage.mycouponsbtn);
                expect(await mymembershippage.myCouponsUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '05 - My Coupons Under Content');
            });

            await step("[STEP] Verify - 6. Click here link under My Coupons and check navigated page correct", async () => {
                const hereLink = mymembershippage.myCouponsUnderContent.locator('xpath=.//a');
                const mycoupons = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(hereLink);
                });

                const mycouponspage = new MyMembershipPage(mycoupons);

                await mycouponspage.assertUrl(/\/couponlist/);
                await screenshotAndAttach(mycoupons, './screenshots/MyAccount-Membership', '06 - My Coupons page');
                await mycoupons.close();
            });

            await step("[STEP] Verify - 7. Click on Terms and Conditions link and check under content is shown", async () => {
                await mymembershippage.click(mymembershippage.termsAndConditionsBtn);
                expect(await mymembershippage.termsAdndConditionsUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '07 - Terms and Conditions Under Content');
            });

            await step("[STEP] Verify - 8. Click here link under Terms and Conditions and check navigated page correct", async () => {
                const hereLink = mymembershippage.termsAdndConditionsUnderContent.locator('xpath=.//a');
                const termsandconditionspage = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(hereLink);
                });
                const termsandconditions = new MyMembershipPage(termsandconditionspage);

                await termsandconditions.assertUrl(/\/member-terms-conditions/);
                await screenshotAndAttach(termsandconditionspage, './screenshots/MyAccount-Membership', '08 - Terms and Conditions page');
                await termsandconditionspage.close();
            });
        }
    );

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/MyAccount-Membership', 'Final State');
        });
    });
});

test.describe("My Account-My Address Book", () => {
    test(`
        1. Verify that Address Book page is displayed with correct Address list
        2. Verify that Add New Address page is displayed when clicking on  Add New button
        3. User can add a new address
        4. Verify that Edit Address page is displayed when clicking on  Edit button
        5. User can edit an address
        6. User can remove an address
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const myAddressBookPage = new MyAddressBookPage(loggedInPage);
            let addressCount: number
            let updatedAddressCount: number;
            const updateFirstName = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`

            await step("[STEP] Click on My Address Book link", async () => {
                await myAccountPage.click(myAccountPage.myaddressLink);
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })
                addressCount = await myAddressBookPage.addressBookRows.count()
            });

            await step("[STEP] Verify - 1. Verify that My Address Book Page is displayed - Address list shows correctly", async () => {
                expect(await myAddressBookPage.isMyAddressBookPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '01 - Address list');
            })

            await step("[STEP] Verify - 2. Click on Add New button and check Add New Address page is displayed", async () => {
                await myAddressBookPage.click(myAddressBookPage.addnewAddressBtn)
                await myAddressBookPage.assertUrl(/addnewaddress/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '02 - Add New Address Page');
            });

            await step("[STEP] Fill address detail form", async () => {
                await myAddressBookPage.fillAddAddressBookDetail({ phone: getLocalPhone(true), postalCode: "951111" })
            })

            await step("[STEP] Click on Add Address Button", async () => {
                await myAddressBookPage.click(myAddressBookPage.addAddressButton)
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })
            })

            await step("[STEP] Verify - 3. Verify that new address is added", async () => {
                updatedAddressCount = await myAddressBookPage.addressBookRows.count()
                await myAddressBookPage.assertEqual(updatedAddressCount, addressCount + 1,
                    "Assert that new address is added"
                )
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '03 - New address');
            })

            await step("[STEP] Verify - 4. Click on Edit button to navigate to edit address page", async () => {
                await myAddressBookPage.click(myAddressBookPage.editAddressBtn.nth(updatedAddressCount - 1))
                await myAddressBookPage.assertUrl(/EditAddress/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '04 - Edit Address page');
            })

            await step("[STEP] Verify - 5. Edit/update Address information and submit to update the Address information", async () => {
                await myAddressBookPage.fillAddAddressBookDetail({ firstName: updateFirstName, postalCode: "951111" })
                await myAddressBookPage.click(myAddressBookPage.addAddressButton)
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })

                const firstNameUpdate = myAddressBookPage.addressBookRows.nth(updatedAddressCount - 1).locator(`xpath=.//div[@class="card-header"]//p`).first()

                await expect(firstNameUpdate).toHaveText(updateFirstName)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '05 - Address is updated');
            })

            await step("[STEP] Verify - 6. Remove Address and check that Address is removed", async () => {
                await myAddressBookPage.removeAddress(updatedAddressCount)

                const addressDeletedCount = await myAddressBookPage.addressBookRows.count()

                await myAddressBookPage.assertEqual(addressDeletedCount, addressCount,
                    "Assert that new address is removed"
                )

                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '06 - Address is removed');
            })
        }
    );
});

test.describe("My Account-My coupon", () => {
    test(`
        1. Verify that My coupon page is displayed when clicking on My coupon link
        2. Verify that Saved coupon page is displayed when clicking on Saved coupon link
        3. Verify that Applied coupon page is displayed when clicking on Applied coupon link
        `,
        async ({ loggedInPage }) => {
            const couponpage = new MyCouponsPage(loggedInPage);
            const myAccountPage = new MyPage(loggedInPage);

            await step("[STEP] Click on My Coupon link", async () => {
                await myAccountPage.click(myAccountPage.mycouponsLink);
                await loggedInPage.waitForURL(/couponlist/, { waitUntil: 'networkidle' })
            });

            await step("[STEP] Verify - 1. Verify that My Coupon page is displayed", async () => {
                expect(await couponpage.isMyCouponsPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '01 - My Coupon Page');
            })

            await step("[STEP] Verify - 2. Click on Saved coupon link to navigate to Saved Coupon page", async () => {
                await couponpage.click(couponpage.savedCouponLink)
                await couponpage.assertUrl(/MyCoupon/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '02 - saved coupon page');
            })

            await step("[STEP] Back to coupon page", async () => {
                await couponpage.click(couponpage.backToMypageBtn)
                await loggedInPage.waitForURL(/couponlist/, { waitUntil: 'networkidle' })
            })

            await step("[STEP] Verify - 3. Click on Applied Coupon link to navigate to Applied Coupon page", async () => {
                await couponpage.click(couponpage.appliedCouponLink)
                await couponpage.assertUrl(/used/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '03 - applied coupon page');
            })
        }
    );

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/MyAccount-Coupon', 'Final State');
        });
    });
});

test.describe("My Account-Wishlist", () => {
    test(`
        1. Verify that Wishlist page is displayed when clicking on Wishlist link
        2. Wishlist popup shows when adding product to wishlist by clicking wishlist icon
        3. Verify that product shows in wistlist page after clicking on wishlist icon
        4. User can removed produdct from wishlist list page
        `,
        async ({ loggedInPage }) => {
            const wishlistpage = new WishlistPage(loggedInPage)
            const myAccountPage = new MyPage(loggedInPage);
            const newarrivalspage = new NewArrivalsPage(loggedInPage)
            const homepage = createHomePage(loggedInPage)
            const pdppage = new PDPPage(loggedInPage)

            await step("[STEP] Click on wishlist link", async () => {
                await myAccountPage.click(myAccountPage.mywishlistLink);
                await loggedInPage.waitForURL(/Wishlist-Show/, { waitUntil: 'networkidle' })
            });

            await step("[STEP] Verify - 1. Verify that Wishlist page is displayed", async () => {
                expect(await wishlistpage.isWishlistPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Wishlist', '01 - Wishlist Page');
            })

            await step("[STEP] Go to PLP", async () => {
                await homepage.clickMenuItem('luggage')
                await newarrivalspage.logoImg.hover()

                await step('Click on In-stock checkbox', async () => {
                    await homepage.clickCheckbox(loggedInPage, `${t.homepage('in-stock')}`)
                })
            })

            await step("[STEP] Go to PDP", async () => {
                await lazyLoad(loggedInPage)
                await newarrivalspage.selectBvRatedProd()
            })

            const pdpProdName = await pdppage.getText(pdppage.prodName)
            const pdpProdCollection = await pdppage.getText(pdppage.prodCollecton)

            await step("[STEP] Click on Wishlist icon", async () => {
                await PageUtils.waitForPageLoad(loggedInPage)

                await pdppage.click(pdppage.wishlistIcon, "Click on wishlish icon")
                await delay(500)
            })

            await step("[STEP] Click on View wishlist button", async () => {
                await pdppage.click(pdppage.viewWishListButton, "Click on View wishlist button")
            })

            await step("[STEP] Verify - 2. Verify that product is existed in Wishlist page", async () => {
                await wishlistpage.assertProdExist(pdpProdName!, pdpProdCollection!,
                    "Assert that Product exist in wishlist page"
                )
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Wishlist', '02 - Product exist');
            })

            await step("[STEP] Verify - 3. Verify that user can remove product from wishlist page", async () => {
                await wishlistpage.goBack("PDP")

                await PageUtils.waitForPageLoad(loggedInPage)

                await pdppage.click(pdppage.wishlistIcon, "Click on wishlish icon")
                await delay(500)
                await pdppage.click(pdppage.viewWishListButton, "Click on View wishlist button")

                await wishlistpage.assertProdNotExist(pdpProdName!, pdpProdCollection!,
                    "Assert that Product Not exist in wishlist page"
                )

                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Wishlist', '03 - Product is removed');
            })
        }
    );
});