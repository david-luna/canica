import { Entity, EntityIdentifier } from "@/backend/common/domain";

export interface TeacherProps {
  name: string;
}

export class Teacher extends Entity<TeacherProps> {
  constructor(props: TeacherProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }
}
