import { Entity, EntityIdentifier } from "@/backend/common/domain";
import { Student } from "./student";

export interface StudentsGroupProps {
  name: string;
  students: Student[];
}

export class StudentsGroup extends Entity<StudentsGroupProps> {
  private constructor(props: StudentsGroupProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get id(): EntityIdentifier {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get students(): Student[] {
    return this.props.students;
  }

  static create(
    props: StudentsGroupProps,
    id?: EntityIdentifier
  ): StudentsGroup {
    return new StudentsGroup(props, id);
  }

  /**
   * Add a new sutden into the group
   *
   * @param student the student to add
   */
  addStudent(student: Student): void {
    const students = this.props.students;
    const isInGroup = students.some((s) => s.equals(student));

    if (isInGroup) {
      throw Error(
        `Student ${student.name} is already in group ${this.props.name}`
      );
    }

    students.push(student);
  }
}
