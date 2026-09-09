# BugAwake Night Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the BugAwake VuePress blog as a restrained dark personal archive with an optimized user-provided anime avatar, while preserving GitHub Pages deployment.

**Architecture:** Keep VuePress 2 and vuepress-theme-hope for routing, Markdown, search, code highlighting, and deployment. Replace the custom homepage with a content-first article archive and profile rail; use one global SCSS token system to restyle the homepage and standard theme pages consistently. Store the processed avatar under `docs/.vuepress/public/` and reference it through the existing VuePress base path.

**Tech Stack:** VuePress 2, vuepress-theme-hope, Vue 3, TypeScript, SCSS, pnpm, Node.js 22, GitHub Pages Actions.

## Global Constraints

- Preserve `base: "/blog/"` and `https://dfghjyu.github.io/blog/`.
- Keep repository `dfghiyu/blog` and displayed site name `BugAwake`.
- Keep search, GitHub link, responsive layout, code highlighting, table of contents, and dark-mode switching.
- Use the supplied image only as an edited/cropped project asset; add no text, watermark, extra characters, or copied reference-project assets.
- Do not change `.github/workflows/deploy.yml` unless build verification proves it is required.
- Verify with `pnpm docs:build`, `git diff --check`, and generated HTML marker checks.

---

### Task 1: Prepare the project avatar asset

**Files:**
- Create: `docs/.vuepress/public/avatar.webp`
- Modify: `docs/.vuepress/config.ts` after the asset exists

**Interfaces:**
- Consumes: `/Users/jingzhe/Desktop/u=170206643,3798688512&fm=253&fmt=auto&app=138&f=JPEG.webp` as the edit target.
- Produces: a square WebP avatar whose face and shoulders remain recognizable at 48px and 132px.

- [x] **Step 1: Edit the supplied image with the built-in image editor**

Prompt constraints: crop to a square portrait focused on the silver-haired character's face and shoulders; preserve the original character, expression, hair color, eye color, and illustration style; improve only framing, mild contrast, and clarity; remove excess lower body and unrelated background; add no text, logo, watermark, new subject, or new background elements.

- [x] **Step 2: Save the selected edited output as the project asset**

Copy the selected output to `docs/.vuepress/public/avatar.webp`. Confirm it is a readable raster image with square dimensions.

- [x] **Step 3: Update theme logo reference**

Set the theme logo to `/avatar.webp`; use `/blog/avatar.webp` in custom component image references so VuePress resolves the project base path correctly.

- [x] **Step 4: Verify the asset**

Run:

```bash
file docs/.vuepress/public/avatar.webp
```

Expected: WebP image with square dimensions and no missing-file error.

---

### Task 2: Replace the custom homepage with the night archive layout

**Files:**
- Modify: `docs/.vuepress/components/HomePage.vue`

**Interfaces:**
- Consumes: `avatar.webp`, existing `/posts/`, `/about/`, `/tag/`, and `/category/` routes.
- Produces: semantic `main.blog-home` containing `.archive-panel`, `.profile-rail`, `.article-row`, `.profile-card`, `.stats-card`, and `.tag-cloud` blocks.

- [x] **Step 1: Define typed homepage data**

Use this exact data shape:

```ts
type Post = {
  index: string;
  title: string;
  description: string;
  date: string;
  reading: string;
  category: string;
  link?: string;
  draft?: boolean;
};
```

Expose the existing published article as a real link, and label visual placeholders as `筹备中`; do not claim unpublished posts are public articles.

- [x] **Step 2: Build the desktop hierarchy**

Render a compact archive header, category dropdown, article list, and footer link in the main column. Render the avatar, `BugAwake`, author description, GitHub link, four truthful stats, and tag cloud in the profile rail.

- [x] **Step 3: Add responsive behavior**

Use a two-column grid above 900px and a single-column flow below 900px. Below 640px, stack the category control, reduce article padding, and keep metadata wrapping without horizontal scrolling.

- [x] **Step 4: Verify generated homepage markers**

The generated `docs/.vuepress/dist/index.html` must contain `BugAwake`, `BUGAWAKE / NOTES`, `article-row`, and `/blog/avatar.webp`.

---

### Task 3: Establish the global night-archive visual system

**Files:**
- Modify: `docs/.vuepress/styles/index.scss`
- Modify: `docs/.vuepress/config.ts`
- Modify: `docs/README.md`
- Modify: `docs/about/README.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: homepage class names from Task 2 and existing theme DOM classes from VuePress Hope.
- Produces: consistent dark styling for homepage, articles, category/tag pages, navigation, footer, sidebar, code blocks, links, and theme switch.

- [x] **Step 1: Define the token system**

Use these exact base tokens: `#17181D` page background, `#202127` surface, `#25262D` raised surface, `#EDF0F4` text, `#9BA0AC` muted text, `#707580` dim text, `#8FD6D0` mint accent, `#9CB5D1` silver-blue accent, and `#EAB9C1` blush detail.

- [x] **Step 2: Style theme chrome and content pages**

Target `.vp-navbar`, `.vp-sidebar`, `.vp-page`, `.theme-default-content`, footer, headings, links, blockquotes, inline code, and code blocks. Hide the default home hero only on `.vp-project-home`; do not hide article metadata or table of contents on non-home pages.

- [x] **Step 3: Configure title, logo, and navigation**

Keep `title: "BugAwake"`, `navbarTitle: "BugAwake"`, `hostname: "https://dfghjyu.github.io"`, `logo: "/avatar.webp"`, `darkmode: "switch"`, and `/blog/`. Use navigation entries for 首页, 博文 with children for 全部文章/技术/学习/生活, and 关于.

- [x] **Step 4: Update text documentation**

Change visible project headings and descriptions to `BugAwake`; retain the author identity as “韩子阳，网名 BugAwake” in About. Do not alter deployment instructions or repository URL.

---

### Task 4: Build and inspect the result

**Files:**
- Test: `docs/.vuepress/dist/index.html` generated output
- Test: `docs/.vuepress/dist/posts/index.html` generated output

**Interfaces:**
- Consumes: all changes from Tasks 1–3.
- Produces: a deployable VuePress static site with no build errors and expected asset paths.

- [x] **Step 1: Run whitespace checks**

```bash
git diff --check
```

Expected: no output and exit code 0.

- [x] **Step 2: Build the site**

```bash
pnpm docs:build
```

Expected: VuePress completes rendering without errors and creates `docs/.vuepress/dist/`.

- [x] **Step 3: Verify output markers and asset paths**

```bash
rg -n "BugAwake|BUGAWAKE / NOTES|article-row|/blog/avatar.webp" docs/.vuepress/dist/index.html
test -f docs/.vuepress/dist/avatar.webp
```

Expected: all markers are present and the processed avatar is copied into the generated site.

- [x] **Step 4: Report local handoff**

Report changed files, the successful build command, and the exact `git add`, `git commit`, and `git push` commands needed to publish the update. Do not claim the public site changed until the user pushes and GitHub Pages finishes deploying.
