import { Entity } from "@/backend/common/domain";
import { SchoolTerm } from "./school-term";

export interface QuarterProps {
  number: number;
  term: SchoolTerm;
}

export class Quarter extends Entity<QuarterProps> {
  private constructor(props: QuarterProps) {
    super(props);
  }

  get number(): number {
    return this.props.number;
  }

  get term(): SchoolTerm {
    return this.props.term;
  }

  static create(props: QuarterProps): Quarter {
    return new Quarter(props);
  }

  static fromDate(date: Date): Quarter {
    const month = date.getMonth();
    const number = month < 4 ? 2 : month < 7 ? 3 : 1;
    const term = SchoolTerm.fromDate(date);

    return new Quarter({ number, term });
  }

  static fromString(value: string): Quarter {
    if (/^\d{2}-\d{2}-T\d/.test(value)) {
      const [shortStart, shortFinish, numberStr] = value.split("-");

      return new Quarter({
        number: parseInt(numberStr.replace("T", ""), 10),
        term: SchoolTerm.create({
          start: new Date(`01/09/20${shortStart}`),
          finish: new Date(`01/09/20${shortFinish}`),
        }),
      });
    }

    return Quarter.fromDate(new Date(value));
  }

  toString(): string {
    const { term, number } = this;
    const shortYear = (d: Date) => `${d.getFullYear()}`.slice(-2);

    return `${shortYear(term.start)}-${shortYear(term.finish)}-T${number}`;
  }
}
