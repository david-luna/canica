import { defineStore } from "pinia";
import { searchEvaluation } from "./actions";
import { activeEvaluations, finishedEvaluations } from "./getters";
import { EvaluationsState } from "./types";

const initalState: EvaluationsState = {
  search: "",
  evaluations: [],
};

export const useEvaluations = defineStore("evalutations", {
  state: () => initalState,
  getters: {
    activeEvaluations,
    finishedEvaluations,
  },
  actions: {
    searchEvaluation,
  },
});
