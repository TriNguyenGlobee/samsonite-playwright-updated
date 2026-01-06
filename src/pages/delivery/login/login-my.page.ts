import { LoginPage } from "./login.page";
import { step } from "allure-js-commons";
import { PageUtils } from "../../../../utils/helpers/helpers";
import { expect } from "@playwright/test";


export class LoginMY extends LoginPage {

    // =========================
    // 🚀 Actions
    // =========================
    async login(username: string, password: string) {
        await step(`Type username: ${username}`, async () => {
            await this.type(this.emailTextbox, username, "Type username");
        });

        await step(`Type password: ${password}`, async () => {
            await this.type(this.passwordTextbox, password, "Type password");
        });

        await step(`Click login button`, async () => {
            await Promise.all([
                this.click(this.signInButton, "Click login button"),
                this.signInButton.waitFor({ state: "hidden" })
            ]);
        });

        await PageUtils.waitForDomAvailable(this.page);
        await PageUtils.waitForPageLoad(this.page);
    }
}