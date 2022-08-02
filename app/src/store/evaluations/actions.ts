import {
  SchoolCommandTypes,
  ImportEvaluationsCommand,
  UploadEvaluationsCommand,
} from "@/backend/school/use-cases/commands";
import {
  SchoolQueryTypes,
  ListEvaluationQuery,
} from "@/backend/school/use-cases/queries";
import { ActionPayload, EvaluationsState } from "./types";

export function fetchEvaluations(this: EvaluationsState): void {
  const payload: ListEvaluationQuery = {
    summary: true,
  };
  backend.dispatchQuery({
    type: SchoolQueryTypes.ListEvaluations,
    payload,
  });
}

export function downloadEvaluations(this: EvaluationsState): void {
  const payload: ImportEvaluationsCommand = {
    username: `${process.env.PLATFORM_USERNAME}`,
    password: `${process.env.PLATFORM_PASSWORD}`,
    areaCodes: ["LCA1"],
    debug: true,
  };
  backend.dispatchCommand({
    type: SchoolCommandTypes.ImportEvaluations,
    payload,
  });
}

export function uploadEvaluations(
  this: EvaluationsState,
  evaluationIds: ActionPayload<string[]>
): void {
  const payload: UploadEvaluationsCommand = {
    debug: true,
    evaluationIds,
  };
  backend.dispatchCommand({
    type: SchoolCommandTypes.UploadEvaluations,
    payload,
  });
}

export function searchEvaluation(
  this: EvaluationsState,
  text: ActionPayload<string>
): void {
  this.search = text;
}
