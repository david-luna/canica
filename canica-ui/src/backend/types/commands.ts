
export type ImportDataType = 'import-data';

export interface ImportDataCommand {
  username: string;
  password: string;
  debug: boolean;
}

export interface ImportDataResult {
  type: ImportDataType;
}

export enum CommandTypes {
  ImportData = 'import-data',
}

export type LoginCommandType = 'login';
export type LoginCommandVendor = 'google'; // TODO: maybe others?

export interface LoginCommand {
  vendor: LoginCommandVendor;
}

export interface LoginResult {
  type: LoginCommandType;
}
