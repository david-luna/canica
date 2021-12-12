import { Grade } from "@school/domain/grade";
import { GradeDataTransfer } from "../data-transfer";

export class GradeMapper {
  static toDataTransfer(grade: Grade): GradeDataTransfer {
    return {
      code: grade.code.toString(),
      name: grade.name.toString(),
      value: grade.value.toString(),
      options: grade.options.map(o => o.toString()),
    };
  }

  static toDomain(data: GradeDataTransfer): Grade {
    return new Grade({
      code: data.code,
      name: data.name,
      value: data.value,
      options: data.options,
    });
  }
}
