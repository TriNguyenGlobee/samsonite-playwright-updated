import { Page } from '@playwright/test';
import { LuggagePage }  from '../../pages/delivery/productlistingpage/luggage/luggage.page';
import { LuggagePageSG }  from '../../pages/delivery/productlistingpage/luggage/luggage-sg.page';
import { LuggagePageJP }  from '../../pages/delivery/productlistingpage/luggage/luggage-jp.page';
import { LuggagePageTW }  from '../../pages/delivery/productlistingpage/luggage/luggage-tw.page';
import { LuggagePagePH }  from '../../pages/delivery/productlistingpage/luggage/luggage-ph.page';
import { LuggagePageAU }  from '../../pages/delivery/productlistingpage/luggage/luggage-au.page';
import { LuggagePageMY }  from '../../pages/delivery/productlistingpage/luggage/luggage-my.page';
import { LuggagePageID }  from '../../pages/delivery/productlistingpage/luggage/luggage-id.page';
import { LuggagePageNZ }  from '../../pages/delivery/productlistingpage/luggage/luggage-nz.page';

export function createLuggagePage(page: Page): LuggagePage {
  switch (process.env.LOCALE) {
    case 'sg': return new LuggagePageSG(page);
    case 'jp': return new LuggagePageJP(page);
    case 'tw': return new LuggagePageTW(page);
    case 'ph': return new LuggagePagePH(page);
    case 'au': return new LuggagePageAU(page);
    case 'my': return new LuggagePageMY(page);
    case 'id': return new LuggagePageID(page);
    case 'nz': return new LuggagePageNZ(page);
    default:   return new LuggagePageJP(page);
  }
}