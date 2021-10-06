
export type ImportDataType = 'import-data';

export interface ImportDataCommand {
  username: string;
  password: string;
}

export interface ImportDataResult {
  type: ImportDataType;
}

export enum CommandTypes {
  ImportData = 'import-data',
}
