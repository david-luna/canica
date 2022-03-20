import { ValueObject } from "@/backend/common/domain";

export interface SubjectProps {
  name: string;
}

export class Subject extends ValueObject<SubjectProps> {
  constructor(props: SubjectProps) {
    super(props);
  }
}
