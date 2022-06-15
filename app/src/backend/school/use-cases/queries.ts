import { AreaDataTransfer, EvaluationDataTransfer } from "../data-transfer";

export enum SchoolQueryTypes {
  ListAreas = "listAreas",
  ListEvaluations = "listEvaluations",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListAreasQuery {}

export interface ListEvaluationQuery {
  summary: boolean;
}

export interface ListAreasResult {
  type: SchoolQueryTypes.ListAreas;
  areas: AreaDataTransfer[];
}
export interface ListEvaluationResult {
  type: SchoolQueryTypes.ListEvaluations;
  evaluations: EvaluationDataTransfer[];
}
