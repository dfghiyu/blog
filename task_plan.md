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
| 内部链接检查脚本混用 CommonJS require 与顶层 await | 1 | 改用纯 ESM import 方式重新运行检查 |

---

# Python 学习路线发布计划

## 目标

在现有 VuePress 2 + vuepress-theme-hope 博客“学习”分类下新增 Python 专题入口、双平台环境配置、Day 1 基础语法和阶段化路线，并保持现有文章与自动导航风格。

## 阶段

- [x] 探索现有博客结构、专题组织、生成脚本和资料来源
- [x] 确认四篇首发内容与文件组织设计
- [x] 写入并提交 Python 设计文档
- [x] 编写实施计划
- [x] 创建 Python 专题入口、环境配置、Day 1 和路线文章
- [x] 更新学习分类简介并重新生成内容索引
- [x] 执行链接检查、VuePress 构建和差异复核
- [x] 提交 Python 路线并推送到 GitHub `origin/main`

## 当前决策

- 首发采用四篇文件：专题入口、环境配置、Day 1、路线总览。
- Python 正式文章位于 `docs/posts/learning/python/`，frontmatter 使用 `category: 学习`。
- 环境文章分别介绍 Windows Python Install Manager 与 macOS python.org/Homebrew 边界，并统一使用项目 `.venv`。
- Python 3.14 系列按官网当前最新稳定补丁版示例；文章避免把补丁版本写成永久固定值。
- Django 是 Web 主线，Flask/FastAPI 是拓展，机器学习只作为后续方向简述。
- 优先依赖现有递归生成和动态 sidebar，不手动改生成文件，不引入新组件或样式。

## Python 环境配置增强阶段

- [x] 对照 Java 环境文章复核安装步骤、标题层级和勾选说明
- [x] 补充传统 Windows 安装器及 PyCharm 安装器的勾选项
- [x] 补充 Windows 全局环境变量、PATH、用户/系统变量和验证流程
- [x] 补充 macOS ~/.zshrc PATH、自定义变量和验证流程
- [x] 更新常见问题、验收清单和资料发现记录
- [x] 重新生成内容并执行链接/构建验证
- [x] 提交并推送环境配置修订

---

# C++ VS Code 与算法测试环境优化计划（2026-09-12）

## 目标

参考 Java 环境文章的手把手风格，升级 C++ 环境文章：补齐 VS Code 插件清单、Windows 与 macOS 安装配置、算法刷题头文件方案、单文件编译任务、CMake/CTest 测试环境和排错流程，并直接提交到 GitHub。

## 决策

- Windows 继续使用 MSYS2 UCRT64 MinGW-w64；macOS 继续使用 Apple Clang + libc++，不为了第三方库切换到 MinGW。
- 把 `bits/stdc++.h` 明确标记为 GCC 非标准头文件；算法示例使用标准头文件，另提供仅用于兼容旧模板的本地聚合头文件方案。
- VS Code 插件分为必装、推荐和可选三档；不把已弃用的旧 Test Explorer UI 作为必装插件。
- 测试环境采用两级方案：先用带警告的单文件编译和断言快速验证，再用 CMake + CTest 管理可重复测试；GoogleTest 作为项目变大后的可选升级。

## 阶段

- [x] 对照 Java 环境文章和当前 C++ 文章，确认需要补齐的操作粒度
- [x] 检索 VS Code、CMake/CTest、GoogleTest、标准库头文件和 macOS Clang 资料
- [x] 重写 C++ 环境配置文章并补充算法与测试章节
- [x] 更新 C++ 专题入口和必要的学习路线链接
- [x] 生成内容、检查链接、构建 VuePress
- [x] 提交并推送到 GitHub，确认远程分支已更新
