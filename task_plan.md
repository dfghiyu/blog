# C++ 学习路线发布计划

## 目标

在现有 VuePress 2 + vuepress-theme-hope 博客的“学习”分类下新增可发布的 C++ 专题入口和阶段化学习路线，保持现有内容、frontmatter、自动 sidebar 与构建流程。

## 阶段

- [x] 探索现有博客结构、学习目录、frontmatter、生成脚本和主题配置
- [x] 完成并落盘设计文档
- [x] 更新设计范围并编写实施计划
- [x] 新增 C++ 专题入口、环境配置文章、路线文章和 Day 1 文章
- [x] 更新学习分类简介并重新生成内容索引
- [x] 执行链接检查与 VuePress 构建验证
- [x] 复核差异并汇报修改文件

## 当前决策

- 使用“一篇专题入口 + 一篇路线总览”的最小可扩展结构。
- C++ 正式路线文章放在 `docs/posts/learning/cpp/`，分类为 `学习`。
- 用户补充要求新增一篇完整的 VS Code + C++ 环境安装配置文章，以及一篇 C++ 学习 Day 1 文章。
- Windows 环境主线为 MSYS2 UCRT64 MinGW-w64；macOS 主线为 Apple Clang + libc++，不将 MinGW 作为 macOS 方案。
- 先依赖现有自动 sidebar；只有构建结果证明必要时才修改 `.vuepress/config.ts`。

## 实施计划

- Task 1：专题入口与跨平台环境配置文章
- Task 2：学习路线总览、Day 1 文章与学习分类简介
- Task 3：生成索引、检查路由、构建并复核差异

## 错误记录

| 错误 | 尝试 | 处理 |
|---|---:|---|
| 初始会话目录不是博客仓库 | 1 | 根据项目清单定位到 `/Users/jingzhe/Desktop/blog`，后续以该仓库为准 |
| VuePress 把 `<iostream>` 解析为未闭合标签 | 1 | 定位到 Day 1 正文中的代码围栏外文本，将其改为行内代码 |

---

# Python 学习路线发布计划

## 目标

在现有 VuePress 2 + vuepress-theme-hope 博客“学习”分类下新增 Python 专题入口、双平台环境配置、Day 1 基础语法和阶段化路线，并保持现有文章与自动导航风格。

## 阶段

- [x] 探索现有博客结构、专题组织、生成脚本和资料来源
- [x] 确认四篇首发内容与文件组织设计
- [x] 写入并提交 Python 设计文档
- [ ] 编写实施计划
- [ ] 创建 Python 专题入口、环境配置、Day 1 和路线文章
- [ ] 更新学习分类简介并重新生成内容索引
- [ ] 执行链接检查、VuePress 构建和差异复核

## 当前决策

- 首发采用四篇文件：专题入口、环境配置、Day 1、路线总览。
- Python 正式文章位于 `docs/posts/learning/python/`，frontmatter 使用 `category: 学习`。
- 环境文章分别介绍 Windows Python Install Manager 与 macOS python.org/Homebrew 边界，并统一使用项目 `.venv`。
- Python 3.14 系列按官网当前最新稳定补丁版示例；文章避免把补丁版本写成永久固定值。
- Django 是 Web 主线，Flask/FastAPI 是拓展，机器学习只作为后续方向简述。
- 优先依赖现有递归生成和动态 sidebar，不手动改生成文件，不引入新组件或样式。
