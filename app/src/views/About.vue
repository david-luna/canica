<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="action-buttons">
    <button @click="googleLogin">Login!</button>
    <button id="import-button">Import!</button>
  </div>
</template>

<script lang="ts">
/*global backend*/
import { Vue } from "vue-class-component";

export default class About extends Vue {
  googleLogin(): void {
    backend.dispatchCommand({
      type: "login",
      payload: { vendor: "google" },
    });
  }

  importData(): void {
    backend.dispatchCommand({
      type: "importData",
      payload: { debug: true },
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
