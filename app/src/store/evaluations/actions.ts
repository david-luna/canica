import { EvaluationSummaryDataTransfer } from "@/backend/school/data-transfer";
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

export function listEvaluations(this: EvaluationsState): void {
  const payload: ListEvaluationQuery = {
    summary: true,
  };
  backend.dispatchQuery({
    type: SchoolQueryTypes.ListEvaluations,
    payload,
  });
}

export function listEvaluationsComplete(
  this: EvaluationsState,
  evaluations: EvaluationSummaryDataTransfer[]
): void {
  this.evaluations = evaluations;
}

export function listEvaluationsError(
  this: EvaluationsState,
  error: { message: string },
): void {
  // TODO: something
  console.log("list error", error);
}

export function importEvaluations(this: EvaluationsState): void {
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

export function importEvaluationsComplete(
  this: EvaluationsState,
  evaluationIds: ActionPayload<string[]>
): void {
  //TODO: update the state of the evaluations to uploaded
  console.log("import complete", evaluationIds);
}

export function importEvaluationsError(
  this: EvaluationsState,
  error: { message: string },
): void {
  //TODO: update the state of the evaluations to uploaded
  console.log("import error", error);
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

export function uploadEvaluationsComplete(
  this: EvaluationsState,
  evaluationIds: ActionPayload<string[]>
): void {
  //TODO: update the state of the evaluations to uploaded
  console.log("upload complete", evaluationIds);
}

export function uploadEvaluationsError(
  this: EvaluationsState,
  error: { message: string },
): void {
  //TODO: update the state of the evaluations to uploaded
  console.log("upload error", error);
}

export function searchEvaluation(
  this: EvaluationsState,
  text: ActionPayload<string>
): void {
  this.search = text;
}

export const actions = {
  listEvaluations,
  listEvaluationsComplete,
  listEvaluationsError,
  importEvaluations,
  importEvaluationsComplete,
  importEvaluationsError,
  uploadEvaluations,
  uploadEvaluationsComplete,
  uploadEvaluationsError,
  searchEvaluation,
};
