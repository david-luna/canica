import { Entity } from "@/backend/common/domain";

export interface SchoolTermProps {
  start: Date;
  finish: Date;
}

export class SchoolTerm extends Entity<SchoolTermProps> {
  private constructor(props: SchoolTermProps) {
    super(props);
  }

  get start(): Date {
    return this.props.start;
  }

  get finish(): Date {
    return this.props.finish;
  }

  static create(props: SchoolTermProps): SchoolTerm {
    return new SchoolTerm(props);
  }

  static fromDate(date: Date): SchoolTerm {
    const month = date.getMonth();
    const number = month < 4 ? 2 : month < 7 ? 3 : 1;
    const offset = number > 1 ? -1 : 0;
    const year = date.getFullYear() + offset;

    return new SchoolTerm({
      start: new Date(`09/01/${year}`),
      finish: new Date(`06/30/${year + 1}`),
    });
  }
}
