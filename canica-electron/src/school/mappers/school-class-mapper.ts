import { SchoolClass } from "@school/domain";
import { SchoolClassDataContract } from "./data-contracts";
import { StudentMapper } from "./student-mapper";


export class SchoolClassMapper {
  static toDataContract(schoolClass: SchoolClass): SchoolClassDataContract {
    return {
      age: schoolClass.age.toString(),
      label: schoolClass.label.toString(),
      teacher: { name: schoolClass.teacher.props.name.toString() },
      year: `${schoolClass.props.year.start.getFullYear()}-${schoolClass.props.year.end.getFullYear()}`,
      students: schoolClass.props.students.map(s => StudentMapper.toDataContract(s)),
    };
  }
}
