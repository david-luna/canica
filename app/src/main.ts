import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

// eslint-disable-next-line prettier/prettier
createApp(App)
  .use(router)
  .use(pinia)
  .mount("#app");
