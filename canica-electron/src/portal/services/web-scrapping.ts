import { app, BrowserWindow, session } from 'electron';
import * as pie from 'puppeteer-in-electron';
import * as puppeteer from 'puppeteer-core';
import { Injectable } from 'annotatron';
import { DomainEventsBus } from '@common/domain';
import { GradeRecordDataTransfer, SchoolClassRecordDataTransfer } from '../data-transfer';
import { SchoolClassRecordMapper } from '../mappers/school-class-record-mapper';
import { GRADES_LIST, GRADE_OPTIONS } from './_fixtures/grades-data';

type ClassListResponse = {
  list: {
    id: number,
    grup: {
      codi: string;
      nom: string;
      cursEscolar: string;
    }
  }[];
}

type StudentDetail = {
  perfilAlumne: {
    idRALC: number;
    nomComplert: string;
  }
};
type StudentListResponse = StudentDetail[];

type PromiseCallback = (valOrError: unknown) => void;
const getDeferred = <T>() => {
  const deferred = {
    resolve: null as PromiseCallback,
    reject: null as PromiseCallback,
    promise: null as Promise<T>,
  };

  deferred.promise = new Promise<T>((res, rej) => {
    deferred.resolve = res;
    deferred.reject = rej;
  });

  return deferred;
}

// TODO: to be removed & passed by the user
const username = process.env.PLATFORM_USERNAME;
const password = process.env.PLATFORM_PASSWORD;

const BASE_URL = 'https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh';
const PortalUrls = {
  Login : BASE_URL,
  ClassList : `${BASE_URL}/avaluacio/parcialAvaluacioGrupAlumne`,
  StudentListByClass : `${BASE_URL}/avaluacio/parcialAvaluacioGrupAlumne#/parcialAvaluacioGrupAlumne/{id}`,
  ClassListFetch : 'services/SessioAvaluacioParcialController/listGrupsClasseGrupAlumne',
  StudentListFetch : 'services/QualificacioFinalDTOServiceController/cerca/alumnes?avaluacio=parcial&idGrupClasse=',
}

interface Credentials { username: string, password: string }

@Injectable()
export class WebScrappingService {
  private browserPromise: Promise<puppeteer.Browser>

  constructor (private eventsBus: DomainEventsBus) {
    this.browserPromise = pie.initialize(app)
      .then(() => pie.connect(app,puppeteer));
  }

  async execute(options = { debug: false }): Promise<void> {
    const webPreferences = { session: session.fromPartition('scrapper') }
    const browser = await this.browserPromise;
    const window  = new BrowserWindow({ show: options.debug, webPreferences });
    const page = await pie.getPage(browser, window);

    try {
      await this.login(page, { username, password });
      const classData  = await this.listClasses(page);
      const gradesData = await this.getGrades(page);

      for(let i = 0; i < classData.length; i++) {
        const currentClass = classData[i];

        await this.getClassStudents(page, currentClass);
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
    const deferred = getDeferred<SchoolClassRecordDataTransfer[]>();
    const captureClasses = async (response: puppeteer.HTTPResponse) => {
      const request = response.request();
      const url = request.url();
      if (response.ok && url.endsWith(PortalUrls.ClassListFetch)) {
        const data = await response.json() as ClassListResponse;
        const classRecods: SchoolClassRecordDataTransfer[] = [];

        data.list.forEach((item) => {
          classRecods.push({
            _id: item.id.toString(),
            year: item.grup.cursEscolar,
            label: item.grup.nom,
            students: [],
          })
        });

        page.off('response', captureClasses);
        deferred.resolve(classRecods);
      }
    };

    page.on('response', captureClasses);
    await page.goto(PortalUrls.ClassList);
    await page.waitForNetworkIdle();

    return deferred.promise;
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
  ): Promise<void> {
    const deferred = getDeferred<void>();
    const captureStudents = async (response: puppeteer.HTTPResponse) => {
      const request = response.request();
      const url = request.url();
      if (response.ok && url.indexOf(PortalUrls.StudentListFetch) !== -1) {
        const data = await response.json() as StudentListResponse;

        data.forEach((item) => {
          classData.students.push({
            code: item.perfilAlumne.idRALC.toString(),
            name: item.perfilAlumne.nomComplert,
            grades: [],
          });
        });

        page.off('response', captureStudents);
        deferred.resolve(void 0);
      }
    };

    page.on('response', captureStudents);
    const studentListUrl = PortalUrls.StudentListByClass.replace('{id}', classData._id)
    await page.goto(studentListUrl);
    await page.waitForNetworkIdle();

    return deferred.promise;
  }
}
