import { SchoolClass } from "@school/domain";
import { SchoolClassDataTransfer } from "../data-transfer";
import { StudentMapper } from "./student-mapper";


export class SchoolClassMapper {
  static toDataTransfer(schoolClass: SchoolClass): SchoolClassDataTransfer {
    return {
      age: schoolClass.age.toString(),
      label: schoolClass.label.toString(),
      teacher: { name: schoolClass.teacher.props.name.toString() },
      year: `${schoolClass.props.year.start.getFullYear()}-${schoolClass.props.year.end.getFullYear()}`,
      students: schoolClass.props.students.map(s => StudentMapper.toDataTransfer(s)),
    };
  }
}
