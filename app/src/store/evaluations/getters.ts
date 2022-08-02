import { EvaluationSummaryDataTransfer } from "@/backend/school/data-transfer";
import { EvaluationsState } from "./types";

const importedFilter = (ev: EvaluationSummaryDataTransfer) => {
  return ev.status === "imported";
};
const uploadedFilter = (ev: EvaluationSummaryDataTransfer) => {
  return ev.status === "imported";
};
const createSearchFilter = (search: string) => {
  return (ev: EvaluationSummaryDataTransfer) => {
    return !search || ev.label.toLowerCase().includes(search.toLowerCase());
  };
};

export function activeEvaluations(
  state: EvaluationsState
): EvaluationSummaryDataTransfer[] {
  const searchFilter = createSearchFilter(state.search);
  return state.evaluations.filter(importedFilter).filter(searchFilter);
}

export function finishedEvaluations(
  state: EvaluationsState
): EvaluationSummaryDataTransfer[] {
  const searchFilter = createSearchFilter(state.search);
  return state.evaluations.filter(uploadedFilter).filter(searchFilter);
}
