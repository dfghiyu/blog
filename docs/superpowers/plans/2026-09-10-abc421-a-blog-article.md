# ABC421 A Blog Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Chinese ACM learning article for AtCoder ABC421 A with verified C++ and Python solutions.

**Architecture:** Add one top-level Markdown file under `docs/posts/` so the existing content generator automatically includes it in the article list, learning category, and tag index. Keep the existing VuePress layout and dependency set unchanged.

**Tech Stack:** VuePress 2, Markdown frontmatter, C++17-style code, Python 3.

## Global Constraints

- Keep the article under `/Users/jingzhe/Desktop/blog/docs/posts/`.
- Use `category: 学习`.
- Include the official AtCoder problem link.
- Include both C++ and Python implementations.
- Explain the `X - 1` index conversion and give time and space complexity.

---

### Task 1: Add the problem article

**Files:**
- Create: `/Users/jingzhe/Desktop/blog/docs/posts/abc421-a-misdelivery.md`

**Interfaces:**
- Consumes: AtCoder ABC421 A input/output definition.
- Produces: A Markdown post with frontmatter, explanation, C++ code, Python code, complexity analysis, and pitfalls.

- [x] Write the article with `category: 学习`, tags `ACM`, `C++`, `Python`, and `字符串`.
- [x] Preserve the direct official problem URL.

### Task 2: Verify content integration

**Files:**
- Test: `/Users/jingzhe/Desktop/blog/docs/.vuepress/generated/posts.ts`
- Test: `/Users/jingzhe/Desktop/blog/docs/.vuepress/dist/`

- [x] Run `pnpm docs:build`.
- [x] Confirm the generated post count increases to 5 and the article route exists.
- [x] Run `git diff --check` and commit the article.
