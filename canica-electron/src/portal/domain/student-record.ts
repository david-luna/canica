import { ValueObject } from '@common/domain';

export interface StudentRecordProps {
  code: string;
  name: string;
  grade: string;
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

  get grade(): string {
    return this.props.grade;
  }
}
