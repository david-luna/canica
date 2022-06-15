/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "annotatron";
import { Repository } from "@/backend/common/domain";
import { AreaRepository } from "../domain/area-repository";
import { Area } from "../domain/area";
import { AREA_DATA } from "./data/area-data";

@Injectable()
export class AreaRepositoryStatic extends AreaRepository {
  findAll(): Promise<Area[]> {
    return Promise.resolve([...AREA_DATA]);
  }

  findAreaByCode(code: string): Promise<Area | null> {
    const index = AREA_DATA.findIndex((a) => a.code === code);

    return Promise.resolve(index !== -1 ? AREA_DATA[index] : null);
  }

  exists(area: Area): Promise<boolean> {
    const index = AREA_DATA.findIndex((a) => a.equals(area));

    return Promise.resolve(index !== -1);
  }

  delete(area: Area): Promise<unknown> {
    const index = AREA_DATA.findIndex((a) => a.equals(area));

    if (index !== -1) {
      AREA_DATA.splice(index, 1);
    }

    return Promise.resolve();
  }

  save(area: Area): Promise<unknown> {
    const index = AREA_DATA.findIndex((a) => a.equals(area));

    if (index !== -1) {
      AREA_DATA.push(area);
    } else {
      AREA_DATA[index] = area;
    }

    return Promise.resolve();
  }
}
