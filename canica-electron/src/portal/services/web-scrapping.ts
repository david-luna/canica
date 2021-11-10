import { app, BrowserWindow } from 'electron';
import * as pie from 'puppeteer-in-electron';
import * as puppeteer from 'puppeteer-core';
import { Injectable } from 'annotatron';

// TODO: to be removed & passed by the user
const username = process.env.PLATFORM_USERNAME;
const password = process.env.PLATFORM_PASSWORD;

interface PuppeteerContext {
  browser: puppeteer.Browser;
  window: BrowserWindow;
}

interface Credentials { username: string, password: string }

@Injectable()
export class WebScrappingService {
  private browserPromise: Promise<puppeteer.Browser>;

  constructor () {
    console.log('connecting')
    this.browserPromise = pie.initialize(app)
      .then(() => pie.connect(app,puppeteer));
  }

  async execute(): Promise<void> {
    const browser = await this.browserPromise;
    const window  = new BrowserWindow();
    const page = await pie.getPage(browser, window);

    window.webContents.openDevTools();

    await this.login(page, { username, password });
    await this.listClasses(page);
  }

  private async login(page: puppeteer.Page, credentials: Credentials ): Promise<puppeteer.Page> {
    const { username, password } = credentials;
    const url = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/';

    await page.goto(url);
    await page.waitForSelector('#user');
    await page.type('#user', username);
    await page.type('#password', password);
    await page.click('input[type="submit"]');
    await page.waitForNetworkIdle();
    await page.waitForSelector('#logoutIcon');

    return page;
  }

  private async listClasses(page: puppeteer.Page): Promise<puppeteer.Page> {
    const url = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/avaluacio/parcialAvaluacioGrupMateria';
    const tableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody';

    await page.goto(url);
    console.log('witing for table');
    await page.waitForNetworkIdle();
    await page.waitForSelector(`${tableSelector} tr`);
    console.log('witing for table DONE!!!');

    const records = await page.$$eval(`${tableSelector} tr`, (rows) => rows.map( tr => [
      (tr.querySelector('td:nth-child(3)') as HTMLTableCellElement).innerText,
      (tr.querySelector('td:nth-child(4)') as HTMLTableCellElement).innerText,
    ]));

    console.log('get records', records);

    return page;
  }
}
