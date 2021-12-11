import { ValueObject } from '@common/domain';

export interface GradeRecordProps {
  code: string;
  name: string;
  options: string[];
}

export class GradeRecord extends ValueObject<GradeRecordProps> {
  constructor (props: GradeRecordProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get options(): string[] {
    return this.props.options;
  }
}
