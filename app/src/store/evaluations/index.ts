import { defineStore } from "pinia";
import { actions } from "./actions";
import { subscribeEvents } from "./events";
import { getters } from "./getters";
import { EvaluationsState } from "./types";

const initalState: EvaluationsState = {
  search: "",
  evaluations: [],
};

export const useEvaluations = defineStore("evaluations", {
  state: () => initalState,
  getters,
  actions,
});

subscribeEvents(useEvaluations());
