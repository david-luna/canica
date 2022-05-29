import { Quarter } from "./quarter";
import { SchoolTerm } from "./school-term";

describe("Quarter model", () => {
  it("should create a quarter with the given props", () => {
    const term = SchoolTerm.create({
      start: new Date("09/01/2021"),
      finish: new Date("06/30/2021"),
    });

    expect(Quarter.create({ number: 1, term })).toBeDefined();
  });

  it("should create the 1st quarter of a term from a given date in that quarter", () => {
    const quarter = Quarter.fromDate(new Date("10/01/2021"));

    expect(quarter.number).toEqual(1);
    expect(quarter.term.start.getFullYear()).toEqual(2021);
    expect(quarter.term.finish.getFullYear()).toEqual(2022);
  });

  it("should create the 2nd quarter of a term from a given date in that quarter", () => {
    const quarter = Quarter.fromDate(new Date("02/01/2022"));

    expect(quarter.number).toEqual(2);
    expect(quarter.term.start.getFullYear()).toEqual(2021);
    expect(quarter.term.finish.getFullYear()).toEqual(2022);
  });

  it("should create the 3rd quarter of a term from a given date in that quarter", () => {
    const quarter = Quarter.fromDate(new Date("05/01/2022"));

    expect(quarter.number).toEqual(3);
    expect(quarter.term.start.getFullYear()).toEqual(2021);
    expect(quarter.term.finish.getFullYear()).toEqual(2022);
  });

  it("should return a string representation of the quarter", () => {
    const quarter = Quarter.fromDate(new Date("05/01/2022"));

    expect(quarter.toString()).toEqual("21-22-T3");
  });

  it("should create a quarter from its string representation", () => {
    const quarter = Quarter.fromString("21-22-T3");

    expect(quarter.number).toEqual(3);
    expect(quarter.term.start.getFullYear()).toEqual(2021);
    expect(quarter.term.finish.getFullYear()).toEqual(2022);
  });

  it("should create a quarter from a string date", () => {
    const quarter = Quarter.fromString("5/20/2022, 1:02:24 AM");

    expect(quarter.number).toEqual(3);
    expect(quarter.term.start.getFullYear()).toEqual(2021);
    expect(quarter.term.finish.getFullYear()).toEqual(2022);
  });
});
