import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";
import { posts, type BlogPost } from "./generated/posts";

type FolderNode = {
  name: string;
  path: string;
  posts: BlogPost[];
  children: Map<string, FolderNode>;
};

const postTree: FolderNode = {
  name: "posts",
  path: "/posts/",
  posts: [],
  children: new Map(),
};

for (const post of posts) {
  const segments = post.slug.split("/");
  segments.pop();

  let current = postTree;
  const pathSegments: string[] = [];
  for (const segment of segments) {
    pathSegments.push(segment);
    let child = current.children.get(segment);
    if (!child) {
      child = {
        name: segment,
        path: `/posts/${pathSegments.join("/")}/`,
        posts: [],
        children: new Map(),
      };
      current.children.set(segment, child);
    }
    current = child;
  }
  current.posts.push(post);
}

const preferredFolders = ["technology", "learning", "life", "essay"];
const sortFolders = (folders: FolderNode[]) =>
  folders.sort((a, b) => {
    const aIndex = preferredFolders.indexOf(a.name);
    const bIndex = preferredFolders.indexOf(b.name);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      if (aIndex !== bIndex) return aIndex - bIndex;
    }
    return a.name.localeCompare(b.name);
  });

const folderSidebarItem = (folder: FolderNode) => ({
  text: folder.name,
  link: folder.path,
  children: [
    ...sortFolders([...folder.children.values()]).map(folderSidebarItem),
    ...folder.posts.map((post) => ({ text: post.title, link: post.path })),
  ],
});

const postsSidebar = [
  {
    text: "全部文章",
    link: "/posts/",
    children: [
      ...sortFolders([...postTree.children.values()]).map(folderSidebarItem),
      ...postTree.posts.map((post) => ({ text: post.title, link: post.path })),
    ],
  },
];

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
          { text: "技术", link: "/posts/technology/" },
          { text: "学习", link: "/posts/learning/" },
          { text: "生活", link: "/posts/life/" },
          { text: "随笔", link: "/posts/essay/" },
          { text: "标签", link: "/tag/" },
        ],
      },
      { text: "关于", link: "/about/" },
    ],
    sidebar: {
      "/posts/": postsSidebar,
      "/about/": [{ text: "关于", children: [""] }],
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
