import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";

test.describe("Test-module", () => {
    const { carouselItems } = loadTestData();
    
    test("Test-module:check action activities", async ({ basicAuthPage }) => {

    })
});
