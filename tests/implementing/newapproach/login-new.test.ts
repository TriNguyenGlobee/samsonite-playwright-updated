import { test, expect } from "../../../src/fixtures/test-fixture";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createLoginPage } from "../../../src/factories/login.factory";
import { createHomePage } from "../../../src/factories/home.factory"
import { tests } from "../../../utils/helpers/localeTest";

test.describe('Login with normal-email', () => {
    test(`
        1. Login page is displayed correctly
        2. User can login with valid username and password
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const loginPage = createLoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("[STEP] From Homepage, click Logic/Signup icon", async () => {
            await homePage.goToLoginRegisterPage();
        });

        await step("[STEP] Verify - 1. Login page is displayed", async () => {
            await loginPage.assertEqual(await loginPage.isLoginPageDisplayed(), true, "Login page is displayed");
            await screenshotAndAttach(basicAuthPage, './screenshots/Login-normal-email', '01 - Login Page')
        });

        await step("[STEP] Type valid email and passsword into login form and click Sign In button", async () => {
            await loginPage.login(Config.credentials.username, Config.credentials.password);
        });

        await step("[STEP] Verify - 2. Login sucess and MyPage is displayed", async () => {
            await myPage.assertEqual(await myPage.isMyPageDisplayed(), true, "Mypage is displayed");
            await screenshotAndAttach(basicAuthPage, './screenshots/Login-normal-email', '02 - MyPage')
        });
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Login-normal-email', 'Final State');
        });
    });
});

// test.describe("Login by Facebook login", () => {
//     tests([], `
//         1. Login success by Facebook account - MyPage is displayed
//         `, async ({ basicAuthPage }) => {

//         const loginPage = createLoginPage(basicAuthPage);
//         const myPage = new MyPage(basicAuthPage);

//         await step("Go to login page", async () => {
//             await loginPage.goToLoginRegisterPage();
//         });

//         await step("Login By Facebook account", async () => {
//             await loginPage.loginByFacebookAccount(Config.credentials.fb_username, Config.credentials.fb_password);
//         });

//         await step("Verify - 1. Login success by Facebook account - MyPage is displayed", async () => {
//             await myPage.assertEqual(await myPage.isMyPageDisplayed(), true, "Mypage is displayed");
//             await screenshotAndAttach(basicAuthPage, './screenshots/Login-with-facebook', '01 - MyPage')
//         });
//     });
// });