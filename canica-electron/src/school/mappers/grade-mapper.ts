import { Grade } from "@school/domain/grade";
import { GradeDataTransfer } from "../data-transfer";

export class GradeMapper {
  static toDataTransfer(grade: Grade): GradeDataTransfer {
    return {
      name: grade.name.toString(),
      formula: grade.formula.toString(),
      value: grade.formula.toString(),
    };
  }

  static toDomain(data: GradeDataTransfer): Grade {
    return new Grade({
      name: data.name,
      formula: data.formula,
      value: data.value,
    });
  }
}
