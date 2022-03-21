import { EvaluationDataTransfer } from "../data-transfer";

export enum SchoolCommandTypes {
  ImportEvaluations = "importEvaluations",
}

export interface ImportEvaluationsCommand {
  username: string;
  password: string;
  debug: boolean;
  areaCodes: string[];
}

export interface ImportEvaluationsResult {
  type: SchoolCommandTypes.ImportEvaluations;
  evaluations: EvaluationDataTransfer[];
}
