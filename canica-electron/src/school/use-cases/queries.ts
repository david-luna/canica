import { SchoolClassDataTransfer } from '../data-transfer';


export interface ListSchoolClassesQuery {
  year: string;
}

export interface ListSchoolClassesResult {
  type: 'list-classes';
  classes: SchoolClassDataTransfer[];
}
