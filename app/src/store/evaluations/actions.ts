import { ActionPayload, EvaluationsState } from "./types";

export function searchEvaluation(
  this: EvaluationsState,
  text: ActionPayload<string>
): void {
  this.search = text;
}
