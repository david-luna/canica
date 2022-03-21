import { StudentsGroup } from "./students-group";
import { Student } from "./student";

describe("StudentsGroup model", () => {
  let group: StudentsGroup;

  beforeEach(() => {
    group = StudentsGroup.create({ name: "G1", students: [] });
  });

  it("should add a student if is not there", () => {
    const student = Student.create({ code: "S1", name: "student_name" });

    group.addStudent(student);
  });

  it("should throw if we try to add the same student", () => {
    const studentOne = Student.create({ code: "S1", name: "student_name" });
    const studentTwo = Student.create({ code: "S1", name: "student_name" });
    const errorMessage = "Student student_name is already in group G1";

    group.addStudent(studentOne);
    expect(() => group.addStudent(studentTwo)).toThrowError(errorMessage);
  });
});
