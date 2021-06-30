import { Grade } from "@school/domain/grade";
import { GradeDataContract } from "./data-contracts";

export class GradeMapper {
  static toDataContract(grade: Grade): GradeDataContract {
    return {
      name: grade.name.toString(),
      formula: grade.formula.toString(),
      value: grade.formula.toString(),
    };
  }

  static toDomain(data: GradeDataContract): Grade {
    return new Grade({
      name: data.name,
      formula: data.formula,
      value: data.value,
    });
  }
}
