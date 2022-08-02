import { EvaluationSummaryDataTransfer } from "@/backend/school/data-transfer";

export type ActionPayload<T> = ((param: unknown) => void) & T;

export interface EvaluationsState {
  search: string;
  evaluations: EvaluationSummaryDataTransfer[];
}
