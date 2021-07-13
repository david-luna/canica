export interface GradeDataTransfer {
  name: string;
  formula: string;
  value: string;
}

export interface StudentDataTransfer {
  code: string;
  name: string;
  grades: GradeDataTransfer[];
}

export interface SchoolClassDataTransfer {
  _id: string;
  age: string;
  label: string;
  year: string;
  teacher: { name: string };
  students: StudentDataTransfer[];
}