// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../node_modules/@googleapis/drive/build/v3.d.ts" />

import { Injectable, Event } from "annotatron";
import { OAuth2Client } from "google-auth-library";
import { drive, drive_v3 } from "@googleapis/drive";
import { sheets, sheets_v4 } from "@googleapis/sheets";
import { DomainEventsBus } from "@/backend/common/domain";
import { StudentMapper } from "@/backend/school/mappers";
import { Evaluation, EvaluationRepository } from "@/backend/school/domain";

import { GoogleToken, MimeType, WithGoogleToken } from "./google-utils";
import {
  EvaluationMapper,
  EvaluationStorageProps,
} from "../mappers/evaluation-mapper";

const defaultListParams: Partial<drive_v3.Params$Resource$Files$List> = {
  corpora: "user",
  spaces: "drive",
};

@Injectable()
export class EvaluationRepositoryGoogle extends EvaluationRepository {
  private googleAuth: OAuth2Client;
  private googleDrive: drive_v3.Drive;
  private googleSheets: sheets_v4.Sheets;
  private googleToken!: GoogleToken;
  private googleFolderId!: string;

  constructor(private eventsBus: DomainEventsBus) {
    super();

    this.googleAuth = new OAuth2Client();
    this.googleDrive = drive({ version: "v3", auth: this.googleAuth });
    this.googleSheets = sheets({ version: "v4", auth: this.googleAuth });
  }

  @WithGoogleToken
  async listEvaluationsSummary(): Promise<Evaluation[]> {
    const result = await this.googleDrive.files.list({
      ...defaultListParams,
      fields: "files/id, files/name, files/appProperties",
      q: [
        `mimeType = '${MimeType.Spreadsheet}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (!result.data.files) {
      return [];
    }

    return result.data.files
      .map((file) => file.appProperties as EvaluationStorageProps)
      .map(EvaluationMapper.fromStorageProps);
  }

  @WithGoogleToken
  async findById(...ids: string[]): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = [];

    // TODO: do the query properly
    const result = await this.googleDrive.files.list({
      ...defaultListParams,
      fields: "files/id, files/name, files/appProperties",
      q: [
        `mimeType = '${MimeType.Spreadsheet}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (result.status !== 200) {
      throw new Error(`EvaluationRepository: error connection to storage.`);
    }

    const files = result.data.files || [];

    for (const file of files) {
      const evaluation = await this.extractEvaluation(file);
      evaluations.push(evaluation);
    }

    return evaluations;
  }

  @WithGoogleToken
  async exists(evaluation: Evaluation): Promise<boolean> {
    // TODO: check if appProperties can be included in the query
    const result = await this.googleDrive.files.list({
      ...defaultListParams,
      fields: "files/id, files/name, files/appProperties",
      q: [
        `name = '${evaluation.label}'`,
        `mimeType = '${MimeType.Spreadsheet}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    return (result.data.files || []).length > 1;
  }

  @WithGoogleToken
  async delete(evaluation: Evaluation): Promise<void> {
    const result = await this.googleDrive.files.list({
      ...defaultListParams,
      fields: "files/id, files/name",
      q: [
        `name = '${evaluation.label}'`,
        `mimeType = '${MimeType.Spreadsheet}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (result.data.files && result.data.files.length) {
      const fileId = result.data.files[0].id + "";

      await this.googleDrive.files.delete({ fileId });
    }
  }

  @WithGoogleToken
  async save(evaluation: Evaluation): Promise<void> {
    // Check if already exists
    const list = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name = '${evaluation.label}'`,
        `mimeType = '${MimeType.Spreadsheet}'`,
        `'${this.googleFolderId}' in parents`,
      ].join(" and "),
    });

    if (list.data.files && list.data.files.length) {
      const [file] = list.data.files;
      await this.updateSpreadsheet(evaluation, `${file.id}`);
    } else {
      await this.createSpreadsheet(evaluation);
    }

    this.eventsBus.dispatchEvents(evaluation);
    return Promise.resolve();
  }

  /**
   * Creates a new spreadsheed from an evaluation
   * @param evaluation the evaluation to store
   */
  private async createSpreadsheet(evaluation: Evaluation): Promise<void> {
    const createResponse = await this.googleDrive.files.create({
      requestBody: {
        name: `${evaluation.label}`,
        mimeType: MimeType.Spreadsheet,
        parents: [this.googleFolderId],
        description: `Evaluation of the group ${evaluation.group.name}`,
        appProperties: {
          ...EvaluationMapper.toStorageProps(evaluation),
        },
      },
    });

    if (createResponse.status !== 200) {
      throw Error(
        `Error creating evaluation file: ${createResponse.statusText}`
      );
    }

    // With the file ID use the spreadsheet API to add content
    const spreadsheetId = `${createResponse.data.id}`;
    const dimensionCodes = evaluation.area.dimensions.map((d) => d.code);
    const headers = ["CODI", "ALUMNE", ...dimensionCodes, evaluation.area.code];
    const rows = evaluation.group.students.map(StudentMapper.toStorage);

    const contentResponse =
      await this.googleSheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: "RAW",
          data: [
            {
              range: "Sheet1!A:ZZ",
              majorDimension: "ROWS",
              values: [headers, ...rows],
            },
          ],
        },
      });

    const dimensionNotes = evaluation.area.dimensions.map((d) => ({
      note: d.name,
    }));
    const formatResponse = await this.googleSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateCells: {
              range: {
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 2,
                endColumnIndex: headers.length + 2,
              },
              rows: [
                { values: [...dimensionNotes, { note: evaluation.area.name }] },
              ],
              fields: "note",
            },
          },
        ],
      },
    });

    if (contentResponse.status !== 200 || formatResponse.status !== 200) {
      const source =
        contentResponse.status !== 200 ? contentResponse : formatResponse;
      throw Error(`Error creating evaluation contents: ${source.statusText}`);
    }
  }

  /**
   * Updates a spreadsheet form a given evaluation
   * @param evaluation the evaluation to store
   * @param spreadsheetId the ID of the file to update
   */
  private async updateSpreadsheet(
    evaluation: Evaluation,
    spreadsheetId: string
  ): Promise<void> {
    console.log(`Update evaluation ${evaluation.id} into ${spreadsheetId}`);
    throw Error("Update evaluation into spreadsheet not implemented!");
  }

  /**
   * Returns the evaluation from the given file
   *
   * @param file the spreadsheet file which contains evaluation data
   * @returns Evaluation
   */
  private async extractEvaluation(
    file: drive_v3.Schema$File
  ): Promise<Evaluation> {
    const props = file.appProperties as EvaluationStorageProps;
    const evaluation = EvaluationMapper.fromStorageProps(props);

    // TODO: get file contents and fill evaluation with students and their grades

    return evaluation;
  }

  /**
   * Fills the cells of the document
   */
  // private async saveContents(
  //   evaluation: Evaluation,
  //   spreadsheetId: string
  // ): Promise<void> {

  //   // TODO: this is to add a selector for grades (maybe use it later)
  //   const GRADE_OPTIONS = ["AE", "AN", "AS", "NA"];
  //   const startRowIndex = 1;
  //   const endRowIndex = rows.length + 1;
  //   const startColumnIndex = 2;
  //   const endColumnIndex = headers.length + 2;

  //   const format = await this.googleSheets.spreadsheets.batchUpdate({
  //     spreadsheetId,
  //     requestBody: {
  //       requests: [
  //         // dropdowns for grades
  //         {
  //           setDataValidation: {
  //             range: {
  //               startRowIndex,
  //               endRowIndex,
  //               startColumnIndex,
  //               endColumnIndex,
  //             },
  //             rule: {
  //               condition: {
  //                 type: "ONE_OF_LIST",
  //                 values: GRADE_OPTIONS.map((go) => ({ userEnteredValue: go })),
  //               },
  //               showCustomUi: true,
  //               strict: true,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   });
  // }
  /**
   * Sets the Auth credentials for the client and ensures a folder is available
   * to contain the spreadsheets
   *
   * @param token the auth token
   */
  @Event("google_authorized")
  private async setupClient(token: GoogleToken): Promise<void> {
    this.googleToken = token;
    this.googleAuth.setCredentials(this.googleToken);

    // List containing folder
    const list = await this.googleDrive.files.list({
      corpora: "user",
      spaces: "drive",
      fields: "files/id, files/name",
      q: [
        `name = 'canica'`,
        `trashed = false`,
        `mimeType = '${MimeType.Folder}'`,
      ].join(" and "),
    });

    if (list.data.files && list.data.files.length > 0) {
      this.googleFolderId = `${list.data.files[0].id}`;
      return;
    }

    // If not listed create it
    const result = await this.googleDrive.files.create({
      requestBody: { name: "canica", mimeType: MimeType.Folder },
    });

    this.googleFolderId = `${result.data.id}`;
  }
}
