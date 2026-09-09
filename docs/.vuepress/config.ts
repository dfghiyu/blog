import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";
import { posts } from "./generated/posts";

const postSidebarChildren = ["", ...posts.map((post) => post.slug)];

export default defineUserConfig({
  bundler: viteBundler(),
  base: "/blog/",
  pagePatterns: ["**/*.md", "!superpowers/**"],
  lang: "zh-CN",
  title: "BugAwake",
  description: "记录技术、学习与生活",
  head: [["link", { rel: "icon", href: "/blog/favicon.svg" }]],
  theme: hopeTheme({
    hostname: "https://dfghiyu.github.io",
    logo: "/avatar.webp",
    repo: "dfghiyu/blog",
    docsDir: "docs",
    navbarTitle: "BugAwake",
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "博文",
        children: [
          { text: "全部文章", link: "/posts/" },
          { text: "技术", link: "/category/technology/" },
          { text: "学习", link: "/category/learning/" },
          { text: "生活", link: "/category/life/" },
          { text: "随笔", link: "/category/essay/" },
          { text: "标签", link: "/tag/" },
        ],
      },
      { text: "关于", link: "/about/" },
    ],
    sidebar: {
      "/posts/": [
        {
          text: "文章目录",
          children: postSidebarChildren,
        },
      ],
      "/about/": [{ text: "关于", children: [""] }],
      "/category/": [{ text: "分类", children: [""] }],
      "/category/technology/": [{ text: "技术", children: [""] }],
      "/category/learning/": [{ text: "学习", children: [""] }],
      "/category/life/": [{ text: "生活", children: [""] }],
      "/category/essay/": [{ text: "随笔", children: [""] }],
      "/tag/": [{ text: "标签", children: [""] }],
    },
    // 新访客以浅色阅读为默认，仍可通过导航栏按钮切换到深色。
    darkmode: "toggle",
    toc: true,
    breadcrumb: true,
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    contributors: false,
    lastUpdated: true,
    editLink: true,
    footer: "保持好奇，慢慢积累。",
    displayFooter: true,
    copyright: "© 2026 BugAwake",
    plugins: {
      slimsearch: true,
    },
  }),
});
