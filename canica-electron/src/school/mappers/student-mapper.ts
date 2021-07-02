import { Student } from "@school/domain";
import { StudentDataTransfer } from "../data-transfer";
import { GradeMapper } from "./grade-mapper";

export class StudentMapper {
  static toDataTransfer(student: Student): StudentDataTransfer {
    return {
      code: student.code.toString(),
      name: student.name.toString(),
      grades: student.grades.map(g => GradeMapper.toDataTransfer(g)),
    };
  }

  static toDomain(data: StudentDataTransfer): Student {
    return new Student({
      code: data.code,
      name: data.name,
      grades: data.grades.map(g => GradeMapper.toDomain(g)),
    });
  }
}
