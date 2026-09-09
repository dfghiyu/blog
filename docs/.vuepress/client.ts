import { defineClientConfig } from "vuepress/client";
import HomePage from "./components/HomePage.vue";
import PostList from "./components/PostList.vue";
import TagIndex from "./components/TagIndex.vue";
import "./styles/index.scss";

export default defineClientConfig({
  enhance({ app }) {
    app.component("HomePage", HomePage);
    app.component("PostList", PostList);
    app.component("TagIndex", TagIndex);
  },
});
