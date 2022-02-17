import { SchoolClassDataTransfer } from '../data-transfer';

export enum SchoholQueryTypes {
  ListClasses = 'listClasses'
}

export interface ListSchoolClassesQuery {
  year: string;
}

export interface ListSchoolClassesResult {
  type: 'list-classes';
  classes: SchoolClassDataTransfer[];
}
