import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";
import { categories, posts } from "./generated/posts";

const postSidebarChildren = [
  { text: "文章", link: "/posts/" },
  ...posts.map((post) => ({ text: post.title, link: post.path })),
];
const categorySlugs: Record<string, string> = {
  技术: "technology",
  学习: "learning",
  生活: "life",
  随笔: "essay",
};

const categoryPath = (category: string) => `/category/${categorySlugs[category] ?? category}/`;
const postsInCategory = (category: string) => posts.filter((post) => post.category === category);
const categorySidebar = (category: string) => [
  {
    text: `${category}文章`,
    children: [
      { text: `${category}分类`, link: categoryPath(category) },
      ...postsInCategory(category).map((post) => ({ text: post.title, link: post.path })),
    ],
  },
];

const articleSidebars = Object.fromEntries(
  posts.map((post) => [post.path, categorySidebar(post.category)]),
);
const categorySidebars = Object.fromEntries(
  categories.map((category) => [categoryPath(category), categorySidebar(category)]),
);

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
      ...articleSidebars,
      "/posts/": [
        {
          text: "文章目录",
          children: postSidebarChildren,
        },
      ],
      "/about/": [{ text: "关于", children: [""] }],
      ...categorySidebars,
      "/category/": [{ text: "分类", children: [""] }],
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
