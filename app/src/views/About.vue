<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="action-buttons">
    <button @click="googleLogin">Login!</button>
    <br />
    <button @click="importEvaluations">Import!</button>
    <br />
    <button @click="listEvaluations">List!</button>
    <br />
    <button @click="uploadEvaluations">Upload!</button>
  </div>
</template>

<script lang="ts">
/*global backend*/
import { Vue } from "vue-class-component";

import {
  AuthCommandTypes,
  LoginCommand,
} from "@/backend/auth/use-cases/commands";

import {
  SchoolCommandTypes,
  ImportEvaluationsCommand,
  UploadEvaluationsCommand,
} from "@/backend/school/use-cases/commands";

import {
  SchoolQueryTypes,
  ListEvaluationQuery,
} from "@/backend/school/use-cases/queries";

export default class About extends Vue {
  googleLogin(): void {
    const payload: LoginCommand = { vendor: "google" };
    backend.dispatchCommand({
      type: AuthCommandTypes.Login,
      payload,
    });
  }

  importEvaluations(): void {
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
  }

  listEvaluations(): void {
    const payload: ListEvaluationQuery = {
      summary: true,
    };
    backend.dispatchQuery({
      type: SchoolQueryTypes.ListEvaluations,
      payload,
    });
  }

  uploadEvaluations(): void {
    console.log("list on th UI");
    const payload: UploadEvaluationsCommand = {
      debug: true,
      evaluationIds: [],
    };
    backend.dispatchQuery({
      type: SchoolCommandTypes.UploadEvaluations,
      payload,
    });
  }

  mounted(): void {
    backend.results$.subscribe((result) => {
      console.log("result from backend", result);
    });
    backend.errors$.subscribe((error) => {
      console.log("error from backend", error);
    });
  }
}
</script>
