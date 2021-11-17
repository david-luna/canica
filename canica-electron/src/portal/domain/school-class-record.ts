import { EntityIdentifier, AggregateRoot } from '@common/domain';
import { SchoolClassRecordCreated } from '.';
import { StudentRecord } from './student-record';

export interface SchoolClassRecordProps {
  label: string;
  year: string;
  students: StudentRecord[];
}

export class SchoolClassRecord extends AggregateRoot<SchoolClassRecordProps> {
  private constructor (props: SchoolClassRecordProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get year(): string {
    return this.props.year;
  }

  get label(): string {
    return this.props.label;
  }

  get students(): StudentRecord[] {
    return this.props.students;
  }

  public static create(props: SchoolClassRecordProps, id?: EntityIdentifier) {
    const record = new SchoolClassRecord(props, id);

    record.addDomainEvent(new SchoolClassRecordCreated(record));

    return record;
  }

  public addStudent(student: StudentRecord) {
    this.props.students.push(student);
  }
}
