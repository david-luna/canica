import { EntityIdentifier, Entity } from '@common/domain';

export interface StudentRecordProps {
  code: string;
  name: string;
  grade: string;
}

export class StudentRecord extends Entity<StudentRecordProps> {
  constructor (props: StudentRecordProps, id?: EntityIdentifier) {
    super(props, id);
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
