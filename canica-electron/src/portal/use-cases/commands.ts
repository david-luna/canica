export enum PortalCommandTypes {
  ImportData = 'importData',
}

export interface ImportDataCommand {
  username: string;
  password: string;
  debug: boolean;
}

export interface ImportDataResult {
  type: PortalCommandTypes.ImportData;
}

