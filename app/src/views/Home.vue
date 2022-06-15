<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
/*global backend*/
import { Options, Vue } from "vue-class-component";
import {
  AuthCommandTypes,
  LoginCommand,
} from "@/backend/auth/use-cases/commands";

import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  googleLogin(): void {
    const payload: LoginCommand = { vendor: "google" };
    backend.dispatchCommand({
      type: AuthCommandTypes.Login,
      payload,
    });
  }

  mounted(): void {
    backend.results$.subscribe((result) => {
      const event = result as { type: string; payload: unknown };
      if (event.type === AuthCommandTypes.Login) {
        backend.dispatchCommand({ type: "show-window", payload: null });
      }
    });

    this.googleLogin();
  }
}
</script>
