
export interface GradeDataContract {
  name: string;
  formula: string;
  value: string;
}

export interface StudentDataContract {
  code: string;
  name: string;
  grades: GradeDataContract[];
}

export interface SchoolClassDataContract {
  age: string;
  label: string;
  year: string;
  teacher: { name: string };
  students: StudentDataContract[];
}