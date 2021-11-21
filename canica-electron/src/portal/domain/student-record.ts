import { ValueObject } from '@common/domain';

export interface StudentRecordProps {
  code: string;
  name: string;
  grades: string[];
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

  get grades(): string[] {
    return this.props.grades;
  }
}
