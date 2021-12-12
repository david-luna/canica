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
