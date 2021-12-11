import { app, BrowserWindow, session } from 'electron';
import * as pie from 'puppeteer-in-electron';
import * as puppeteer from 'puppeteer-core';
import { Injectable } from 'annotatron';
import { DomainEventsBus } from '@common/domain';
import { GradeRecordDataTransfer, SchoolClassRecordDataTransfer } from '../data-transfer';
import { SchoolClassRecordMapper } from '../mappers/school-class-record-mapper';
import { GRADES_LIST, GRADE_OPTIONS } from './_fixtures/grades-data';

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
  GradesTableRowSelector = 'table.grades-table > tbody > tr > td > div > div',
}

interface Credentials { username: string, password: string }

@Injectable()
export class WebScrappingService {
  private browserPromise: Promise<puppeteer.Browser>

  constructor (private eventsBus: DomainEventsBus) {
    this.browserPromise = pie.initialize(app)
      .then(() => pie.connect(app,puppeteer));
  }

  async execute(): Promise<void> {
    const webPreferences = { session: session.fromPartition('scrapper') }
    const browser = await this.browserPromise;
    const window  = new BrowserWindow({ webPreferences });
    const page = await pie.getPage(browser, window);

    window.webContents.openDevTools();

    try {
      await this.login(page, { username, password });
      const classData  = await this.listClasses(page);
      const gradesData = await this.getGrades(page);

      for(let i = 0; i < classData.length; i++) {
        const currentClass = classData[i];
        await this.getClassStudents(page, currentClass, i + 1);

        currentClass.students.forEach(student => student.grades = gradesData);

        const record = SchoolClassRecordMapper.toDomain(classData[i]);
        this.eventsBus.dispatchEvents(record);
      }
    } finally {
      window.close();
    }
  }

  private async login(page: puppeteer.Page, credentials: Credentials ): Promise<void> {
    const { username, password } = credentials;

    await page.goto(PortalUrls.Login);
    await page.waitForSelector('#user');
    await page.type('#user', username, { delay: 100 });
    await page.type('#password', password, { delay: 100 });
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

  // TODO: static for now since is unlikely to cange
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getGrades(page: puppeteer.Page): Promise<GradeRecordDataTransfer[]> {
    const grades = GRADES_LIST;
    const options = GRADE_OPTIONS;

    return grades.map(g => ({ ...g, options }))
  }

  private async getClassStudents(
    page: puppeteer.Page,
    classData: SchoolClassRecordDataTransfer,
    index: number,
  ): Promise<void> {
    // TODO: refactor to goToStudentsList
    const tableSelector = PortalSelectors.ClassTableRowSelector;
    const linkSelector = `${tableSelector}:nth-child(${index}) a`;
    const studentsSelector = PortalSelectors.StudentsTableRowSelector;

    await page.click(linkSelector);
    await page.waitForSelector(studentsSelector);
    await page.waitForNetworkIdle();

    const studentData = await page.$$eval(`${studentsSelector}`, (rows) => rows.map(tr => ({
      code: (tr.querySelector('td:nth-child(1)') as HTMLTableCellElement).innerText,
      name: (tr.querySelector('td:nth-child(2)') as HTMLTableCellElement).innerText,
      grades: [],
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
