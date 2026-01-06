import { test, expect } from "../../../src/fixtures/test-fixture";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { tests } from "../../../utils/helpers/localeTest"

test.describe("Logout Completion Screen", () => {
    test(`1. Logout success`, async ({ loggedInPage }) => {
        const myPage = new MyPage(loggedInPage);
        const loginPage = createLoginPage(loggedInPage)

        await step("Logout", async () => {
            await myPage.logout();
        });

        await step("Verify Logout success", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });
    });
});
