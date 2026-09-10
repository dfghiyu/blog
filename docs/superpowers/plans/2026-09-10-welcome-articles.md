# Welcome Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the four category welcome articles so each has a distinct, natural purpose while preserving the existing blog routes and metadata.

**Architecture:** Keep the existing Markdown-first VuePress content model. Modify the four article bodies and correct generated article links to match VuePress's flat `.html` output, so the automatic article index, category pages, tag index, and sidebar continue to resolve to real pages.

**Tech Stack:** Markdown frontmatter, VuePress 2, pnpm 10, Node.js 22.

## Global Constraints

- Keep the existing slugs: `welcome-technology`, `welcome-learning`, `welcome-life`, and `hello-vuepress`.
- Keep each article's existing `category` value unchanged.
- Use clear Chinese prose with a calm, personal tone and no exaggerated marketing language.
- Do not add dependencies or change the site layout.

---

### Task 1: Rewrite the four welcome articles

**Files:**
- Modify: `/Users/jingzhe/Desktop/blog/docs/posts/technology/welcome-technology.md`
- Modify: `/Users/jingzhe/Desktop/blog/docs/posts/learning/welcome-learning.md`
- Modify: `/Users/jingzhe/Desktop/blog/docs/posts/life/welcome-life.md`
- Modify: `/Users/jingzhe/Desktop/blog/docs/posts/essay/hello-vuepress.md`

**Interfaces:**
- Consumes: Existing frontmatter and article routes.
- Produces: Four complete welcome articles with distinct content responsibilities.

- [x] **Step 1: Rewrite the technical welcome article**

Keep `category: 技术`, explain that the section records reproducible problems, attempts, commands, and conclusions, and use headings for “记录什么”, “怎么写”, and “给未来的自己”.

- [x] **Step 2: Rewrite the learning welcome article**

Keep `category: 学习`, explain that the section records questions, understanding, practice, and review, and use headings for “从问题开始”, “把过程留下来”, and “慢慢形成自己的方法”.

- [x] **Step 3: Rewrite the life welcome article**

Keep `category: 生活`, explain that the section records ordinary scenes and honest feelings, and use headings for “记下具体的日子”, “不急着下结论”, and “给生活留一点余地”.

- [x] **Step 4: Rewrite the essay welcome article**

Keep the existing `hello-vuepress` route and `category: 随笔`, broaden the article from the initial setup story into an introduction to the essay section, with headings for “为什么从这里开始”, “这里会写什么”, and “写给之后的自己”.

### Task 2: Verify content integration

**Files:**
- Test: `/Users/jingzhe/Desktop/blog/docs/.vuepress/generated/posts.ts` (generated output, not committed)
- Test: `/Users/jingzhe/Desktop/blog/docs/.vuepress/dist/` (build output, not committed)

- [x] **Step 1: Run the content generator and build**

Run `pnpm docs:build` from `/Users/jingzhe/Desktop/blog` and expect a successful VuePress build with all four welcome articles included.

- [x] **Step 2: Check the generated metadata**

Confirm the generated index contains four posts and the category values `技术`, `学习`, `生活`, and `随笔`.

- [x] **Step 3: Check the working tree and commit**

Run `git diff --check`, confirm the four articles, the generated-link correction, and this plan changed, then commit with `docs: rewrite category welcome articles`.

### Additional maintenance fix

During the build audit, generated article links were found to point to `/posts/<slug>/`, while VuePress emitted `/posts/<slug>.html`. The content generator now emits the latter so homepage, category, tag, and sidebar links open the generated article pages directly on GitHub Pages.
