import { Student } from "../domain";
import { StudentDataTransfer } from "../data-transfer";

export class StudentMapper {
  static toDataTransfer(student: Student): StudentDataTransfer {
    return {
      code: student.code.toString(),
      name: student.name.toString(),
    };
  }

  static toDomain(data: StudentDataTransfer): Student {
    return Student.create({
      code: data.code,
      name: data.name,
    });
  }

  static toStorage(student: Student): string[] {
    return [student.code, student.name];
  }
}
