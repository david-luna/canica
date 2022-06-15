import { ValueObject } from "@/backend/common/domain";
import { Grade } from "./grade";

export interface StudentProps {
  code: string;
  name: string;
}

export class Student extends ValueObject<StudentProps> {
  private constructor(props: StudentProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  static create(props: StudentProps): Student {
    return new Student(props);
  }
}
