import { ValueObject } from "@common/domain";

export interface GradeProps {
  name: string;
  formula: string;
  value: string;
}

export class Grade extends ValueObject<GradeProps> {
  constructor(props: GradeProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get formula(): string {
    return this.props.formula;
  }

  get value(): string {
    return this.props.value;
  }
}
