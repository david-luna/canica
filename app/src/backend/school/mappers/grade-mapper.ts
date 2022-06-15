import { Grade } from "@/backend/school/domain/grade";
import { GradeDataTransfer } from "../data-transfer";

export class GradeMapper {
  static toDataTransfer(grade: Grade): GradeDataTransfer {
    return {
      dimensionId: grade.dimensionId.toString(),
      studentId: grade.studentId.toString(),
      name: grade.name.toString(),
      value: grade.value.toString(),
    };
  }

  static toDomain(data: GradeDataTransfer): Grade {
    return Grade.create({
      dimensionId: data.dimensionId,
      studentId: data.studentId,
      name: data.name,
      value: data.value,
    });
  }
}
