import { ValueObject } from "@/backend/common/domain";
import { Grade } from "./grade";

export interface StudentProps {
  code: string;
  name: string;
  grades: Grade[];
}

export class Student extends ValueObject<StudentProps> {
  constructor(props: StudentProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get grades(): Grade[] {
    return this.props.grades;
  }
}
