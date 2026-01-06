import { Page } from '@playwright/test';
import { BrandPage }  from '../../pages/delivery/productlistingpage/brand/brand.page';
import { BrandPageSG }  from '../../pages/delivery/productlistingpage/brand/brand-sg.page';
import { BrandPageJP }  from '../../pages/delivery/productlistingpage/brand/brand-jp.page';
import { BrandPageTW } from '../../pages/delivery/productlistingpage/brand/brand-tw.page';
import { BrandPagePH } from '../../pages/delivery/productlistingpage/brand/brand-ph.page';
import { BrandPageAU } from '../../pages/delivery/productlistingpage/brand/brand-au.page';
import { BrandPageMY } from '../../pages/delivery/productlistingpage/brand/brand-my.page';
import { BrandPageID } from '../../pages/delivery/productlistingpage/brand/brand-id.page';
import { BrandPageNZ } from '../../pages/delivery/productlistingpage/brand/brand-nz.page';

export function createBrandPage(page: Page): BrandPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BrandPageSG(page);
    case 'jp': return new BrandPageJP(page);
    case 'tw': return new BrandPageTW(page);
    case 'ph': return new BrandPagePH(page);
    case 'au': return new BrandPageAU(page);
    case 'my': return new BrandPageMY(page);
    case 'id': return new BrandPageID(page);
    case 'nz': return new BrandPageNZ(page);
    default:   return new BrandPageJP(page);
  }
}