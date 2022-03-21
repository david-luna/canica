import { ValueObject } from "@/backend/common/domain";
import { Dimension } from "./dimension";

export interface AreaProps {
  code: string;
  name: string;
  dimensions: Dimension[];
}

export class Area extends ValueObject<AreaProps> {
  private constructor(props: AreaProps) {
    super(props);
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get dimensions(): Dimension[] {
    return this.props.dimensions;
  }

  static create(props: AreaProps): Area {
    return new Area(props);
  }

  addDimension(dimension: Dimension) {
    const dimensions = this.props.dimensions;
    const isInArea = dimensions.some((d) => d.equals(dimension));

    if (isInArea) {
      throw Error(
        `Dimension ${dimension.code} is already in area ${this.code}`
      );
    }

    dimensions.push(dimension);
  }
}
