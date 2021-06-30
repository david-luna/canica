import { Entity, EntityIdentifier } from '@common/domain';
import { SchoolYear } from './school-year';
import { Teacher } from './teacher';
import { Student } from './student';

export interface SchoolClassProps {
  age: number;
  label: string;
  year: SchoolYear;
  teacher: Teacher;
  students: Student[];
}

export class SchoolClass extends Entity<SchoolClassProps> {
  constructor (props: SchoolClassProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get age(): number {
    return this.props.age;
  }

  get label(): string {
    return this.props.label;
  }

  get year(): SchoolYear {
    return this.props.year;
  }
}
