export interface StudentRecordDataTransfer {
  code: string;
  name: string;
  grade: string;
}

export interface SchoolClassRecordDataTransfer {
  _id: string;
  year: string;
  label: string;
  students: StudentRecordDataTransfer[];
}