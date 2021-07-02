import { EntityIdentifier } from '@common/domain';
import { SchoolYear } from './school-year';
import { Teacher } from './teacher';
import { Student } from './student';
import { AggregateRoot } from '@common/domain/aggregate-root';

export interface SchoolClassProps {
  age: number;
  label: string;
  year: SchoolYear;
  teacher: Teacher;
  students: Student[];
}

export class SchoolClass extends AggregateRoot<SchoolClassProps> {
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

  get teacher(): Teacher {
    return this.props.teacher;
  }

  get students(): Student[] {
    return this.props.students;
  }
}
