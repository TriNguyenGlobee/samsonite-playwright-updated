import { Page } from '@playwright/test';
import { LoginPage } from '../pages/delivery/login/login.page';
import { LoginSG } from '../pages/delivery/login/login-sg.page'
import { LoginJP } from '../pages/delivery/login/login-jp.page';
import { LoginTW } from '../pages/delivery/login/login-tw.page';
import { LoginPH } from '../pages/delivery/login/login-ph.page';
import { LoginAU } from '../pages/delivery/login/login-au.page';
import { LoginMY } from '../pages/delivery/login/login-my.page';
import { LoginID } from '../pages/delivery/login/login-id.page';
import { LoginNZ } from '../pages/delivery/login/login-nz.page';

export function createLoginPage(page: Page): LoginPage {
  switch (process.env.LOCALE) {
    case 'sg': return new LoginSG(page);
    case 'jp': return new LoginJP(page);
    case 'tw': return new LoginTW(page);
    case 'ph': return new LoginPH(page);
    case 'au': return new LoginAU(page);
    case 'my': return new LoginMY(page);
    case 'id': return new LoginID(page);
    case 'nz': return new LoginNZ(page);
    default:   return new LoginJP(page);
  }
}