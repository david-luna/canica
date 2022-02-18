/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "annotatron";
import { Repository, EntityIdentifier } from "@/backend/common/domain";
import { SchoolClass } from "./school-class";
import { SchoolYear } from "./school-year";

const errorMessage =
  "SchoolClassRepository abstraction should not be used. Use an implementation instead";

@Injectable()
export class SchoolClassRepository extends Repository<SchoolClass> {
  findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    throw new Error(errorMessage);
  }
  findClassesByYear(year: SchoolYear): Promise<SchoolClass[]> {
    throw new Error(errorMessage);
  }
  exists(schoolClass: SchoolClass): Promise<boolean> {
    throw new Error(errorMessage);
  }
  delete(schoolClass: SchoolClass): Promise<unknown> {
    throw new Error(errorMessage);
  }
  save(schoolClass: SchoolClass): Promise<unknown> {
    throw new Error(errorMessage);
  }
}
