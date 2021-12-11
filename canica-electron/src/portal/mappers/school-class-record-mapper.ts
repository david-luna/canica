import { Identifier } from '@common/domain';
import { SchoolClassRecord, StudentRecord } from '../domain';
import { SchoolClassRecordDataTransfer } from '../data-transfer';
import { GradeRecord } from '@portal/domain/grade-record';


export class SchoolClassRecordMapper {
  static toDataTransfer(schoolClassRecord: SchoolClassRecord): SchoolClassRecordDataTransfer {
    return {
      _id: schoolClassRecord.id.toString(),
      year: schoolClassRecord.year.toString(),
      label: schoolClassRecord.label.toString(),
      students: schoolClassRecord.props.students.map(s => ({
        code: s.code.toString(),
        name: s.name.toString(),
        grades: s.grades.map(g => ({
          code: g.code.toString(),
          name: g.name.toString(),
          options: g.options.map(o => o.toString()),
        })),
      })),
    };
  }

  static toDomain(schoolClassRecord: SchoolClassRecordDataTransfer): SchoolClassRecord {
    return SchoolClassRecord.create(
      {
        label: schoolClassRecord.label,
        year: schoolClassRecord.year,
        students: schoolClassRecord.students.map(studentRecord => {
          const grades = studentRecord.grades.map(g => new GradeRecord(g));
          const props = { ...studentRecord, grades };
          return new StudentRecord(props)
        }),
      },
      new Identifier(schoolClassRecord._id)
    );
  }
}
