import { ValueObject } from "@/backend/common/domain";

export interface GradeProps {
  code: string;
  name: string;
  value: string;
  options: string[];
}

export class Grade extends ValueObject<GradeProps> {
  constructor(props: GradeProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return this.props.value;
  }

  get options(): string[] {
    return this.props.options;
  }
}
