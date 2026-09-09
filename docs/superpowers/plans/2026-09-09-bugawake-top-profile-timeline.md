# BugAwake Top Profile Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 BugAwake 首页改成顶部简介加宽单列文章时间线，并新增技术、学习、生活三篇欢迎文章。

**Architecture:** VuePress Hope 继续负责全站导航、搜索、主题切换、文章目录和 Markdown 渲染。`HomePage.vue` 只维护真实文章卡片数据和顶部简介，`index.scss` 只调整首页布局与响应式样式；文章内容分别放在 `docs/posts/` 下的独立 Markdown 文件。

**Tech Stack:** VuePress 2、Vue 3、vuepress-theme-hope、TypeScript、SCSS、pnpm。

## Global Constraints

- 保留 `base: "/blog/"`、站点名 `BugAwake`、现有 GitHub Actions、搜索与主题切换。
- 默认浅色；深色模式必须仍可用。
- 首页只渲染真实文章，不使用草稿、占位文字、统计数字或装饰标签。
- 不添加依赖、外部字体或新的图片素材。
- 新文章均使用中文 frontmatter，分类为技术、学习、生活，作者为韩子阳。

---

### Task 1: Add three welcome articles and usable category entries

**Files:**
- Create: `docs/posts/welcome-technology.md`
- Create: `docs/posts/welcome-learning.md`
- Create: `docs/posts/welcome-life.md`
- Modify: `docs/posts/README.md`
- Modify: `docs/category/README.md`

**Interfaces:**
- Consumes: Hope theme Markdown frontmatter fields `title`, `description`, `date`, `category`, `tag`, `author`.
- Produces: `/posts/welcome-technology/`, `/posts/welcome-learning/`, `/posts/welcome-life/` and category page links to each published post.

- [x] **Step 1: Write the failing content-presence check**

Run:

```bash
rg -q "欢迎来到技术笔记" docs/posts/welcome-technology.md
```

Expected: non-zero exit because the technology welcome article does not exist yet.

- [x] **Step 2: Create the three Markdown articles**

Use the following frontmatter shape for each file, changing title, description, category and tags:

```markdown
---
title: 欢迎来到技术笔记
description: 从可复现的小问题开始，建立自己的技术记录。
date: 2026-09-09
category: 技术
tag:
  - 技术
  - 编程
author: 韩子阳
---
```

Write concise first-person welcome copy with two `##` headings per article. Technology focuses on reproducible notes, learning focuses on method and review, life focuses on ordinary observations.

- [x] **Step 3: Add real article links to article and category indexes**

Make `docs/posts/README.md` list all four article routes. Make `docs/category/README.md` link 技术、学习、生活 to their own welcome article routes and 随笔 to `/blog/posts/hello-vuepress/`.

- [x] **Step 4: Run content-presence checks**

Run:

```bash
rg -q "欢迎来到技术笔记" docs/posts/welcome-technology.md
rg -q "欢迎来到学习记录" docs/posts/welcome-learning.md
rg -q "欢迎来到生活随笔" docs/posts/welcome-life.md
```

Expected: every command exits 0.

### Task 2: Replace the split homepage with a top profile and wide timeline

**Files:**
- Modify: `docs/.vuepress/components/HomePage.vue`
- Modify: `docs/.vuepress/styles/index.scss`
- Modify: `docs/.vuepress/config.ts`

**Interfaces:**
- Consumes: `/blog/avatar.webp`, four post URLs, `/blog/category/`, `/blog/tag/`, `/blog/about/`, `https://github.com/dfghiyu/blog`.
- Produces: `main.blog-home`, `header.home-profile`, `section.post-archive`, and four `a.post-item` elements.

- [x] **Step 1: Write the failing homepage structure check**

Run:

```bash
rg -q 'class="home-profile"' docs/.vuepress/components/HomePage.vue
```

Expected: non-zero exit because the current homepage still renders `aside.blog-profile`.

- [x] **Step 2: Render a compact top profile and four real post entries**

Replace the sidebar markup with `header.home-profile`: avatar, `BugAwake`, `韩子阳`, `记录技术、学习与生活。`, and one GitHub link. Define one typed post object per real Markdown route, with title, description, date, category, reading time and link. Render all posts inside `section.post-archive`; keep semantic `header`, `nav`, `article`, `a` and `time` elements.

- [x] **Step 3: Update Hope sidebar children for all article pages**

Set `/posts/` sidebar children to `""`, `"hello-vuepress"`, `"welcome-technology"`, `"welcome-learning"`, and `"welcome-life"` so all articles have a visible navigation entry.

- [x] **Step 4: Replace the desktop grid styling with a single reading column**

Remove `.blog-layout` grid and `.blog-profile` sticky styles. Set `.blog-layout` to `width: min(820px, calc(100% - 48px))`, put `.home-profile` in normal flow, and separate it from `.post-archive` with one light border. Keep title typography and color tokens; reduce unnecessary dividers and use no shadows or cards.

- [x] **Step 5: Add mobile typography rules**

At `max-width: 640px`, make the profile avatar 60px, reduce outer width to `calc(100% - 32px)`, let profile details wrap, and ensure post metadata can wrap without fixed widths.

- [x] **Step 6: Run the homepage structure check**

Run:

```bash
rg -q 'class="home-profile"' docs/.vuepress/components/HomePage.vue
rg -q 'welcome-technology' docs/.vuepress/components/HomePage.vue
! rg -q 'class="blog-profile"|profile-sticky|archive-empty' docs/.vuepress/components/HomePage.vue
```

Expected: every command exits 0.

### Task 3: Verify generated site and responsive behavior

**Files:**
- Test: `docs/.vuepress/dist/index.html`
- Test: `docs/.vuepress/dist/posts/index.html`

**Interfaces:**
- Consumes: final VuePress source files.
- Produces: static GitHub Pages artifact with four homepage posts and all supporting theme controls.

- [x] **Step 1: Check whitespace and build**

Run:

```bash
git diff --check
pnpm docs:build
```

Expected: both commands exit 0 and VuePress renders the new article pages.

- [x] **Step 2: Check published HTML markers**

Run:

```bash
rg -q 'home-profile' docs/.vuepress/dist/index.html
rg -q '欢迎来到技术笔记' docs/.vuepress/dist/index.html
rg -q '欢迎来到学习记录' docs/.vuepress/dist/index.html
rg -q '欢迎来到生活随笔' docs/.vuepress/dist/index.html
rg -q 'slimsearch-button' docs/.vuepress/dist/index.html
rg -q 'vp-color-mode-switch' docs/.vuepress/dist/index.html
```

Expected: every command exits 0.

- [x] **Step 3: Check browser behavior at desktop and mobile widths**

Open local preview at `/blog/`. Confirm the profile is in normal document flow on desktop, the four article links are visible, and a 390px viewport has one column with no horizontal overflow.

- [x] **Step 4: Commit implementation**

```bash
git add docs/.vuepress docs/posts docs/category docs/superpowers/plans/2026-09-09-bugawake-top-profile-timeline.md
git commit -m "refactor: simplify BugAwake homepage timeline"
```

Expected: one local commit containing the homepage, style, article and category updates.
