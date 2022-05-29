export interface DimensionDataTransfer {
  code: string;
  name: string;
}
export interface AreaDataTransfer {
  code: string;
  name: string;
  dimensions: DimensionDataTransfer[];
}

export interface GradeDataTransfer {
  studentId: string;
  dimensionId: string;
  name: string;
  value: string;
}

export interface StudentDataTransfer {
  code: string;
  name: string;
}

export interface StudentsGroupDataTransfer {
  _id: string;
  name: string;
  students: StudentDataTransfer[];
}

export interface QuarterDataTransfer {
  number: number;
  term: {
    start: string;
    finish: string;
  };
}

export interface SchoolClassDataTransfer {
  _id: string;
  label: string;
  year: string;
  area: AreaDataTransfer;
  group: StudentsGroupDataTransfer;
  grades: GradeDataTransfer[];
}

export interface EvaluationDataTransfer {
  _id: string;
  status: string;
  label: string;
  area: AreaDataTransfer;
  group: StudentsGroupDataTransfer;
  quarter: QuarterDataTransfer;
  grades: GradeDataTransfer[];
}

export interface EvaluationSummaryDataTransfer {
  _id: string;
  status: string;
  label: string;
  area: AreaDataTransfer;
  group: StudentsGroupDataTransfer;
  quarter: QuarterDataTransfer;
  grades: GradeDataTransfer[];
}
