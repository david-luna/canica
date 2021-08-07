import { EntityIdentifier, AggregateRoot } from '@common/domain';
import { StudentRecord } from './student-record';

export interface SchoolClassRecordProps {
  label: string;
  students: StudentRecord[];
}

export class SchoolClassRecord extends AggregateRoot<SchoolClassRecordProps> {
  constructor (props: SchoolClassRecordProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get label(): string {
    return this.props.label;
  }

  get students(): StudentRecord[] {
    return this.props.students;
  }
}
