
export type ImportDataType = 'import-data';

export interface ImportDataCommand {
  vendor: ImportDataType;
}

export interface ImportDataResult {
  type: ImportDataType;
}
