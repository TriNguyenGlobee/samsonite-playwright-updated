import * as dotenv from 'dotenv';
import { t } from "./utils/helpers/helpers"
dotenv.config();

console.log('QA_USERNAME:', process.env.QA_USERNAME);
console.log('DEV_USERNAME:', process.env.DEV_USERNAME);
console.log(t.loginpage('title'));