import { EntityIdentifier, AggregateRoot } from '@common/domain';
import { SchoolClassRecordCreated } from '.';
import { StudentRecord } from './student-record';

export interface SchoolClassRecordProps {
  label: string;
  students: StudentRecord[];
}

export class SchoolClassRecord extends AggregateRoot<SchoolClassRecordProps> {
  private constructor (props: SchoolClassRecordProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get label(): string {
    return this.props.label;
  }

  get students(): StudentRecord[] {
    return this.props.students;
  }

  public static create(props: SchoolClassRecordProps, id?: EntityIdentifier) {
    // TODO: props validation
    const record = new SchoolClassRecord(props, id);

    record.addDomainEvent(new SchoolClassRecordCreated(record));

    return record;
  }
}
