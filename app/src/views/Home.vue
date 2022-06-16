<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
/*global backend*/
// TODO: this must be actions of the store
import {
  AuthCommandTypes,
  LoginCommand,
} from "@/backend/auth/use-cases/commands";

import { onMounted } from "@vue/runtime-core";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

const googleLogin = (): void => {
  const payload: LoginCommand = { vendor: "google" };
  backend.dispatchCommand({
    type: AuthCommandTypes.Login,
    payload,
  });
};

onMounted((): void => {
  backend.results$.subscribe((result) => {
    const event = result as { type: string; payload: unknown };
    if (event.type === AuthCommandTypes.Login) {
      backend.dispatchCommand({ type: "show-window", payload: null });
    }
  });
  googleLogin();
});
</script>
