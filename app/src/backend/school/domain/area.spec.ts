import { Area } from "./area";
import { Dimension } from "./dimension";

describe("Area model", () => {
  let area: Area;

  beforeEach(() => {
    area = Area.create({ code: "A1", name: "area", dimensions: [] });
  });

  it("should add a dimension if is not there", () => {
    const dimension = Dimension.create({ code: "D1", name: "dimension" });

    area.addDimension(dimension);
  });

  it("should throw if we try to add the same dimension", () => {
    const dimensionOne = Dimension.create({ code: "D1", name: "dimension" });
    const dimensionTwo = Dimension.create({ code: "D1", name: "dimension" });
    const errorMessage = "Dimension D1 is already in area A1";

    area.addDimension(dimensionOne);
    expect(() => area.addDimension(dimensionTwo)).toThrowError(errorMessage);
  });
});
