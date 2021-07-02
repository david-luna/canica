import { SchoolClassDataTransfer } from '../data-transfer';

export const SCHOOL_CLASSES_FIXTURE: SchoolClassDataTransfer[] = [
  {
    _id: '8cc9c579-1c90-42f4-a678-226e88f86768',
    teacher: {
      name: "Toni Luna",
    },
    year: "2020-2021",
    label: "2n B",
    age: "7",
    students: [
      {
        code: "11111111X",
        name: "Student 1",
        grades: [],
      },
      {
        code: "22222222X",
        name: "Student 2",
        grades: [],
      },
      {
        code: "33333333X",
        name: "Student 3",
        grades: [],
      },
      {
        code: "44444444X",
        name: "Student 4",
        grades: [],
      },
      {
        code: "55555555X",
        name: "Student 5",
        grades: [],
      },
    ],
  }
];
