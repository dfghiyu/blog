# C++ 学习路线与环境文章实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在学习分类下发布 C++ 专题入口、可靠的 VS Code/工具链安装配置文章、完整学习路线和 C++ Day 1 文章。

**Architecture:** 复用现有 `docs/posts/learning/<topic>/` 目录约定，使用一个 `README.md` 作为专题入口，使用三个带 frontmatter 的正式 Markdown 文章承载可被首页、分类、标签和自动 sidebar 发现的内容。保持内容生成脚本和 VuePress 配置不变，依靠新增文章 slug 自动生成 `cpp` 目录导航。

**Tech Stack:** VuePress 2、vuepress-theme-hope、Markdown frontmatter、现有 `PostList` Vue 组件、pnpm、Node.js 22。

## Global Constraints

- 文章必须放在 `docs/posts/learning/cpp/`。
- 正式文章必须使用 `category: 学习`，并包含 `title`、`description`、`date`、`tag` 和 `author`。
- Windows 主流程使用 MSYS2 的 UCRT64 MinGW-w64；安装命令为 `pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`，默认 PATH 为 `C:\msys64\ucrt64\bin`。
- macOS 主流程使用 Xcode Command Line Tools 提供的 Apple Clang 与 `libc++`；不把 MinGW 作为 macOS 方案。
- 保留 VuePress `base: "/blog/"`、现有依赖、主题视觉、navbar 和自动 sidebar 生成逻辑。
- 不编辑 `docs/.vuepress/generated/posts.ts`；它必须由 `pnpm docs:generate` 生成。
- 文章使用中文、编号小节、短小可运行示例、练习和阶段完成标准。
- 参考资料必须包含 VS Code、MSYS2、Apple Developer 和 CMake 官方链接，并保留用户提供的 CSDN 参考链接。

---

### Task 1: 创建 C++ 专题入口和环境配置文章

**Files:**
- Create: `docs/posts/learning/cpp/README.md`
- Create: `docs/posts/learning/cpp/cpp-environment-setup.md`

**Interfaces:**
- Consumes: existing `docs/posts/learning/java/README.md`, `docs/posts/learning/linux/README.md`, and project frontmatter conventions.
- Produces: `/posts/learning/cpp/` landing page and a formal setup article discovered by the content generator.

- [x] **Step 1: Create the C++ topic landing page**

Use this structure and preserve the existing `PostList` path convention:

```markdown
---
title: C++ 学习
description: C++ 开发环境、语言基础、工程化与项目实践的学习记录。
---

# C++ 学习

这里记录 C++ 学习过程中的环境配置、语法理解、算法练习和项目实践。先把编译、运行和调试环境配置好，再从基础语法逐步进入 STL、现代 C++、CMake 和完整项目。

<PostList pathPrefix="/posts/learning/cpp/" />
```

- [x] **Step 2: Write the environment setup article frontmatter**

Use a current date and these stable metadata values:

```yaml
---
title: VS Code 配置 C++ 开发环境：Windows MinGW-w64 与 macOS Clang
description: 从下载 VS Code、安装 C/C++ 扩展，到配置 Windows MinGW-w64 UCRT64 和 macOS Apple Clang，完成编译、运行、调试与 IntelliSense 验证。
date: 2026-09-12
category: 学习
tag:
  - C++
  - VS Code
  - MinGW-w64
  - MSYS2
  - Clang
  - CMake
  - 开发环境
author: 韩子阳
---
```

- [x] **Step 3: Write the Windows setup sections**

Include, in order:

1. Explain that VS Code is the editor and the C/C++ extension does not contain a compiler or debugger.
2. Download and install VS Code from the official page; prefer Windows User setup, explain that `code` is added to PATH, and remind readers to reopen terminals.
3. Install Microsoft C/C++ extension by searching `C++` in Extensions.
4. Install MSYS2 from the official installer, keep the default `C:\msys64` path unless the reader has a reason to change it, and open the UCRT64 terminal.
5. Update MSYS2 with `pacman -Suy`; if the terminal closes during a core upgrade, reopen UCRT64 and run the update again.
6. Install the toolchain with `pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`.
7. Add `C:\msys64\ucrt64\bin` to the user `Path`, reopen PowerShell/Command Prompt/VS Code, and verify `gcc --version`, `g++ --version`, and `gdb --version`.
8. Explain that MSYS2’s UCRT64 terminal has its own environment, while VS Code launched from Windows needs the compiler directory available through Windows PATH.

- [x] **Step 4: Write the VS Code configuration and first-run sections**

Cover the difference between:

- `compilerPath`: compiler used by IntelliSense to infer headers and defines.
- `cppStandard`: language standard used by IntelliSense, set to `c++17` for the first examples.
- `intelliSenseMode`: use the detected GCC configuration for Windows and Clang configuration for macOS.
- `tasks.json`: build task created by the C/C++ extension.
- `launch.json`: optional debugger launch configuration; explain that it is not the compiler installation.

Show the safe workflow: open a project folder, create `hello.cpp`, use `C/C++: Select IntelliSense Configuration`, run the play button, choose `C/C++: g++.exe build and debug active file`, set a breakpoint, and verify terminal output. Warn that multi-file projects should use explicit source lists or CMake instead of relying on `*.cpp` wildcard expansion.

- [x] **Step 5: Write the macOS setup sections**

Include:

1. Download the correct VS Code build for Intel or Apple silicon, install the `.app`, and optionally run `Shell Command: Install 'code' command in PATH` from the Command Palette.
2. Install Apple Command Line Tools with `xcode-select --install` when needed.
3. Verify `clang++ --version`, `xcrun --find clang++`, and a small `clang++ -std=c++17 hello.cpp -o hello` build.
4. Explain Apple Clang versus GNU g++ naming on macOS: the default compiler is Clang, the standard library is `libc++`, and an external library should be installed/configured according to its own package manager and CMake integration.
5. Explicitly correct the misconception that macOS needs MinGW for libraries: MinGW-w64 targets Windows; on macOS use Apple Clang or a separately chosen LLVM toolchain, and let CMake locate the platform-appropriate compiler and libraries.

- [x] **Step 6: Add troubleshooting and official references**

Troubleshoot these exact symptoms:

- `g++ 不是内部或外部命令` / `command not found`: reopen the terminal, check PATH, and verify the exact UCRT64 `bin` path.
- IntelliSense red underlines while compilation succeeds: select the matching compiler configuration and check `compilerPath`.
- `gdb` missing: reinstall the complete UCRT64 toolchain group rather than adding a random unrelated debugger path.
- VS Code play button asks for a compiler repeatedly: confirm the compiler is visible through PATH and the opened folder is the workspace root.
- macOS `xcrun` cannot find the tool: install or reset Command Line Tools and re-run `xcode-select --install`.

End with links to:

- `https://code.visualstudio.com/`
- `https://code.visualstudio.com/docs/languages/cpp`
- `https://code.visualstudio.com/docs/cpp/config-mingw`
- `https://code.visualstudio.com/docs/cpp/customize-cpp-settings`
- `https://www.msys2.org/docs/installer/`
- `https://www.msys2.org/docs/environments/`
- `https://www.msys2.org/docs/updating/`
- `https://developer.apple.com/xcode/cpp/`
- `https://developer.apple.com/documentation/xcode/installing-the-command-line-tools`
- `https://cmake.org/cmake/help/latest/guide/tutorial/index.html`
- the CSDN reference URL supplied by the user.

- [x] **Step 7: Run the content generator and inspect metadata**

Run:

```bash
pnpm docs:generate
rg -n 'cpp|C\+\+|MinGW|Clang|CMake' docs/.vuepress/generated/posts.ts
```

Expected: the generated file contains the setup article under the `learning/cpp` slug, category `学习`, and the listed tags.

### Task 2: Create the route overview and C++ Day 1 article

**Files:**
- Create: `docs/posts/learning/cpp/cpp-learning-roadmap.md`
- Create: `docs/posts/learning/cpp/cpp-day-1.md`
- Modify: `docs/posts/learning/README.md`

**Interfaces:**
- Consumes: Task 1’s `learning/cpp` path and existing article style.
- Produces: a staged roadmap, a first-day lesson, and a learning-category description that names C++.

- [x] **Step 1: Update the learning category introduction**

Change the existing sentence to mention C++ without changing the component path:

```markdown
这里记录学习过程中的疑问、练习和阶段性总结。像 C++、Java、Spring Boot、Linux、ACM 这样的主题，会继续放在下一级文件夹里。
```

- [x] **Step 2: Write the roadmap article**

Use frontmatter with title `C++ 学习路线：从能编译到能完成项目`, category `学习`, date `2026-09-12`, author `韩子阳`, and tags covering `C++`, `学习路线`, `编程基础`, `现代 C++`, `CMake`, and `算法`.

Write the article as 11 stages. For each stage include `学习目标`, `核心内容`, `练习产出`, and `完成标准`:

1. Environment and compile/run loop.
2. Syntax, types, operators, branches, and loops.
3. Functions, parameters, return values, scope, and headers.
4. Arrays, `std::string`, pointers, references, and memory model basics.
5. Structs, classes, constructors, encapsulation, inheritance, and polymorphism.
6. STL containers, iterators, algorithms, strings, and utility types.
7. Templates, lambda, `auto`, range-for, `const`, move semantics, RAII, smart pointers, and C++17/20 features.
8. Streams, file I/O, error handling, exceptions, and resource cleanup.
9. Debugging, warnings, Git, testing, CMake, target-based builds, and out-of-source builds.
10. Algorithm patterns, complexity, common data structures, and deliberate problem practice.
11. Project practice: command-line tool, file-indexing or todo app, testable multi-file project, and next directions.

Add a recommended order and a “不要急着学什么” section to keep beginners from jumping directly to advanced templates or frameworks.

- [x] **Step 3: Write the Day 1 article frontmatter and learning goals**

Use:

```yaml
---
title: C++ 学习 Day 1：从第一个程序到控制流程
description: 从源文件、main 函数和输入输出开始，掌握变量、常见类型、运算符、条件判断与循环，完成第一个可运行的 C++ 小程序。
date: 2026-09-12
category: 学习
tag:
  - C++
  - 学习笔记
  - 基础语法
  - 编程入门
author: 韩子阳
---
```

The article must explain the relationship among source code, compiler, executable, and runtime before presenting code. Include a first program, `g++ -std=c++17 main.cpp -o main` for Windows-like GCC shells, `clang++ -std=c++17 main.cpp -o main` for macOS, and how to run the resulting executable on each platform.

- [x] **Step 4: Write Day 1 lessons and exercises**

Cover in numbered sections:

1. `#include <iostream>`, `int main()`, braces, semicolons, and comments.
2. `std::cout`, `std::cin`, `std::string`, and why `std::` is written explicitly.
3. `int`, `long long`, `double`, `char`, `bool`, initialization, and choosing types.
4. Arithmetic, comparison, logical operators, integer division, and operator precedence.
5. `if/else` and a small score/temperature decision example.
6. `for`, `while`, loop counters, and a sum/counting example.
7. A combined “学习进度统计” program using input, variables, branching, and a loop.
8. Common mistakes: missing semicolons, wrong `std::`, using `=` instead of `==`, integer division, uninitialized variables, and stale terminal PATH.
9. Four short exercises with expected behavior but no full answer, followed by a completion checklist.
10. Preview the next article stage: functions and scope.

Keep code examples self-contained and compile them mentally against both GCC and Apple Clang; avoid platform-specific APIs.

### Task 3: Verify generated navigation, links, and VuePress build

**Files:**
- Modify: `docs/.vuepress/generated/posts.ts` (generated output only)
- Inspect: `docs/.vuepress/config.ts`
- Inspect: `docs/.vuepress/dist/`

**Interfaces:**
- Consumes: four new Markdown pages and the category update.
- Produces: generated post metadata, sidebar routes, static pages, and a clean build result.

- [x] **Step 1: Regenerate content metadata**

Run:

```bash
pnpm docs:generate
```

Expected: the command exits 0 and reports the increased post/tag counts; `docs/.vuepress/generated/posts.ts` contains all three formal C++ articles with `category: "学习"`.

- [x] **Step 2: Check expected routes and sidebar inputs**

Run:

```bash
rg -n 'learning/cpp|cpp-learning-roadmap|cpp-environment-setup|cpp-day-1|C\+\+' docs/.vuepress/generated/posts.ts docs/posts/learning/cpp docs/posts/learning/README.md
```

Expected: all three article slugs, tags, the `cpp` README path, and the updated category description are present. Do not add a manual sidebar entry unless the generated build proves one is missing.

- [x] **Step 3: Build the site**

Run:

```bash
pnpm docs:build
```

Expected: exit code 0 with static output under `docs/.vuepress/dist/`.

- [x] **Step 4: Verify built routes and links**

Run:

```bash
test -f docs/.vuepress/dist/posts/learning/cpp/index.html
test -f docs/.vuepress/dist/posts/learning/cpp/cpp-environment-setup.html
test -f docs/.vuepress/dist/posts/learning/cpp/cpp-learning-roadmap.html
test -f docs/.vuepress/dist/posts/learning/cpp/cpp-day-1.html
rg -n 'cpp-environment-setup|cpp-learning-roadmap|cpp-day-1' docs/.vuepress/dist/posts/learning/index.html docs/.vuepress/dist/posts/learning/cpp/index.html docs/.vuepress/dist/index.html
```

Expected: all four pages exist and the learning index/sidebar output references the three formal C++ articles.

- [x] **Step 5: Review the final diff**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Expected: no whitespace errors; changes are limited to the C++ content, learning introduction, generated post metadata, and planning records. Do not claim completion until the build and route checks have exited successfully.
