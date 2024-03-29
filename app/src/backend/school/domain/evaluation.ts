import { AggregateRoot, EntityIdentifier } from "@/backend/common/domain";
import { Area } from "./area";
import { Grade } from "./grade";
import { Quarter } from "./quarter";
import { StudentsGroup } from "./students-group";

export enum EvaluationStatus {
  Imported = "imported",
  Uploaded = "uploaded",
}

export interface EvaluationProps {
  label: string;
  area: Area;
  group: StudentsGroup;
  quarter: Quarter;
  grades: Grade[];
  status: EvaluationStatus;
}

export class Evaluation extends AggregateRoot<EvaluationProps> {
  private constructor(props: EvaluationProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get id(): EntityIdentifier {
    return this._id;
  }

  get label(): string {
    return this.props.label;
  }

  get area(): Area {
    return this.props.area;
  }

  get group(): StudentsGroup {
    return this.props.group;
  }

  get quarter(): Quarter {
    return this.props.quarter;
  }

  get grades(): Grade[] {
    return this.props.grades;
  }

  get status(): EvaluationStatus {
    return this.props.status;
  }

  static create(props: EvaluationProps, id?: EntityIdentifier): Evaluation {
    return new Evaluation(props, id);
  }

  addGrade(grade: Grade): void {
    const students = this.props.group.students;
    const hasStudent = students.some((s) => s.code === grade.studentId);

    if (!hasStudent) {
      throw Error(
        `Student with code ${grade.studentId} is not in the class ${this.props.label}`
      );
    }

    const dimenisions = this.props.area.dimensions;
    const hasDimension = dimenisions.some((d) => d.code === grade.dimensionId);

    if (!hasDimension) {
      throw Error(
        `Dimension with code ${grade.dimensionId} does not exists on area ${this.props.area.name}`
      );
    }

    const grades = this.props.grades;
    const isInEvaluation = grades.some((g) => g.equals(grade));

    if (isInEvaluation) {
      throw Error(
        `Grade for student ${grade.studentId} and dimension ${grade.dimensionId} already exists`
      );
    }

    grades.push(grade);
  }
}
