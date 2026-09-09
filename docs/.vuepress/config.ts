import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  bundler: viteBundler(),
  base: "/blog/",
  pagePatterns: ["**/*.md", "!superpowers/**"],
  lang: "zh-CN",
  title: "韩子阳的博客",
  description: "记录技术、学习与生活",
  head: [["link", { rel: "icon", href: "/blog/favicon.svg" }]],
  theme: hopeTheme({
    hostname: "https://dfghjyu.github.io/blog/",
    logo: "/blog/avatar.svg",
    repo: "dfghjyu/blog",
    docsDir: "docs",
    navbar: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/" },
      { text: "分类", link: "/category/" },
      { text: "标签", link: "/tag/" },
      { text: "关于", link: "/about/" },
    ],
    sidebar: {
      "/posts/": [
        {
          text: "文章目录",
          children: ["", "hello-vuepress"],
        },
      ],
      "/about/": [{ text: "关于", children: [""] }],
      "/category/": [{ text: "分类", children: [""] }],
      "/tag/": [{ text: "标签", children: [""] }],
    },
    darkmode: true,
    toc: true,
    breadcrumb: true,
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    contributors: false,
    lastUpdated: true,
    editLink: true,
    footer: "保持好奇，慢慢积累。",
    displayFooter: true,
    copyright: "© 2026 韩子阳",
    plugins: {
      slimsearch: true,
    },
  }),
});
