import { ValueObject } from '@common/domain';
import { GradeRecord } from './grade-record';

export interface StudentRecordProps {
  code: string;
  name: string;
  grades: GradeRecord[];
}

export class StudentRecord extends ValueObject<StudentRecordProps> {
  constructor (props: StudentRecordProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get grades(): GradeRecord[] {
    return this.props.grades;
  }
}
