export interface GradeRecordDataTransfer {
  code: string;
  name: string;
  options: string[];
}

export interface StudentRecordDataTransfer {
  code: string;
  name: string;
  grades: GradeRecordDataTransfer[];
}

export interface SchoolClassRecordDataTransfer {
  _id: string;
  year: string;
  label: string;
  students: StudentRecordDataTransfer[];
}