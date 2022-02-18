import { Injectable, Event, emitEvent } from "annotatron";
import { OAuth2Client } from "google-auth-library";
import { drive, drive_v3 } from "@googleapis/drive";
import { sheets, sheets_v4 } from "@googleapis/sheets";
import {
  EntityIdentifier,
  DomainEventsBus,
  Identifier,
} from "@/backend/common/domain";
import {
  SchoolClass,
  SchoolClassRepository,
  SchoolYear,
  Teacher,
} from "../domain";
import { StudentMapper } from "@/backend/school/mappers";

interface GoogleToken {
  access_token: string;
}

interface FileDetails {
  id: string;
  name: string;
}

// TODO: maybe a utility class
const FILE_MIME_TYPE = "application/vnd.google-apps.spreadsheet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthRequired(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    if (!this.googleDrive) {
      throw new Error("Forbidden access to query data");
    }
    return originalMethod.apply(this, args);
  };
}

@Injectable()
export class SchoolClassRepositoryGoogleDrive extends SchoolClassRepository {
  private googleDrive: drive_v3.Drive;
  private googleSheets: sheets_v4.Sheets;
  private googleFolderId: string;

  constructor(private eventsBus: DomainEventsBus) {
    super();
  }

  @AuthRequired
  async exists(schoolClass: SchoolClass): Promise<boolean> {
    const result = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name contains '${schoolClass.id}'`,
        `mimeType = '${FILE_MIME_TYPE}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    return result.data.files.some(
      (file) => file.id === schoolClass.id.toString()
    );
  }

  @AuthRequired
  async findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    const result = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name contains '${id}'`,
        `mimeType = '${FILE_MIME_TYPE}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (result.data.files.length === 0) {
      return null;
    }

    return this.fromDetails(result.data.files[0] as FileDetails);
  }

  @AuthRequired
  async findClassesByYear(year: SchoolYear): Promise<SchoolClass[]> {
    const fileMimeType = "application/vnd.google-apps.spreadsheet";
    const result = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name contains '${year.start.getFullYear()}__${year.end.getFullYear()}'`,
        `mimeType = '${fileMimeType}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    return result.data.files.map((file) =>
      this.fromDetails(file as FileDetails)
    );
  }

  @AuthRequired
  async delete(schoolClass: SchoolClass): Promise<unknown> {
    const result = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name contains '${schoolClass.id}'`,
        `mimeType = '${FILE_MIME_TYPE}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (result.data.files.length === 0) {
      return;
    }

    const fileId = result.data.files[0].id;

    await this.googleDrive.files.delete({ fileId });
  }

  @AuthRequired
  async save(schoolClass: SchoolClass): Promise<unknown> {
    const fileMimeType = "application/vnd.google-apps.spreadsheet";

    // Check if already exists
    const list = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name contains '${schoolClass.label}'`,
        `mimeType = '${fileMimeType}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (list.data.files.length > 0) {
      // TODO: update the file!?!?!?
      this.googleFolderId = list.data.files[0].id;
      return;
    }

    // Create the file if not present
    const result = await this.googleDrive.files.create({
      requestBody: {
        name: [
          `${schoolClass.id}`,
          `${schoolClass.label}`,
          `${schoolClass.year.start.getFullYear()}`,
          `${schoolClass.year.end.getFullYear()}`,
          `${schoolClass.teacher.name}`,
        ].join("__"),
        mimeType: fileMimeType,
        parents: [this.googleFolderId],
        description: `Grades of the class ${schoolClass.label} with teacher ${schoolClass.teacher.name}`,
      },
    });

    // With the file ID use the spreadsheet API to add content
    const spreadsheetId = result.data.id;
    await this.saveStudents(schoolClass, spreadsheetId);

    this.eventsBus.dispatchEvents(schoolClass);
    return Promise.resolve();
  }

  /**
   * Stores te students info into the spreadseet related to the ID
   *
   * @param schoolClass the class of te students (aggreagate)
   * @param spreadsheetId indicates which spreadsheed must contain the students
   */
  private async saveStudents(
    schoolClass: SchoolClass,
    spreadsheetId: string
  ): Promise<void> {
    const gradesList = schoolClass.students[0].grades;
    const studentHeaders = [
      "CODI",
      "ALUMNE",
      ...gradesList.map((grade) => grade.code),
    ];
    const result = await this.googleSheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: "RAW",
        data: [
          {
            range: "Sheet1!A:ZZ",
            majorDimension: "ROWS",
            values: [
              studentHeaders,
              ...schoolClass.students.map((s) => StudentMapper.toStorage(s)),
            ],
          },
        ],
      },
    });

    const startRowIndex = 1,
      endRowIndex = schoolClass.students.length + 1;
    const startColumnIndex = 2,
      endColumnIndex = schoolClass.students[0].grades.length + 2;
    const gradeList = schoolClass.students[0].grades;
    const gradeOptions = gradeList[0].options;
    const format = await this.googleSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // Add notes for grade codes
          {
            updateCells: {
              range: {
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex,
                endColumnIndex,
              },
              rows: [{ values: gradesList.map((g) => ({ note: g.name })) }],
              fields: "note",
            },
          },
          // Create dropdows for grade options
          {
            setDataValidation: {
              range: {
                startRowIndex,
                endRowIndex,
                startColumnIndex,
                endColumnIndex,
              },
              rule: {
                condition: {
                  type: "ONE_OF_LIST",
                  values: gradeOptions.map((go) => ({ userEnteredValue: go })),
                },
                showCustomUi: true,
                strict: true,
              },
            },
          },
        ],
      },
    });

    if (result.status !== 200 || format.status !== 200) {
      // TODO: proper error type & payload
      const source = result.status !== 200 ? result : format;
      emitEvent({
        type: "GoogleError",
        payload: `Error saving class data ${source.statusText}`,
      });
    }
  }

  /**
   * Returns a school class object form the file details
   * TODO: make it async to read cells of the file
   *
   * @param file the drive file details (id, name, ...)
   */
  private fromDetails(file: FileDetails): SchoolClass {
    const [label, startYear, endYear, teacherName, id] = file.name.split("__");

    return SchoolClass.create(
      {
        label: label,
        teacher: new Teacher({ name: teacherName }),
        year: new SchoolYear({
          start: new Date(`09/01/${startYear}`),
          end: new Date(`06/21/${endYear}`),
        }),
        // TODO: add students
        students: [],
      },
      new Identifier(id)
    );
  }

  /**
   * Configures the drive API for data manipulation
   *
   * @param token the auth token
   */
  @Event("google_authorized")
  private async prepareStorage(token: GoogleToken): Promise<void> {
    const folderMimeType = "application/vnd.google-apps.folder";
    const authClient = new OAuth2Client();

    // Setup auth client
    authClient.setCredentials(token);
    this.googleDrive = drive({ version: "v3", auth: authClient });
    this.googleSheets = sheets({ version: "v4", auth: authClient });

    // List containing folder
    const list = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name = 'canica'`,
        `trashed = false`,
        `mimeType = '${folderMimeType}'`,
      ].join(" and "),
    });

    if (list.data.files.length > 0) {
      this.googleFolderId = list.data.files[0].id;
      return;
    }

    // If not listed create it
    const result = await this.googleDrive.files.create({
      requestBody: { name: "canica", mimeType: folderMimeType },
    });

    this.googleFolderId = result.data.id;
  }
}
