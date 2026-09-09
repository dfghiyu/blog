# BugAwake Chirpy-Inspired Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 BugAwake 改成内容优先、浅色默认、功能保留的个人技术博客首页与阅读样式。

**Architecture:** 保持 VuePress Hope 负责导航、搜索、深色模式、文章目录和 Markdown 页面。自定义首页组件只负责固定左侧身份栏和中央真实文章归档；全局 SCSS 为首页和普通文章页建立统一的浅色/深色阅读系统。

**Tech Stack:** VuePress 2, Vue 3, vuepress-theme-hope, TypeScript, SCSS, pnpm, GitHub Pages.

## Global Constraints

- 保留 `base: "/blog/"`、站点名 `BugAwake`、现有 GitHub Actions 和 `https://dfghiyu.github.io/blog/`。
- 只借鉴 Chirpy 的信息架构，不复制其源码、样式或任何素材。
- 默认浅色，保留 Hope 的深浅色切换；不添加外部字体或新依赖。
- 首页只展示真实文章，禁止虚构文章、筹备中占位、统计数字与英文装饰标签。
- 桌面端左侧栏固定或 sticky；小于 900px 时恢复单列。
- 保留搜索、GitHub、分类、标签、文章目录、阅读时长、代码高亮和编辑链接。

---

### Task 1: Rebuild the homepage as a real article archive

**Files:**
- Modify: `docs/.vuepress/components/HomePage.vue`

**Interfaces:**
- Consumes: `/blog/avatar.webp`, `/posts/`, `/category/`, `/tag/`, `/about/`, and `/posts/hello-vuepress/`.
- Produces: `main.blog-home`, `aside.blog-profile`, `section.post-archive`, and a single real `a.post-item` link.

- [x] **Step 1: Remove hard-coded draft records and pseudo-product copy**

Keep only the published VuePress post in the typed `posts` array. Delete draft fields, fake dates, “筹备中” labels, English labels, counters, and decorative arrows.

- [x] **Step 2: Render fixed identity sidebar and central archive**

Render the avatar, BugAwake, author name, one honest description, category/tag links and GitHub in `aside.blog-profile`. Render the archive heading, normal Chinese category links, post metadata and an empty-state sentence in `section.post-archive`.

- [x] **Step 3: Preserve accessible links and image base path**

Use `:src="'/blog/avatar.webp'"` for the public asset and semantic `nav`, `aside`, `article`, `time` elements. Keep target and rel attributes on the external GitHub link.

### Task 2: Establish the responsive reading layout

**Files:**
- Modify: `docs/.vuepress/styles/index.scss`

**Interfaces:**
- Consumes: `blog-home`, `blog-profile`, `post-archive`, `post-item`, and Hope theme DOM classes.
- Produces: responsive desktop sidebar layout, light/dark tokens, and readable normal article pages.

- [x] **Step 1: Replace current dark archive tokens**

Define the exact light and dark token sets from the design spec. Set serif fallbacks only for headings and system sans-serif for body text.

- [x] **Step 2: Style homepage with a narrow sticky left rail**

Use CSS grid for `blog-home`: `250px minmax(0, 760px)` on desktop. Make `blog-profile` sticky below the theme navbar and make `post-archive` a normal document-flow article list with fine separators.

- [x] **Step 3: Style global theme functionality**

Keep the navbar, search control, GitHub link, color switch, sidebars, table of contents, code blocks, metadata, footer, category and tag pages visible. Remove card shadows, large radius values and decorative home-only selectors.

- [x] **Step 4: Add mobile fallback**

At `max-width: 900px`, use one column and static profile; at `max-width: 640px`, reduce content padding and keep metadata wrapping.

### Task 3: Verify production output

**Files:**
- Test: `docs/.vuepress/dist/index.html`
- Test: `docs/.vuepress/dist/assets/*.css`

- [x] **Step 1: Check diff whitespace**

```bash
git diff --check
```

- [x] **Step 2: Build**

```bash
pnpm docs:build
```

Expected: VuePress renders all existing pages without errors.

- [x] **Step 3: Assert content-first homepage markers**

```bash
rg -q "blog-profile|post-archive|post-item|/blog/avatar.webp" docs/.vuepress/dist/index.html
! rg -q "筹备中|PERSONAL ARCHIVE|LATEST NOTES|PROFILE / BUGAWAKE|NOW /" docs/.vuepress/dist/index.html
```

- [x] **Step 4: Assert retained features**

```bash
rg -q "slimsearch-button|vp-color-mode-switch|github.com/dfghiyu/blog" docs/.vuepress/dist/index.html
```

- [x] **Step 5: Report release handoff**

Report changed files, validation evidence, and the exact commands needed to commit and push.
