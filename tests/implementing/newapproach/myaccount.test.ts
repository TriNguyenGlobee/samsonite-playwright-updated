import { test, expect } from "../../../src/fixtures/test-fixture"
import { createHomePage } from "../../../src/factories/home.factory";
import { openNewTab, screenshotAndAttach, getLocalPhone, randomAlphaString, lazyLoad, t, clickUntil, PageUtils, delay } from "../../../utils/helpers/helpers";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { MyorderPage } from "../../../src/pages/implementing/mypage/myorder.page";
import { MyMembershipPage } from "../../../src/pages/implementing/mypage/mymembership.page";
import { MyProfilePage } from "../../../src/pages/implementing/mypage/myprofile.page";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MyAddressBookPage } from "../../../src/pages/implementing/mypage/myaddressbook.page";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { MyPaymentsPage } from "../../../src/pages/implementing/mypage/mypayments.page";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { MyCouponsPage } from "../../../src/pages/implementing/mypage/mycoupons.page";
import { WishlistPage } from "../../../src/pages/delivery/pdp/wishlist.page";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { loadTestData } from "../../../utils/data";
import { Config } from "../../../config/env.config";

const isProd = () => process.env.ENV === 'prod';

test.describe("My Account-My Orders", () => {
    test(`
        1. My Page is displayed
        2. My Orders Page is displayed - Your Orders list shows correctly
        3. Click on an order to view order details - Order Details page is displayed correctly
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const myOrdersPage = new MyorderPage(loggedInPage);

            await step("Verify - 1. My Page is displayed - Your detail form shows correctly", async () => {
                expect(await myAccountPage.isMyPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '01 - My Page');
            })

            await step("Click on My Orders link", async () => {
                await myAccountPage.click(myAccountPage.myOrdersLink);
                await loggedInPage.waitForURL(/orders/, { waitUntil: 'networkidle' })
            });

            await step("Verify - 2. My Orders Page is displayed - Your Orders list shows correctly", async () => {
                expect(await myOrdersPage.isMyOrderPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '02 - My Orders Page');
            })

            if (process.env.ENV === 'stg') {
                await step("Click on an order to view order details", async () => {
                    await myOrdersPage.orderRow.first().click();
                });

                await step("Verify - 3. Order Details page is displayed correctly", async () => {
                    await myOrdersPage.assertUrl(/\/orderdetail.*orderID/);
                    await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Order', '03 - Order Details Page');
                })
            }
        }
    );
});

test.describe("My Account-My Membership", () => {
    test(`
        1. My Membership Page is displayed - Your Membership details show correctly
        2. Click on membership card image to navigate to Friends of Samsonite page - Friends of Samsonite page is displayed correctly
        3. Click Rewards and Benefits - Under content is displayed correctly
        4. Click here under Rewards and Benefits - Friends of Samsonite page is displayed correctly
        5. Click My Coupons - Under content is displayed correctly
        6. Click here under My Coupons - My Coupons page is displayed correctly
        7. Click Terms and Conditions - Under content is displayed correctly
        8. Click here under Terms and Conditions - Terms and Conditions page is displayed correctly
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const mymembershippage = new MyMembershipPage(loggedInPage);

            await step("Click on My Membership link", async () => {
                await myAccountPage.click(myAccountPage.membershipLink);
                await loggedInPage.waitForURL(/membership/, { waitUntil: 'networkidle' })
            });

            await step("Verify - 1. My Membership Page is displayed - Your Membership details show correctly", async () => {
                expect(await mymembershippage.isMyMembershipDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '01 - My Membership Page');
            })

            await step("Verify - 2. Click on membership card image to navigate to Friends of Samsonite page - Friends of Samsonite page is displayed correctly", async () => {
                const friendofsamsonite = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(mymembershippage.membershipCardImg);
                });

                const friendofsamsonitepage = new MyMembershipPage(friendofsamsonite);

                await friendofsamsonitepage.assertUrl(/\/friends-of-samsonite/);
                await screenshotAndAttach(friendofsamsonite, './screenshots/MyAccount-Membership', '02 - Friends of Samsonite page');
                await friendofsamsonite.close();
            });

            await step("Verify - 3. Click Rewards and Benefits - Under content is displayed correctly", async () => {
                await mymembershippage.click(mymembershippage.rewardsAndMembershipBtn);
                expect(await mymembershippage.rewardsandmembershipUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '03 - Rewards and Benefits Under Content');
            });

            await step("Verify - 4. Click here under Rewards and Benefits - Friends of Samsonite page is displayed correctly", async () => {
                const hereLink = mymembershippage.rewardsandmembershipUnderContent.locator('xpath=.//a');
                const friendofsamsonite = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(hereLink);
                });
                const friendofsamsonitepage = new MyMembershipPage(friendofsamsonite);

                await friendofsamsonitepage.assertUrl(/\/friends-of-samsonite/);
                await screenshotAndAttach(friendofsamsonite, './screenshots/MyAccount-Membership', '04 - Friends of Samsonite page');
                await friendofsamsonite.close();
            });

            await step("Verify - 5. Click My Coupons - Under content is displayed correctly", async () => {
                await mymembershippage.click(mymembershippage.mycouponsbtn);
                expect(await mymembershippage.myCouponsUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '05 - My Coupons Under Content');
            });

            await step("Verify - 6. Click here under My Coupons - My Coupons page is displayed correctly", async () => {
                const hereLink = mymembershippage.myCouponsUnderContent.locator('xpath=.//a');
                const mycoupons = await openNewTab(loggedInPage, async () => {
                    await mymembershippage.click(hereLink);
                });

                const mycouponspage = new MyMembershipPage(mycoupons);

                await mycouponspage.assertUrl(/\/couponlist/);
                await screenshotAndAttach(mycoupons, './screenshots/MyAccount-Membership', '06 - My Coupons page');
                await mycoupons.close();
            });

            await step("Verify - 7. Click Terms and Conditions - Under content is displayed correctly", async () => {
                await mymembershippage.click(mymembershippage.termsAndConditionsBtn);
                expect(await mymembershippage.termsAdndConditionsUnderContent.isVisible()).toBeTruthy();
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Membership', '07 - Terms and Conditions Under Content');
            });

            await step("Verify - 8. Click here under Terms and Conditions - Terms and Conditions page is displayed correctly", async () => {
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
});

test.describe("My Account-My Address Book", () => {
    test(`
        1. My Address Book Page is displayed - Address list shows correctly
        2. Click Add new to navigate to Add new address page - Add New Address Page displayed
        3. Add new address - New address is added
        4. Click Edit to navigate to Edit Address page - Edit Address page
        5. Edit the address - Address is updated
        6. Remove address - Address is removed
        `,
        async ({ loggedInPage }) => {
            const myAccountPage = new MyPage(loggedInPage);
            const myAddressBookPage = new MyAddressBookPage(loggedInPage);
            let addressCount: number
            let updatedAddressCount: number;
            const updateFirstName = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`

            await step("Click on My Address Book link", async () => {
                await myAccountPage.click(myAccountPage.myaddressLink);
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })
                addressCount = await myAddressBookPage.addressBookRows.count()
            });

            await step("Verify - 1. My Address Book Page is displayed - Address list shows correctly", async () => {
                expect(await myAddressBookPage.isMyAddressBookPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '01 - Address list');
            })

            await step("Verify - 2. Click Add new to navigate to Add new address page - Add New Address Page displayed", async () => {
                await myAddressBookPage.click(myAddressBookPage.addnewAddressBtn)
                await myAddressBookPage.assertUrl(/addnewaddress/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '02 - Add New Address Page');
            });

            await step("Fill address detail form", async () => {
                await myAddressBookPage.fillAddAddressBookDetail({ phone: getLocalPhone(true), postalCode: "951111" })
            })

            await step("Click Add Address Button", async () => {
                await myAddressBookPage.click(myAddressBookPage.addAddressButton)
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })
            })

            await step("Verify - 3. Add new address - New address is added", async () => {
                updatedAddressCount = await myAddressBookPage.addressBookRows.count()
                await myAddressBookPage.assertEqual(updatedAddressCount, addressCount + 1,
                    "Assert that new address is added"
                )
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '03 - New address');
            })

            await step("Verify - 4. Click Edit to navigate to Edit Address page - Edit Address page", async () => {
                await myAddressBookPage.click(myAddressBookPage.editAddressBtn.nth(updatedAddressCount - 1))
                await myAddressBookPage.assertUrl(/EditAddress/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '04 - Edit Address page');
            })

            await step("Verify - 5. Edit the address - Address is updated", async () => {
                await myAddressBookPage.fillAddAddressBookDetail({ firstName: updateFirstName, postalCode: "951111" })
                await myAddressBookPage.click(myAddressBookPage.addAddressButton)
                await loggedInPage.waitForURL(/addressbook/, { waitUntil: 'networkidle' })

                const firstNameUpdate = myAddressBookPage.addressBookRows.nth(updatedAddressCount - 1).locator(`xpath=.//div[@class="card-header"]//p`).first()

                await expect(firstNameUpdate).toHaveText(updateFirstName)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-AddressBook', '05 - Address is updated');
            })

            await step("Verify - 6. Remove address - Address is removed", async () => {
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
        1. My Coupon Page is displayed
        2. Click Saved coupon link - saved coupon page displayed
        3. Click Applied coupon link - applied coupon page dispayed
        `,
        async ({ loggedInPage }) => {
            const couponpage = new MyCouponsPage(loggedInPage);
            const myAccountPage = new MyPage(loggedInPage);
            let addressCount: number

            await step("Click on My Coupon link", async () => {
                await myAccountPage.click(myAccountPage.mycouponsLink);
                await loggedInPage.waitForURL(/couponlist/, { waitUntil: 'networkidle' })
            });

            await step("Verify - 1. My Coupon Page is displayed", async () => {
                expect(await couponpage.isMyCouponsPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '01 - My Coupon Page');
            })

            await step("Verify - 2. Click Saved coupon link - saved coupon page displayed", async () => {
                await couponpage.click(couponpage.savedCouponLink)
                await couponpage.assertUrl(/MyCoupon/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '02 - saved coupon page');
            })

            await step("Back to coupon page", async () => {
                await couponpage.click(couponpage.backToMypageBtn)
                await loggedInPage.waitForURL(/couponlist/, { waitUntil: 'networkidle' })
            })

            await step("Verify - 3. Click Applied coupon link - applied coupon page dispayed", async () => {
                await couponpage.click(couponpage.appliedCouponLink)
                await couponpage.assertUrl(/used/)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Coupon', '03 - applied coupon page');
            })
        }
    );
});

test.describe("My Account-Wishlist", () => {
    test(`
        1. Wishlist page displayed
        2. User can add product to wishlist - Product exist in wishlist
        3. User can remove product from wishlist - Product removed from wishlist
        `,
        async ({ loggedInPage }) => {
            const wishlistpage = new WishlistPage(loggedInPage)
            const myAccountPage = new MyPage(loggedInPage);
            const newarrivalspage = new NewArrivalsPage(loggedInPage)
            const homepage = createHomePage(loggedInPage)
            const pdppage = new PDPPage(loggedInPage)

            await step("Click on wishlist link", async () => {
                await myAccountPage.click(myAccountPage.mywishlistLink);
                await loggedInPage.waitForURL(/Wishlist-Show/, { waitUntil: 'networkidle' })
            });

            await step("Verify - 1. Wishlist page displayed", async () => {
                expect(await wishlistpage.isWishlistPageDisplayed()).toBe(true)
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Wishlist', '01 - Wishlist Page');
            })

            await step('Go to Luggage', async () => {
                await homepage.clickMenuItem('luggage')
                await newarrivalspage.logoImg.hover()

                await step('Click on In-stock checkbox', async () => {
                    await homepage.clickCheckbox(loggedInPage, `${t.homepage('in-stock')}`)
                })
            })

            await step("Scroll down and select a rated product", async () => {
                await lazyLoad(loggedInPage)
                await newarrivalspage.selectBvRatedProd()
            })

            const pdpProdName = await pdppage.getText(pdppage.prodName)
            const pdpProdCollection = await pdppage.getText(pdppage.prodCollecton)

            await step("Add product to wishlist", async () => {
                await PageUtils.waitForPageLoad(loggedInPage)

                await pdppage.click(pdppage.wishlistIcon, "Click on wishlish icon")
                await delay(500)
            })

            await step("Go to wishlist page", async () => {
                await pdppage.click(pdppage.viewWishListButton, "Click on View wishlist button")
            })

            await step("Verify - 2. User can add product to wishlist - Product exist in wishlist", async () => {
                await wishlistpage.assertProdExist(pdpProdName!, pdpProdCollection!,
                    "Assert that Product exist in wishlist page"
                )
                await screenshotAndAttach(loggedInPage, './screenshots/MyAccount-Wishlist', '02 - Product exist');
            })

            await step("Verify - 3. User can remove product from wishlist - Product removed from wishlist", async () => {
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