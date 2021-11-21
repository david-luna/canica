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
      // TODO: remove mocks 
      await this.getClassStudentsMock(page, classData[i], i + 1);
      const record = SchoolClassRecordMapper.toDomain(classData[i]);
      this.eventsBus.dispatchEvents(record);
    }

    console.log('got all classes');

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
    const tableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody';

    await page.goto(PortalUrls.ClassListByGroup);
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

  private async getClassStudentsMock(
    page: puppeteer.Page,
    classData: SchoolClassRecordDataTransfer,
    index: number,
  ): Promise<void> {
    // TODO: add te data from the page
    const students = [...new Array(25)].map((_, index) => new StudentRecord({
      code: `${Math.floor(Math.random() * 10000)}`.padStart(8, '0'),
      name: `Student-${index}`,
      grades: [...new Array(15)].map((_, index) => `${index}`),
    }));

    students.forEach(s => classData.students.push(s));

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private async getClassStudents(
    page: puppeteer.Page,
    classData: SchoolClassRecordDataTransfer,
    index: number,
  ): Promise<void> {
    const tableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody';
    const linkSelector = `${tableSelector} tr:nth-child(${index}) a`;
    const studentsSelector = `[data-st-table="vm.dummyStudents"] tbody tr`;

    console.log('cliking on link', linkSelector);

    await Promise.all([
      page.waitForSelector(studentsSelector),
      page.click(linkSelector),
    ]);

    console.log('extracting student data');


    const studentData = await page.$$eval(`${studentsSelector}`, (rows) => rows.map(tr => ({
      code: (tr.querySelector('td:nth-child(1)') as HTMLTableCellElement).innerText,
      name: (tr.querySelector('td:nth-child(2)') as HTMLTableCellElement).innerText,
      grades: [...new Array(25)].map((_, index) => `${index}`),
    })));

    console.log('students fo class', studentData);

    classData.students.push(...studentData);

    await this.goToClassList(page);
  }

  private async goToClassList(page: puppeteer.Page): Promise<void> {
    const tableSelector = '[data-st-table="vm.display_parcialAvaluacioGrupMaterias"] tbody';

    await page.goto(PortalUrls.ClassListByGroup);
    await page.waitForNetworkIdle();
    await page.waitForSelector(`${tableSelector} tr`);
  }
}
