import { Page } from '@playwright/test';
import { AccessoriesPage } from '../../pages/delivery/productlistingpage/accessories/accessories.page';
import { AccessoriesPageAU }  from '../../pages/delivery/productlistingpage/accessories/accessories-au.page';
import { AccessoriesPageSG }  from '../../pages/delivery/productlistingpage/accessories/accessories-sg.page';
import { AccessoriesPageMY } from '../../pages/delivery/productlistingpage/accessories/accessories-my.page';
import { AccessoriesPageID } from '../../pages/delivery/productlistingpage/accessories/accessories-id.page';
import { AccessoriesPageNZ } from '../../pages/delivery/productlistingpage/accessories/accessories-nz.page';

export function createAccessoriesPage(page: Page): AccessoriesPage {
  switch (process.env.LOCALE) {
    case 'sg': return new AccessoriesPageSG(page);
    case 'au': return new AccessoriesPageAU(page);
    case 'my': return new AccessoriesPageMY(page);
    case 'id': return new AccessoriesPageID(page);
    case 'nz': return new AccessoriesPageNZ(page);
    default:   return new AccessoriesPageSG(page);
  }
}