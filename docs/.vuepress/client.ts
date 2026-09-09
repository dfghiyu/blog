import { defineClientConfig } from "vuepress/client";
import HomePage from "./components/HomePage.vue";
import "./styles/index.scss";

export default defineClientConfig({
  enhance({ app }) {
    app.component("HomePage", HomePage);
  },
});
