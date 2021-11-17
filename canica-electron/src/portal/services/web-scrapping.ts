import { app, BrowserWindow, session } from 'electron';
import * as pie from 'puppeteer-in-electron';
import * as puppeteer from 'puppeteer-core';
import { Injectable } from 'annotatron';
import { SchoolClassRecord, StudentRecord } from '../domain';
import { DomainEventsBus } from '@common/domain';
import { SchoolClassRecordDataTransfer } from '@portal/data-transfer';
import { SchoolClassRecordMapper } from '@portal/mappers/school-class-record-mapper';

// TODO: to be removed & passed by the user
const username = process.env.PLATFORM_USERNAME;
const password = process.env.PLATFORM_PASSWORD;

interface Credentials { username: string, password: string }

@Injectable()
export class WebScrappingService {
  private browserPromise: Promise<puppeteer.Browser>;

  constructor (private eventsBus: DomainEventsBus) {
    this.browserPromise = pie.initialize(app)
      .then(() => pie.connect(app,puppeteer));
  }

  async execute(): Promise<void> {
    const browser = await this.browserPromise;
    const window  = new BrowserWindow({ webPreferences: { session: session.fromPartition('scrapper') } });
    const page = await pie.getPage(browser, window);

    // window.webContents.openDevTools();

    await this.login(page, { username, password });
    const classData  = await this.listClasses(page);

    for (const data of classData) {
      await this.getClassStudents(page, data);
      const record = SchoolClassRecordMapper.toDomain(data);
      this.eventsBus.dispatchEvents(record);
    }

    window.close();
  }

  private async login(page: puppeteer.Page, credentials: Credentials ): Promise<void> {
    const { username, password } = credentials;
    const url = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/';

    await page.goto(url);
    await page.waitForSelector('#user');
    await page.type('#user', username);
    await page.type('#password', password);
    await page.click('input[type="submit"]');
    await page.waitForNetworkIdle();
    await page.waitForSelector('#logoutIcon');
  }

  private async listClasses(page: puppeteer.Page): Promise<SchoolClassRecordDataTransfer[]> {
    const url = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/avaluacio/parcialAvaluacioGrupMateria';
    const tableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody';

    await page.goto(url);
    await page.waitForNetworkIdle();
    await page.waitForSelector(`${tableSelector} tr`);
    
    const records = await page.$$eval(`${tableSelector} tr`, (rows) => rows.map(tr => ({
      _id: (tr.querySelector('td:nth-child(3)') as HTMLTableCellElement).innerText,
      year: (tr.querySelector('td:nth-child(2)') as HTMLTableCellElement).innerText,
      label: (tr.querySelector('td:nth-child(4)') as HTMLTableCellElement).innerText,
      students: [],
    })));

    return records;
  }

  private async getClassStudents(
    page: puppeteer.Page,
    classData: SchoolClassRecordDataTransfer
  ): Promise<void> {
    const students = [...new Array(25)].map((_, index) => new StudentRecord({
      code: `${index}`.padStart(8, '0'),
      name: `Student-${index}`,
      grade: '',
    }));

    students.forEach(s => classData.students.push(s));

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
