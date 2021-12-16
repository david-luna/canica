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
export interface EmailDataTransfer {
  address: string;
}

export interface UserDataTransfer {
  name: string;
  email: EmailDataTransfer;
  picture: string;
}
export interface GradeDataTransfer {
  code: string;
  name: string;
  value: string;
  options: string[];
}

export interface StudentDataTransfer {
  code: string;
  name: string;
  grades: GradeDataTransfer[];
}

export interface SchoolClassDataTransfer {
  _id: string;
  label: string;
  year: string;
  teacher: { name: string };
  students: StudentDataTransfer[];
}
