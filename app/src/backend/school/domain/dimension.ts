import { ValueObject } from "@/backend/common/domain";

export interface DimensionProps {
  code: string;
  name: string;
}

export class Dimension extends ValueObject<DimensionProps> {
  constructor(props: DimensionProps) {
    super(props);
  }
}
