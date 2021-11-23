import { app, BrowserWindow, session } from 'electron';
import * as pie from 'puppeteer-in-electron';
import * as puppeteer from 'puppeteer-core';
import { Injectable } from 'annotatron';
  import { DomainEventsBus } from '@common/domain';
import { SchoolClassRecordDataTransfer } from '../data-transfer';
import { SchoolClassRecordMapper } from '../mappers/school-class-record-mapper';
import { StudentRecord } from '../domain/student-record';

// TODO: to be removed & passed by the user
const username = process.env.PLATFORM_USERNAME;
const password = process.env.PLATFORM_PASSWORD;

const enum PortalUrls {
  Login = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/',
  ClassListBySubject = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/avaluacio/parcialAvaluacioGrupMateria',
  ClassListByGroup = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh/avaluacio/parcialAvaluacioGrupAlumne',
}

const enum PortalSelectors {
  ClassTableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody',
  ClassTableRowSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody tr',
  StudentsTableRowSelector = '[data-st-table="vm.dummyStudents"] tbody tr',
}

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

    window.webContents.openDevTools();

    await this.login(page, { username, password });
    const classData  = await this.listClasses(page);

    for(let i = 0; i < classData.length; i++) {
      await this.getClassStudents(page, classData[i], i + 1);
      const record = SchoolClassRecordMapper.toDomain(classData[i]);
      this.eventsBus.dispatchEvents(record);
    }

    window.close();
  }

  private async login(page: puppeteer.Page, credentials: Credentials ): Promise<void> {
    const { username, password } = credentials;

    await page.goto(PortalUrls.Login);
    await page.waitForSelector('#user');
    await page.type('#user', username);
    await page.type('#password', password);
    await page.click('input[type="submit"]');
    await page.waitForNetworkIdle();
    await page.waitForSelector('#logoutIcon');
  }

  private async listClasses(page: puppeteer.Page): Promise<SchoolClassRecordDataTransfer[]> {
    const classRowSelector = PortalSelectors.ClassTableRowSelector;

    await page.goto(PortalUrls.ClassListByGroup);
    await page.waitForNetworkIdle();
    await page.waitForSelector(classRowSelector);
    
    const records = await page.$$eval(classRowSelector, (rows) => rows.map(tr => ({
      _id: (tr.querySelector('td:nth-child(3)') as HTMLTableCellElement).innerText,
      year: (tr.querySelector('td:nth-child(2)') as HTMLTableCellElement).innerText,
      label: (tr.querySelector('td:nth-child(4)') as HTMLTableCellElement).innerText,
      students: [],
    })));

    return records;
  }

  private async getClassStudents(
    page: puppeteer.Page,
    classData: SchoolClassRecordDataTransfer,
    index: number,
  ): Promise<void> {
    const tableSelector = PortalSelectors.ClassTableRowSelector;
    const linkSelector = `${tableSelector}:nth-child(${index}) a`;
    const studentsSelector = PortalSelectors.StudentsTableRowSelector;

    await page.click(linkSelector);
    await page.waitForSelector(studentsSelector);
    await page.waitForNetworkIdle();

    // TODO: extract ina generic way { code, value } for all students
    const studentData = await page.$$eval(`${studentsSelector}`, (rows) => rows.map(tr => ({
      code: (tr.querySelector('td:nth-child(1)') as HTMLTableCellElement).innerText,
      name: (tr.querySelector('td:nth-child(2)') as HTMLTableCellElement).innerText,
      grades: (new Array(25).fill(0)).map((_, index) => `${index}`),
    })));

    classData.students.push(...studentData);

    await this.goToClassList(page);
  }

  private async goToClassList(page: puppeteer.Page): Promise<void> {
    await page.goto(PortalUrls.ClassListByGroup);
    await page.waitForNetworkIdle();
    await page.waitForSelector(PortalSelectors.ClassTableRowSelector);
  }
}
