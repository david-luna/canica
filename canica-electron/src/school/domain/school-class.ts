import { Entity } from '@common/domain';

interface SchoolClassProps {
  age: number;
  label: string;
  year: number;
}

export class SchoolClass extends Entity<SchoolClassProps> {
  constructor (props: SchoolClassProps) {
    super(props);
  }

  get age(): number {
    return this.props.age;
  }

  get label(): string {
    return this.props.label;
  }

  get year(): number {
    return this.props.year;
  }
}
