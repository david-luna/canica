import { app, BrowserWindow, session } from "electron";
import * as pie from "puppeteer-in-electron";
import * as puppeteer from "puppeteer-core";
import { Injectable } from "annotatron";
import { Identifier } from "@/backend/common/domain";
import { Student, StudentsGroup } from "../domain";

type ClassListResponse = {
  list: {
    id: number;
    grup: {
      codi: string;
      nom: string;
      cursEscolar: string;
    };
  }[];
};

type StudentDetail = {
  perfilAlumne: {
    idRALC: number;
    nomComplert: string;
  };
};
type StudentListResponse = StudentDetail[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RejectCallback = (reason: any) => void;
type ResolveCallback<T> = (value: T | PromiseLike<T>) => void;

const getDeferred = <T>() => {
  const deferred = {
    resolve: null as unknown as ResolveCallback<T>,
    reject: null as unknown as RejectCallback,
    promise: null as unknown as Promise<T>,
  };

  deferred.promise = new Promise<T>((res, rej) => {
    deferred.resolve = res;
    deferred.reject = rej;
  });

  return deferred;
};

// TODO: to be removed & passed by the user
const username = `${process.env.PLATFORM_USERNAME}`;
const password = `${process.env.PLATFORM_PASSWORD}`;

const BASE_URL = "https://bfgh.aplicacions.ensenyament.gencat.cat/bfgh";
const PortalUrls = {
  Login: BASE_URL,
  GroupList: `${BASE_URL}/avaluacio/parcialAvaluacioGrupAlumne`,
  StudentListByClass: `${BASE_URL}/avaluacio/parcialAvaluacioGrupAlumne#/parcialAvaluacioGrupAlumne/{id}`,
  GroupListFetch:
    "services/SessioAvaluacioParcialController/listGrupsClasseGrupAlumne",
  StudentListFetch:
    "services/QualificacioFinalDTOServiceController/cerca/alumnes?avaluacio=parcial&idGrupClasse=",
};

interface Credentials {
  username: string;
  password: string;
}

@Injectable()
export class PortalService {
  private browserPromise: Promise<puppeteer.Browser>;

  constructor() {
    this.browserPromise = pie
      .initialize(app)
      .then(() => pie.connect(app, puppeteer));
  }

  async getGroups(options = { debug: false }): Promise<StudentsGroup[]> {
    const partitionName = `scrapper_${Date.now()}`;
    const webPreferences = { session: session.fromPartition(partitionName) };
    const browser = await this.browserPromise;
    const window = new BrowserWindow({ show: options.debug, webPreferences });
    const page = await pie.getPage(browser, window);

    try {
      await this.login(page, { username, password });
      const groups = await this.listGroups(page);

      for (let i = 0; i < groups.length; i++) {
        const currentGroup = groups[i];

        await this.getGroupStudents(page, currentGroup);
      }

      return groups;
    } finally {
      window.close();
    }
  }

  private async login(
    page: puppeteer.Page,
    credentials: Credentials
  ): Promise<void> {
    const { username, password } = credentials;

    await page.goto(PortalUrls.Login);
    await page.waitForSelector("#user");
    await page.type("#user", username, { delay: 100 });
    await page.type("#password", password, { delay: 100 });
    await page.click('input[type="submit"]');
    await page.waitForNetworkIdle();
    await page.waitForSelector("#logoutIcon");
  }

  private async listGroups(page: puppeteer.Page): Promise<StudentsGroup[]> {
    const deferred = getDeferred<StudentsGroup[]>();
    const captureGroups = async (response: puppeteer.HTTPResponse) => {
      const request = response.request();
      const url = request.url();
      if (response.ok() && url.endsWith(PortalUrls.GroupListFetch)) {
        const data = (await response.json()) as ClassListResponse;
        const groups: StudentsGroup[] = [];

        data.list.forEach((item) => {
          groups.push(
            StudentsGroup.create(
              { name: item.grup.nom, students: [] },
              new Identifier(item.id.toString())
            )
          );
        });

        page.off("response", captureGroups);
        deferred.resolve(groups);
      }
    };

    page.on("response", captureGroups);
    await page.goto(PortalUrls.GroupList);
    await page.waitForNetworkIdle();

    return deferred.promise;
  }

  private async getGroupStudents(
    page: puppeteer.Page,
    group: StudentsGroup
  ): Promise<void> {
    const deferred = getDeferred<void>();
    const captureStudents = async (response: puppeteer.HTTPResponse) => {
      const request = response.request();
      const url = request.url();
      if (response.ok() && url.indexOf(PortalUrls.StudentListFetch) !== -1) {
        const data = (await response.json()) as StudentListResponse;

        data.forEach((item) => {
          const student = Student.create({
            code: item.perfilAlumne.idRALC.toString(),
            name: item.perfilAlumne.nomComplert,
          });

          group.addStudent(student);
        });

        page.off("response", captureStudents);
        deferred.resolve(void 0);
      }
    };

    page.on("response", captureStudents);
    const studentListUrl = PortalUrls.StudentListByClass.replace(
      "{id}",
      group.id.toString()
    );
    await page.goto(studentListUrl);
    await page.waitForNetworkIdle();

    return deferred.promise;
  }
}
