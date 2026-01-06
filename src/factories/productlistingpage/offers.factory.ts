import { Page } from '@playwright/test';
import { OffersPage }  from '../../pages/delivery/productlistingpage/offers/offers.page';
import { OffersPageTW } from '../../pages/delivery/productlistingpage/offers/offers-tw.page';
import { OffersPageJP } from '../../pages/delivery/productlistingpage/offers/offers-jp.page';
import { OffersPagePH } from '../../pages/delivery/productlistingpage/offers/offers-ph.page';
import { OffersPageAU } from '../../pages/delivery/productlistingpage/offers/offers-au.page';
import { OffersPageMY } from '../../pages/delivery/productlistingpage/offers/offers-my.page';
import { OffersPageID } from '../../pages/delivery/productlistingpage/offers/offers-id.page';
import { OffersPageNZ } from '../../pages/delivery/productlistingpage/offers/offers-nz.page';

export function createOffersPage(page: Page): OffersPage {
  switch (process.env.LOCALE) {
    case 'tw': return new OffersPageTW(page);
    case 'jp': return new OffersPageJP(page);
    case 'ph': return new OffersPagePH(page);
    case 'au': return new OffersPageAU(page);
    case 'my': return new OffersPageMY(page);
    case 'id': return new OffersPageID(page);
    case 'nz': return new OffersPageNZ(page);
    default: return new OffersPageJP(page);
  }
}