import { SchoolTerm } from "./school-term";

describe("SchoolTerm model", () => {
  it("should create a term with the given props", () => {
    const term = SchoolTerm.create({
      start: new Date("09/01/2021"),
      finish: new Date("06/30/2021"),
    });

    expect(term).toBeDefined();
  });

  it("should create the calculate the roper term for a given date", () => {
    const term_21_22 = SchoolTerm.fromDate(new Date("10/01/2021"));
    const term_22_23 = SchoolTerm.fromDate(new Date("10/01/2022"));

    expect(term_21_22.start.getFullYear()).toEqual(2021);
    expect(term_21_22.finish.getFullYear()).toEqual(2022);

    expect(term_22_23.start.getFullYear()).toEqual(2022);
    expect(term_22_23.finish.getFullYear()).toEqual(2023);
  });
});
