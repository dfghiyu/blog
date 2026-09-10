# BugAwake

这是一个使用 VuePress 2 + vuepress-theme-hope 搭建的中文个人博客，记录技术、学习与生活。

线上地址：<https://dfghiyu.github.io/blog/>

## 环境

- Node.js 22
- pnpm 10

## 本地启动

```bash
pnpm install
pnpm docs:dev
```

开发服务器启动后打开终端里显示的本地地址。生产构建：

```bash
pnpm docs:build
```

构建产物位于 `docs/.vuepress/dist/`。

## 新增文章

按文章分类把 Markdown 文件放在对应目录中：

```text
docs/posts/
├── technology/
├── learning/
│   └── acm/
├── life/
└── essay/
```

例如，ACM 题解放在 `docs/posts/learning/acm/`，其他学习笔记直接放在 `docs/posts/learning/`。每篇文章填写至少这些 frontmatter：

```md
---
title: 文章标题
description: 一句话摘要
date: 2026-09-10
category: 技术
tag:
  - 编程
author: 韩子阳
---
```

保存后运行 `pnpm docs:dev`，文章生成器会递归读取这些分类目录，首页、文章目录、分类页和标签页会自动更新。

## 首次推送到 GitHub

在当前项目目录执行：

```bash
git init
git branch -M main
git remote add origin https://github.com/dfghiyu/blog.git
git add .
git commit -m "feat: build personal blog"
git push -u origin main
```

如果远程仓库已经有提交，先执行 `git pull --rebase origin main`，再推送。

## GitHub Pages 设置

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
3. 确认仓库的默认分支为 `main`。
4. 推送后，在 **Actions** 中等待 `Deploy VuePress to GitHub Pages` 完成。

工作流已经包含 Pages 所需权限、Node.js 22、pnpm 安装、锁定依赖、构建和部署步骤。博客仓库使用项目站点路径，因此 VuePress 配置中的 `base` 固定为 `/blog/`。
