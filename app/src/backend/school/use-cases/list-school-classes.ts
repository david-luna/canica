import { Injectable, Query } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import { SchoolClassMapper } from "../mappers";
import { SchoolClassRepository, SchoolYear } from "../domain";
import { ListSchoolClassesQuery, ListSchoolClassesResult } from "./queries";

@Injectable()
export class ListSchoolClassesUseCase
  implements UseCase<ListSchoolClassesQuery, ListSchoolClassesResult>
{
  constructor(private classesRepo: SchoolClassRepository) {}

  @Query("list-classes")
  execute(request: ListSchoolClassesQuery): Promise<ListSchoolClassesResult> {
    console.log("use case", request);
    const schoolYear = new SchoolYear({
      start: new Date(request.year.split("-")[0]),
      end: new Date(request.year.split("-")[1]),
    });

    return this.classesRepo.findClassesByYear(schoolYear).then((classes) => {
      return {
        type: "list-classes",
        classes: classes.map((sc) => SchoolClassMapper.toDataTransfer(sc)),
      };
    });
  }
}
