import { Entity } from '@common/domain';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  constructor (props: StudentProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }
}
