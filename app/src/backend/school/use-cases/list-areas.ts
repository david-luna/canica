import { Injectable, Query } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import { AreaRepository } from "../domain";
import { ListAreasQuery, ListAreasResult, SchoolQueryTypes } from "./queries";

@Injectable()
export class ListAreasUseCase
  implements UseCase<ListAreasQuery, ListAreasResult>
{
  constructor(private areaRepo: AreaRepository) {}

  @Query(SchoolQueryTypes.ListAreas)
  execute(request: ListAreasQuery): Promise<ListAreasResult> {
    const type = SchoolQueryTypes.ListAreas;

    return this.areaRepo.findAll().then((areas) => {
      return { type, areas };
    });
  }
}
