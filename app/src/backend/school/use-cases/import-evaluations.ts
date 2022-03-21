import { Injectable, Command } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import {
  ImportEvaluationsCommand,
  ImportEvaluationsResult,
  SchoolCommandTypes,
} from "./commands";
import { PortalService } from "../services/portal.service";
import {
  AreaRepository,
  Evaluation,
  EvaluationRepository,
  Quarter,
} from "../domain";
import { EvaluationMapper } from "../mappers/evaluation-mapper";

@Injectable()
export class ImportEvaluationsUseCase
  implements UseCase<ImportEvaluationsCommand, ImportEvaluationsResult>
{
  constructor(
    private portalService: PortalService,
    private areaRepository: AreaRepository,
    private evaluationRepository: EvaluationRepository
  ) {}

  @Command(SchoolCommandTypes.ImportEvaluations)
  async execute(
    request: ImportEvaluationsCommand
  ): Promise<ImportEvaluationsResult> {
    const allAreas = await this.areaRepository.findAll();
    const groups = await this.portalService.getGroups({ debug: request.debug });
    const areas = allAreas.filter((area) =>
      request.areaCodes.includes(area.code)
    );
    const quarter = Quarter.fromDate(new Date());
    const { term } = quarter;
    const shortYear = (d: Date) => `${d.getFullYear()}`.slice(-2);
    const termLabel = `${shortYear(term.start)}-${shortYear(term.finish)}`;
    const evaluations: Evaluation[] = [];

    for (const group of groups) {
      for (const area of areas) {
        const label = `${termLabel}-T${quarter.number}-${group.name}-${area.name}`;
        const evaluation = Evaluation.create({
          area,
          group,
          quarter,
          label,
          grades: [],
        });
        evaluations.push(evaluation);
        await this.evaluationRepository.save(evaluation);
      }
    }

    return {
      type: SchoolCommandTypes.ImportEvaluations,
      evaluations: evaluations.map(EvaluationMapper.toDataTransfer),
    };
  }
}
