import { EntityIdentifier } from "@/backend/common/domain";
import { SchoolYear } from "./school-year";
import { Teacher } from "./teacher";
import { Student } from "./student";
import { AggregateRoot } from "@/backend/common/domain/aggregate-root";

export interface SchoolClassProps {
  label: string;
  year: SchoolYear;
  teacher: Teacher;
  students: Student[];
}

export class SchoolClass extends AggregateRoot<SchoolClassProps> {
  private constructor(props: SchoolClassProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get id(): EntityIdentifier {
    return this._id;
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

  static create(props: SchoolClassProps, id?: EntityIdentifier): SchoolClass {
    return new SchoolClass(props, id);
  }
}
