import { ValueObject } from "@/backend/common/domain";
import { Dimension } from "./dimension";

export interface AreaProps {
  code: string;
  name: string;
  dimensions: Dimension[];
}

export class Area extends ValueObject<AreaProps> {
  constructor(props: AreaProps) {
    super(props);
  }
}
