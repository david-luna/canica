import {
  ListEvaluationResult,
  SchoolQueryTypes,
} from "@/backend/school/use-cases/queries";
import { Store } from "pinia";
import { actions } from "./actions";
import { getters } from "./getters";
import { EvaluationsState } from "./types";

type GettersType = typeof getters;
// type GetterName = keyof GettersType;
type ActionsType = typeof actions;
type ActionName = keyof ActionsType;

type EvaluationStoreType = Store<
  "evaluations",
  EvaluationsState,
  GettersType,
  ActionsType
>;

interface BackendResult {
  error: boolean;
  data: BackendMessage;
}

function handleResult(result: BackendResult, store: EvaluationStoreType) {
  // TODO: Action mapper, add new handlers here
  const resultActions = {
    listEvaluationsComplete () {
      const { evaluations } = result as unknown as ListEvaluationResult;
      store.listEvaluationsComplete(evaluations);
    },
    listEvaluationsError () {
      const { message } = result as unknown as { message: string };
      store.listEvaluationsError({ message });
    },
  } as const;

  console.log("backend result", result);
  const actionName = `${result.data.type}${result.error ? 'Error' : 'Complete'}`;
  const actionMethod = resultActions[actionName as keyof typeof resultActions];

  if (actionMethod) {
    actionMethod();
  } else {
    console.log(`No handler found for ${result.data.type}. Expected to have ${actionName}`);
  }
}


export function subscribeEvents(store: EvaluationStoreType): void {
  backend.results$.subscribe((data) => handleResult({ error: false, data}, store));
  backend.errors$.subscribe((data) => handleResult({ error: true, data }, store));
}
