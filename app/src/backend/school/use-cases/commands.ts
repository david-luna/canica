import { EvaluationDataTransfer } from "../data-transfer";

export enum SchoolCommandTypes {
  ImportEvaluations = "importEvaluations",
  UploadEvaluations = "uploadEvaluations",
}

export interface ImportEvaluationsCommand {
  username: string;
  password: string;
  debug: boolean;
  areaCodes: string[];
}

export interface UploadEvaluationsCommand {
  debug: boolean;
  evaluationIds: string[];
}

export interface ImportEvaluationsResult {
  type: SchoolCommandTypes.ImportEvaluations;
  evaluations: EvaluationDataTransfer[];
}

export interface UploadEvaluationsResult {
  type: SchoolCommandTypes.UploadEvaluations;
  successIds: string[];
  failureIds: string[];
}
