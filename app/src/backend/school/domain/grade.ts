import { ValueObject } from "@/backend/common/domain";

export interface GradeProps {
  dimensionId: string;
  studentId: string;
  name: string;
  value: string;
}

export class Grade extends ValueObject<GradeProps> {
  private constructor(props: GradeProps) {
    super(props);
  }

  get dimensionId(): string {
    return this.props.dimensionId;
  }

  get studentId(): string {
    return this.props.studentId;
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return this.props.value;
  }

  static create(props: GradeProps): Grade {
    return new Grade(props);
  }
}
