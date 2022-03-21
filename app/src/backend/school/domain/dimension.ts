import { ValueObject } from "@/backend/common/domain";

export interface DimensionProps {
  code: string;
  name: string;
}

export class Dimension extends ValueObject<DimensionProps> {
  private constructor(props: DimensionProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  static create(props: DimensionProps): Dimension {
    return new Dimension(props);
  }
}
