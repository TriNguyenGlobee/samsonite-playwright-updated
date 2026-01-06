import { Page } from '@playwright/test';
import { CartPage } from '../pages/delivery/cart/cart.page'
import { CartPageJP } from '../pages/delivery/cart/cart-jp.page'
import { CartPageSG } from '../pages/delivery/cart/cart-sg.page'
import { CartPageTW } from '../pages/delivery/cart/cart-tw.page';
import { CartPagePH } from '../pages/delivery/cart/cart-ph.page';
import { CartPageAU } from '../pages/delivery/cart/cart-au.page';
import { CartPageMY } from '../pages/delivery/cart/cart-my.page';
import { CartPageID } from '../pages/delivery/cart/cart-id.page';
import { CartPageNZ } from '../pages/delivery/cart/cart-nz.page';

export function createCartPage(page: Page): CartPage {
  switch (process.env.LOCALE) {
    case 'sg': return new CartPageSG(page);
    case 'jp': return new CartPageJP(page);
    case 'tw': return new CartPageTW(page);
    case 'ph': return new CartPagePH(page);
    case 'au': return new CartPageAU(page);
    case 'my': return new CartPageMY(page);
    case 'id': return new CartPageID(page);
    case 'nz': return new CartPageNZ(page);
    default:   return new CartPageJP(page);
  }
}