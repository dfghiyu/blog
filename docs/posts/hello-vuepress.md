---
title: 从零搭建 VuePress 博客
description: 用 VuePress 和 GitHub Pages 搭一座轻量、可持续更新的小站。
date: 2026-09-09
category: 随笔
tag:
  - VuePress
  - 前端
  - 学习方法
author: 韩子阳
---

# 从零搭建 VuePress 博客

博客不一定要一开始就很复杂。先把写作路径打通，再慢慢让它长出自己的样子，这更适合长期记录。

## 为什么选择 VuePress

VuePress 把 Markdown 写作和 Vue 组件结合在一起，文章可以保持轻量，页面也可以保留足够的可塑性。对个人博客来说，它的核心优点是：内容易维护、构建结果是静态文件、部署成本很低。

## 最小的工作流

```bash
pnpm install
pnpm docs:dev
pnpm docs:build
```

本地预览时写文章，构建时检查链接和样式，最后推送到 `main`，GitHub Actions 就会负责部署。

## 给未来的自己

不要等到“准备得足够好”才开始。每次解决一个小问题，写下一段清晰的说明，几个月后就会得到一份很有价值的个人知识地图。

如果你也在搭自己的博客，可以从一个页面开始：写下你现在正在学什么，以及下一步准备做什么。
