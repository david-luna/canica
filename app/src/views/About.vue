<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="action-buttons">
    <button @click="importEvaluations">Import!</button>
    <br />
    <button @click="listEvaluations">List!</button>
    <br />
    <button @click="uploadEvaluations">Upload!</button>
  </div>
</template>

<script setup lang="ts">
/*global backend*/
// TODO: this goes to the store
import {
  SchoolCommandTypes,
  ImportEvaluationsCommand,
  UploadEvaluationsCommand,
} from "@/backend/school/use-cases/commands";

import { useEvaluations } from "../store/evaluations";

const evaluationsStore = useEvaluations();

const importEvaluations = (): void => {
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
};

const listEvaluations = (): void => {
  evaluationsStore.listEvaluations();
};

const uploadEvaluations = (): void => {
  const payload: UploadEvaluationsCommand = {
    debug: true,
    evaluationIds: [
      "a8d3423a-d404-4551-be02-c264378d9823",
      "550d4902-3e96-4653-9be0-2b967a49316b",
    ],
  };
  backend.dispatchCommand({
    type: SchoolCommandTypes.UploadEvaluations,
    payload,
  });
};
</script>
