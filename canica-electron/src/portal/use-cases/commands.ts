export enum PortalCommandTypes {
  ImportData = 'import-data',
}

export interface ImportDataCommand {
  username: string;
  password: string;
  debug: boolean;
}

export interface ImportDataResult {
  type: PortalCommandTypes.ImportData;
}

