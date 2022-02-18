import { ValueObject } from "@/backend/common/domain";

export interface SchoolYearProps {
  start: Date;
  end: Date;
}

export class SchoolYear extends ValueObject<SchoolYearProps> {
  constructor(props: SchoolYearProps) {
    super(props);
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }
}
