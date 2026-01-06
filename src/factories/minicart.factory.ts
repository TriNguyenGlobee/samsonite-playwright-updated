import { Page } from '@playwright/test';
import { MinicartPage } from '../../src/pages/delivery/cart/minicart.page'
import { MinicartPageJP } from '../../src/pages/delivery/cart/minicart-jp.page'
import { MinicartPageSG } from '../../src/pages/delivery/cart/minicart-sg.page'
import { MinicartPageTW } from '../pages/delivery/cart/minicart-tw.page';
import { MinicartPagePH } from '../pages/delivery/cart/minicart-ph.page';
import { MinicartPageAU } from '../pages/delivery/cart/minicart-au.page';
import { MinicartPageMY } from '../pages/delivery/cart/minicart-my.page';
import { MinicartPageID } from '../pages/delivery/cart/minicart-id.page';
import { MinicartPageNZ } from '../pages/delivery/cart/minicart-nz.page';

export function createMinicartPage(page: Page): MinicartPage {
  switch (process.env.LOCALE) {
    case 'sg': return new MinicartPageSG(page);
    case 'jp': return new MinicartPageJP(page);
    case 'tw': return new MinicartPageTW(page);
    case 'ph': return new MinicartPagePH(page);
    case 'au': return new MinicartPageAU(page);
    case 'my': return new MinicartPageMY(page);
    case 'id': return new MinicartPageID(page);
    case 'nz': return new MinicartPageNZ(page);
    default:   return new MinicartPageJP(page);
  }
}