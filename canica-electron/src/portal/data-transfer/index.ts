export interface StudentRecordDataTransfer {
  code: string;
  name: string;
  grades: string[];
}

export interface SchoolClassRecordDataTransfer {
  _id: string;
  year: string;
  label: string;
  students: StudentRecordDataTransfer[];
}