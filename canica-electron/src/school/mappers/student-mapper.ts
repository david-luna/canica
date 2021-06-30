import { Student } from "@school/domain";
import { StudentDataContract } from "./data-contracts";
import { GradeMapper } from "./grade-mapper";

export class StudentMapper {
  static toDataContract(student: Student): StudentDataContract {
    return {
      code: student.code.toString(),
      name: student.name.toString(),
      grades: student.grades.map(g => GradeMapper.toDataContract(g)),
    };
  }

  static toDomain(data: StudentDataContract): Student {
    return new Student({
      code: data.code,
      name: data.name,
      grades: data.grades.map(g => GradeMapper.toDomain(g)),
    });
  }
}
