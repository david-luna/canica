import { Area } from "../domain/area";
import { Dimension } from "../domain/dimension";
import { AreaDataTransfer } from "../data-transfer";

export class AreaMapper {
  static toDataTransfer(area: Area): AreaDataTransfer {
    return {
      name: area.name.toString(),
      code: area.code.toString(),
      dimensions: area.dimensions.map((d) => ({
        code: d.code.toString(),
        name: d.name.toString(),
      })),
    };
  }

  static fromDataTransfer(data: AreaDataTransfer): Area {
    return Area.create({
      code: data.code,
      name: data.name,
      dimensions: data.dimensions.map((d) => Dimension.create(d)),
    });
  }
}
