/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "annotatron";
import { Repository } from "@/backend/common/domain";
import { Area } from "./area";

const errorMessage =
  "AreaRepository abstraction should not be used. Use an implementation instead";

@Injectable()
export class AreaRepository extends Repository<Area> {
  findAll(): Promise<Area[]> {
    throw new Error(errorMessage);
  }

  findAreaByCode(id: string): Promise<Area | null> {
    throw new Error(errorMessage);
  }

  exists(area: Area): Promise<boolean> {
    throw new Error(errorMessage);
  }

  delete(area: Area): Promise<unknown> {
    throw new Error(errorMessage);
  }

  save(area: Area): Promise<unknown> {
    throw new Error(errorMessage);
  }
}
