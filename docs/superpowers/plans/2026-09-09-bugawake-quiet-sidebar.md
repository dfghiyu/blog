# BugAwake Quiet Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 BugAwake 首页改成低装饰、文章优先的个人博客，并实现左侧独立滚动、右侧固定资料栏。

**Architecture:** 保留 VuePress 2、vuepress-theme-hope、Markdown 路由和 GitHub Pages 部署。只重做自定义首页组件与全局 SCSS：桌面端由页面容器管理左右区域，左侧负责滚动，右侧负责固定资料；小屏幕恢复单列流式布局。

**Tech Stack:** VuePress 2, Vue 3, TypeScript, SCSS, pnpm, GitHub Pages.

## Global Constraints

- 保留 `base: "/blog/"`、`BugAwake`、GitHub 仓库链接和 `/blog/avatar.webp`。
- 保留搜索、GitHub、深色模式、文章路由和响应式布局。
- 首页不使用英文装饰标签、文章编号、统计卡片或多余状态徽章。
- 桌面端右栏必须是 `position: fixed`，左栏必须有独立 `overflow-y: auto`。
- 小于 900px 时取消固定栏，避免移动端横向遮挡。
- 不修改 GitHub Actions，除非构建验证证明必须修改。

---

### Task 1: Replace homepage structure

**Files:**
- Modify: `docs/.vuepress/components/HomePage.vue`

**Interfaces:**
- Consumes: existing post data, `/about/`, `/tag/`, `/blog/avatar.webp`.
- Produces: `.quiet-home`, `.article-column`, `.profile-rail`, `.article-row` and minimal Chinese navigation copy.

- [x] **Step 1: Remove archive-style copy and decorative data**

Remove the archive header, English labels, article indexes, stats card and “now” card. Keep one published post and two clearly marked draft placeholders.

- [x] **Step 2: Create the two-column viewport structure**

Render a compact header, a scrollable article column, and a fixed profile rail. Use the existing real article link and avatar asset.

- [x] **Step 3: Keep mobile semantics intact**

Ensure the fixed profile rail becomes normal-flow content under 900px and article metadata wraps below 640px.

### Task 2: Rebuild visual system

**Files:**
- Modify: `docs/.vuepress/styles/index.scss`

**Interfaces:**
- Consumes: classes emitted by `HomePage.vue` and VuePress theme chrome.
- Produces: restrained dark styling with independent scroll behavior and visible keyboard focus.

- [x] **Step 1: Simplify tokens and theme chrome**

Keep the dark palette but reduce mint/blush usage to links and focus states. Remove heavy shadows, rounded card styling, and decorative gradients.

- [x] **Step 2: Implement desktop independent scrolling**

Set the home viewport height below the navbar, assign `overflow-y: auto` to `.article-column`, and set `.profile-rail` to `position: fixed` with a width derived from the viewport gutter.

- [x] **Step 3: Implement responsive fallback**

At `max-width: 900px`, restore document scrolling and normal-flow profile content; at `max-width: 640px`, reduce padding and type scale.

### Task 3: Build and verify

**Files:**
- Test: `docs/.vuepress/dist/index.html`
- Test: `docs/.vuepress/dist/assets/*.css`

- [x] **Step 1: Run whitespace check**

```bash
git diff --check
```

- [x] **Step 2: Build the site**

```bash
pnpm docs:build
```

Expected: VuePress renders all existing pages without errors.

- [x] **Step 3: Verify design markers**

```bash
rg -n "article-column|profile-rail|/blog/avatar.webp" docs/.vuepress/dist/index.html
! rg -n "PERSONAL ARCHIVE|LATEST NOTES|PROFILE / BUGAWAKE|NOW /" docs/.vuepress/dist/index.html
```

- [x] **Step 4: Report handoff**

Report changed files, verification results, and the terminal commands required to commit and push the new design.
