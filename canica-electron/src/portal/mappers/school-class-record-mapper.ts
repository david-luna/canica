import { Identifier } from '@common/domain';
import { SchoolClassRecord, StudentRecord } from '../domain';
import { SchoolClassRecordDataTransfer } from '../data-transfer';


export class SchoolClassRecordMapper {
  static toDataTransfer(schoolClassRecord: SchoolClassRecord): SchoolClassRecordDataTransfer {
    return {
      _id: schoolClassRecord.id.toString(),
      label: schoolClassRecord.label.toString(),
      students: schoolClassRecord.props.students.map(s => ({
        code: s.code.toString(),
        name: s.name.toString(),
        grade: s.grade.toString(),
      })),
    };
  }

  static toDomain(schoolClassRecord: SchoolClassRecordDataTransfer): SchoolClassRecord {
    return SchoolClassRecord.create(
      {
        label: schoolClassRecord.label,
        students: schoolClassRecord.students.map(props => new StudentRecord(props)),
      },
      new Identifier(schoolClassRecord._id)
    );
  }
}
