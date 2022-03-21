import { Area } from "./area";
import { Dimension } from "./dimension";
import { Grade } from "./grade";
import { Evaluation } from "./evaluation";
import { Student } from "./student";
import { StudentsGroup } from "./students-group";
import { Quarter } from "./quarter";

describe("StudentsGroup model", () => {
  let evaluation: Evaluation;

  beforeEach(() => {
    const label = "ClassLabel";
    const studn = Student.create({ code: "S1", name: "Student Name" });
    const dimen = Dimension.create({ name: "D1", code: "D1" });
    const group = StudentsGroup.create({ name: "G1", students: [studn] });
    const quarter = Quarter.fromDate(new Date("09/01/2021"));
    const area = Area.create({
      code: "A1",
      name: "AreaName",
      dimensions: [dimen],
    });

    evaluation = Evaluation.create({ label, quarter, area, group, grades: [] });
  });

  it("should let add a grade for a given student and dimension", () => {
    const grade = Grade.create({
      studentId: "S1",
      dimensionId: "D1",
      name: "G1",
      value: "AE",
    });

    expect(() => evaluation.addGrade(grade)).not.toThrow();
  });

  it("should throw if we try to add a grade form a student which is not in the class", () => {
    const grade = Grade.create({
      studentId: "S2",
      dimensionId: "D1",
      name: "G1",
      value: "AE",
    });
    const errorMessage = "Student with code S2 is not in the class ClassLabel";

    expect(() => evaluation.addGrade(grade)).toThrowError(errorMessage);
  });

  it("should throw if we try to add a grade form a dimenision from a different area", () => {
    const grade = Grade.create({
      studentId: "S1",
      dimensionId: "D2",
      name: "G1",
      value: "AE",
    });
    const errorMessage =
      "Dimension with code D2 does not exists on area AreaName";

    expect(() => evaluation.addGrade(grade)).toThrowError(errorMessage);
  });

  it("should throw if we try to add a grade for the same student and dimension twice", () => {
    const gradeOne = Grade.create({
      studentId: "S1",
      dimensionId: "D1",
      name: "G1",
      value: "AE",
    });
    const gradeTwo = Grade.create({
      studentId: "S1",
      dimensionId: "D1",
      name: "G1",
      value: "AE",
    });
    const errorMessage = "Grade for student S1 and dimension D1 already exists";

    expect(() => evaluation.addGrade(gradeOne)).not.toThrow();
    expect(() => evaluation.addGrade(gradeTwo)).toThrowError(errorMessage);
  });
});
