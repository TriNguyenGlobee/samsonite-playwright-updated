import { Page } from '@playwright/test';
import { BackpacksPage }  from '../../pages/delivery/productlistingpage/backpacks/backpacks.page';
import { BackpacksPageSG }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-sg.page';
import { BackpacksPageJP }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-jp.page';
import { BackpacksPageTW }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-tw.page';
import { BackpacksPagePH }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-ph.page';
import { BackpacksPageAU }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-au.page';
import { BackpacksPageMY } from '../../pages/delivery/productlistingpage/backpacks/backpacks-my.page';
import { BackpacksPageID } from '../../pages/delivery/productlistingpage/backpacks/backpacks-id.page';
import { BackpacksPageNZ } from '../../pages/delivery/productlistingpage/backpacks/backpacks-nz.page';

export function createBackpacksPage(page: Page): BackpacksPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BackpacksPageSG(page);
    case 'jp': return new BackpacksPageJP(page);
    case 'tw': return new BackpacksPageTW(page);
    case 'ph': return new BackpacksPagePH(page);
    case 'au': return new BackpacksPageAU(page);
    case 'my': return new BackpacksPageMY(page);
    case 'id': return new BackpacksPageID(page);
    case 'nz': return new BackpacksPageNZ(page);
    default:   return new BackpacksPageJP(page);
  }
}