import { Injectable, Query } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import {
  ListEvaluationQuery,
  ListEvaluationResult,
  SchoolQueryTypes,
} from "./queries";
import { EvaluationRepository } from "../domain";
import { EvaluationMapper } from "../mappers/evaluation-mapper";

@Injectable()
export class ListEvaluationsUseCase
  implements UseCase<ListEvaluationQuery, ListEvaluationResult>
{
  constructor(private evaluationsRepo: EvaluationRepository) {}

  @Query(SchoolQueryTypes.ListEvaluations)
  async execute(): Promise<ListEvaluationResult> {
    const evaluations = await this.evaluationsRepo.listEvaluationsSummary();

    return {
      type: SchoolQueryTypes.ListEvaluations,
      evaluations: evaluations.map(EvaluationMapper.toDataTransfer),
    };
  }
}
