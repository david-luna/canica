import { Identifier } from '@common/domain';
import { SchoolClass, SchoolYear, Teacher } from '../domain';
import { SchoolClassDataTransfer } from '../data-transfer';
import { StudentMapper } from './student-mapper';


export class SchoolClassMapper {
  static toDataTransfer(schoolClass: SchoolClass): SchoolClassDataTransfer {
    return {
      _id: schoolClass.id.toString(),
      label: schoolClass.label.toString(),
      teacher: { name: schoolClass.teacher.props.name.toString() },
      year: `${schoolClass.props.year.start.getFullYear()}-${schoolClass.props.year.end.getFullYear()}`,
      students: schoolClass.props.students.map(s => StudentMapper.toDataTransfer(s)),
    };
  }

  static toDomain(schoolClass: SchoolClassDataTransfer): SchoolClass {
    return SchoolClass.create(
      {
        label: schoolClass.label,
        teacher: new Teacher(schoolClass.teacher),
        year: new SchoolYear({
          start: new Date(schoolClass.year.substr(0,4)),
          end: new Date(schoolClass.year.substr(5,4)),
        }),
        students: schoolClass.students.map(s => StudentMapper.toDomain(s)),
      },
      new Identifier(schoolClass._id)
    );
  }
}
