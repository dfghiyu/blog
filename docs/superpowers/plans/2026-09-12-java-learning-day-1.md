# Java 学习 Day 1 Implementation Plan

**Goal:** 将 Spring Boot 学习路线的 Java Day 1 内容整理为博客文章，并归档到学习分类下的 Java 子目录。

**Architecture:** 复用现有 `docs/posts/learning/<topic>/` 目录约定。文章使用 `category: 学习` 保持首页和分类筛选逻辑不变，由现有内容生成脚本递归发现文章，并由 VuePress 配置自动生成目录侧边栏。

**Tech Stack:** VuePress 2、vuepress-theme-hope、Markdown frontmatter、pnpm。

## Global Constraints

- 文章必须放在 `docs/posts/learning/java/`。
- 文章分类必须是 `学习`，主题通过 `Java` 和 `Spring Boot` 标签表达。
- 内容需覆盖 JDK/JRE/JVM、main 方法、变量与数据类型、String、运算符、if/else、方法、String equals、综合示例、理论练习、Day 1 总结以及与 Spring Boot 的关系。
- 不手动修改 `docs/.vuepress/generated/`，由 `pnpm docs:generate` 生成。

### Task 1: Create Java learning section and Day 1 article

**Files:**
- Create: `docs/posts/learning/java/README.md`
- Create: `docs/posts/learning/java/java-day-1.md`

- [x] 创建 Java 子目录说明页，说明该目录用于 Java 基础和后续 Spring Boot 前置知识。
- [x] 创建带有现有 frontmatter 字段的 Day 1 Markdown 文章，按学习顺序组织指定主题，并加入可运行的 Java 示例和理论练习。
- [x] 运行 `pnpm docs:generate`，确认文章被递归发现且分类、标签、路径正确。
- [x] 运行 `pnpm docs:build`，确认 VuePress 能构建新目录和文章。
- [x] 检查 Git diff，确认只包含本次文章、目录说明和本计划文件；若仓库状态允许，再提交变更。
