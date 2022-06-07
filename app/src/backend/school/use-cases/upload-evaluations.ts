import { Injectable, Command } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import {
  UploadEvaluationsCommand,
  UploadEvaluationsResult,
  SchoolCommandTypes,
} from "./commands";
import { PortalService } from "../services/portal.service";
import { EvaluationRepository } from "../domain";

@Injectable()
export class UploadEvaluationsUseCase
  implements UseCase<UploadEvaluationsCommand, UploadEvaluationsResult>
{
  constructor(
    private portalService: PortalService,
    private evaluationRepository: EvaluationRepository
  ) {}

  @Command(SchoolCommandTypes.UploadEvaluations)
  async execute(
    request: UploadEvaluationsCommand
  ): Promise<UploadEvaluationsResult> {
    const { evaluationIds } = request;
    const evaluations = await this.evaluationRepository.findById(...evaluationIds);

    const result = await this.portalService.uploadEvaluations(evaluations);

    return {
      type: SchoolCommandTypes.UploadEvaluations,
      successIds: [],
      failureIds: [],
    };
  }
}
