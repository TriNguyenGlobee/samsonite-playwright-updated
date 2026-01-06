import { test, expect } from "../../../src/fixtures/test-fixture"
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { t } from "../../../utils/helpers/helpers";
import { loadTestData } from "../../../utils/data";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";

test.describe("Register form is displayed", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`
        1. All fields are displayed
        2. Submit form with blank form`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)

        await step('Verify that all fields are displayed', async () => {
            await registerpage.isRegisterpageDisplayed()
        })

        await step('Clicking on create account button', async () => {
            await registerpage.click(registerpage.createAccountButton,
                "Submit Create Account button"
            )
        })

        await step('Verify that required messages are displayed', async () => {
            await steps(["sg", "id"], 'Verify feedback msg under title dropdown', async () => {
                await registerpage.assertDropdownFeedbackMsg('registration-form-title', t.registerpage('titlemsg'),
                    "Assert feedback msg under title dropdown")
            })

            await registerpage.assertFieldFeedbackMsg(t.registerpage('firstname'), t.registerpage('fnamemsg'),
                "Assert feedback msg under firstname field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('lastname'), t.registerpage('lnamemsg'),
                "Assert feedback msg under lastname field")

            await steps(["sg", "jp"], 'Verify feedback msg under phonenumber field', async () => {
                await registerpage.assertFieldFeedbackMsg(t.registerpage('phonenumber'), t.registerpage('phonemsg'),
                    "Assert feedback msg under phonenumber field")
            })

            await registerpage.assertFieldFeedbackMsg(t.registerpage('email'), t.registerpage('emailmsg'),
                "Assert feedback msg under email field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('password'), t.registerpage('pwmsg'),
                "Assert feedback msg under password field")
        })
    })
})

test.describe("Clicking create account button with invalid information", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    tests(["sg", "id"], `1. Submit create account button without selecting gender`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutTitle } = loadTestData();

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutTitle)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that title feedback msg', async () => {
            if (process.env.LOCALE != "jp") {
                await registerpage.assertDropdownFeedbackMsg('registration-form-title', t.registerpage('titlemsg'),
                    "Assert feedback msg under title dropdown")
            } else {
                await registerpage.assertDropdownFeedbackMsg('gender', t.registerpage('titlemsg'),
                    "Assert feedback msg under title dropdown")
            }
        })
    })

    test(`2. Submit create account button without firstname`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutFirstname } = loadTestData();

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutFirstname)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that firstname feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('firstname'), t.registerpage('fnamemsg'),
                "Assert feedback msg under firstname field")
        })
    })

    test(`3. Submit create account button without lastname`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutLastname } = loadTestData()

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutLastname)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that lastname feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('lastname'), t.registerpage('lnamemsg'),
                "Assert feedback msg under lastname field")
        })
    })

    tests(["sg", "jp", "id"], `4. Submit create account button without phonenumber`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutphonenumber } = loadTestData()

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutphonenumber)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that phonenumber feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('phonenumber'), t.registerpage('phonemsg'),
                "Assert feedback msg under phonenumber field")
        })
    })

    test(`5. Submit create account button without email`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutEmail } = loadTestData()

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutEmail)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that email feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('email'), t.registerpage('emailmsg'),
                "Assert feedback msg under Email field")
        })
    })

    test(`6. Submit create account button without password`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutPassword } = loadTestData()

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutPassword)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that password feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('password'), t.registerpage('pwmsg'),
                "Assert feedback msg under password field")
        })
    })

    test(`7. Submit create account button without confirm password`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const { registerDataWithoutConfirmPassword } = loadTestData()

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm(registerDataWithoutConfirmPassword)
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that confirm password feedback msg', async () => {
            await registerpage.assertFieldFeedbackMsg(t.registerpage('confirmpassword'), t.registerpage('pwmsg'),
                "Assert feedback msg under password field")
        })
    })
})