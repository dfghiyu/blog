# Python 学习路线 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在“学习”分类下发布 Python 专题入口、双平台环境配置、Day 1 基础语法和从基础到 Django Web 的学习路线。

**Architecture:** 新增 `docs/posts/learning/python/`，使用 `README.md` 作为专题入口，三篇正式文章承载环境配置、Day 1 和路线总览。复用现有递归内容生成脚本和动态 sidebar，只修改学习分类简介。

**Tech Stack:** VuePress 2、vuepress-theme-hope、Markdown frontmatter、pnpm、`scripts/generate-content.mjs`。

## Global Constraints

- 延续现有中文标题、编号小节、目标导向语气、frontmatter、标签和作者风格。
- Python 3.14 系列以官网当前稳定补丁版为例，并注明版本会更新。
- Windows 介绍 Python Install Manager、`python`/`py`/`pymanager`、PATH、`venv` 和 PyCharm。
- macOS 介绍 python.org/Homebrew、Apple 系统 Python 边界、`python3`、`venv` 和 PyCharm。
- 依赖放入项目 `.venv`，pip 优先使用 `python -m pip` 或 `python3 -m pip`。
- Django 为 Web 主线，Flask/FastAPI 为拓展，机器学习只作后续方向。
- 不手动编辑生成文件，不新增组件、样式或无关配置。

---

### Task 1: Python 专题入口

**Files:**
- Create: `docs/posts/learning/python/README.md`

**Interfaces:**
- Produces: `/posts/learning/python/` 专题页，供动态 sidebar 和文章列表使用。

- [ ] **Step 1: Create the topic README**

参照 Java/Linux/C++ 专题入口，写入 `title: Python 学习`、覆盖 Python 基础与 Web/Django 的 description，以及学习目标、推荐顺序、四篇首发文章关系。

- [ ] **Step 2: Add the existing article list**

文件末尾使用：

```md
<PostList pathPrefix="/posts/learning/python/" />
```

- [ ] **Step 3: Verify the entry shape**

Run: `sed -n '1,220p' docs/posts/learning/python/README.md`

Expected: frontmatter 正确闭合、只有一个一级标题、路径以 `/posts/learning/python/` 结尾。

---

### Task 2: Windows/macOS Python 安装与 PyCharm 配置

**Files:**
- Create: `docs/posts/learning/python/python-environment-setup.md`

**Interfaces:**
- Consumes: Python 官方下载/平台文档、Packaging User Guide、JetBrains PyCharm interpreter 文档。
- Produces: 双平台可执行安装、`.venv` 工作流、PyCharm 解释器选择和排错表。

- [ ] **Step 1: Add frontmatter and version policy**

使用标题 `Python 环境配置：Windows、macOS 与 PyCharm`，日期 `2026-09-12`，`category: 学习`，标签包含 `Python`、`PyCharm`、`虚拟环境`、`环境配置`，作者为 `韩子阳`。说明官方页面当前显示 Python 3.14.7，但读者应跟随当前稳定补丁版。

- [ ] **Step 2: Write Windows installation and verification**

介绍 python.org/Microsoft Store 的 Python Install Manager、首次安装运行时、可选 PATH、`python`/`py`/`pymanager` 和 `py list`。包含：

```powershell
python --version
py --version
py list
python -c "print('Python Windows 环境正常')"
```

补充传统安装器、PATH 刷新、Windows 应用执行别名和多版本冲突排查。

- [ ] **Step 3: Write macOS installation and verification**

介绍 python.org universal installer 与 Homebrew 的选择，明确不要删除 `/usr/bin/python3`，并包含：

```bash
which python3
python3 --version
python3 -m pip --version
python3 -c "print('Python macOS 环境正常')"
```

说明 python.org 安装器的证书脚本和 PATH 顺序检查。

- [ ] **Step 4: Write the shared virtual-environment workflow**

分别给出 Windows 的 `.venv\\Scripts\\activate` 与 macOS 的 `source .venv/bin/activate`，演示 `python -m pip install --upgrade pip`、安装 `requests`、`pip list` 和 `deactivate`，解释为什么 `.venv/` 不提交 Git。

- [ ] **Step 5: Write PyCharm setup**

说明 Windows `File > Settings > Project > Python Interpreter` 与 macOS `PyCharm > Settings/Preferences > Project > Python Interpreter`，选择 Windows `.venv\\Scripts\\python.exe` 或 macOS `.venv/bin/python`，并用 `hello.py` 完成运行/调试验证。

- [ ] **Step 6: Add troubleshooting and references**

至少覆盖命令找不到、PyCharm 红线、pip 装错环境、Windows 执行别名、macOS 系统 Python 混淆和激活策略问题。链接 Python 下载页、Windows/macOS 文档、venv/pip 指南、PyCharm 文档和用户提供的 CSDN 参考页，并注明官方资料优先。

- [ ] **Step 7: Check content hazards**

Run: `rg -n '<[A-Za-z]|TODO|TBD|待定' docs/posts/learning/python/python-environment-setup.md`

Expected: 无占位词，Python 命令中的尖括号只出现在代码围栏或行内代码中。

---

### Task 3: Python Day 1 基础语法

**Files:**
- Create: `docs/posts/learning/python/python-day-1.md`

**Interfaces:**
- Produces: 使用 Python 标准库、可独立运行的 Day 1 教程和综合练习。

- [ ] **Step 1: Add frontmatter and goals**

使用标题 `Python 学习 Day 1：从运行环境到基础语法`，日期 `2026-09-12`，`category: 学习`，标签包含 `Python`、`Python基础`、`学习笔记`，作者为 `韩子阳`。

- [ ] **Step 2: Cover interpreter fundamentals**

依次讲解释器、REPL、`.py` 脚本、注释、缩进、变量和动态类型；示例覆盖 `int`、`float`、`bool`、`str`、`None`。

- [ ] **Step 3: Cover I/O and operators**

讲 `print`、`input`、`int`/`float` 转换、算术/比较/逻辑/成员运算符，并特别说明 `is` 不用于普通值相等判断。

- [ ] **Step 4: Cover control flow and collections**

讲 `if/elif/else`、`for`、`while`、`range`、`break`、`continue`，以及列表、元组、字典、集合初识。

- [ ] **Step 5: Cover functions and exercise**

讲 `def`、参数、返回值、局部变量，使用“学习进度记录器”串起输入、判断、循环和输出，附常见错误、练习题、Day 1 总结和官方教程链接。

- [ ] **Step 6: Validate Markdown/code fences**

Run: `rg -n '^```|TODO|TBD|待定' docs/posts/learning/python/python-day-1.md`

Expected: 代码围栏成对出现，无占位词；所有可能被 VuePress 解析的尖括号都在代码或行内代码中。

---

### Task 4: Python 阶段化路线总览

**Files:**
- Create: `docs/posts/learning/python/python-learning-roadmap.md`

**Interfaces:**
- Consumes: 环境配置和 Day 1 文章。
- Produces: 从 Python 基础到 Django/Web 的阶段目标、练习产出和完成标准。

- [ ] **Step 1: Add frontmatter and route table**

使用标题 `Python 学习路线：从基础语法到 Django Web`，日期 `2026-09-12`，`category: 学习`，标签包含 `Python`、`学习路线`、`Django`、`Web开发`、`工程化`，作者为 `韩子阳`。路线表使用 0–13 阶段：环境、语法、数据结构与函数、模块与标准库、面向对象、文件与异常、包与虚拟环境、数据库、网络、测试、工程化、Django、Flask/FastAPI 拓展、后续方向。

- [ ] **Step 2: Expand each phase**

每阶段都写学习目标、核心内容、练习产出和完成标准；必须覆盖 `pathlib`、`json`、`datetime`、`re`、`collections`、`itertools`、`logging`、SQL/SQLite/ORM、HTTP/requests、pytest/unittest/mock、`pyproject.toml`、类型标注、格式化/lint、CI 和部署基础。

- [ ] **Step 3: Define Web direction**

把 Django 的 URL、视图、模板、模型、表单、Admin、认证、测试、部署作为主线；简要比较 Flask 的轻量组合和 FastAPI 的类型提示/API 文档，不展开第二套完整课程。

- [ ] **Step 4: Bound the future directions**

把自动化、异步、数据分析、爬虫和机器学习写成后续分支，明确机器学习不属于本次首发主体。

- [ ] **Step 5: Add practice rhythm and references**

强调每阶段必须有小程序/小项目、错误复盘和阶段验收，链接 Python 教程、Packaging、Django、Flask 和 FastAPI 官方文档。

- [ ] **Step 6: Check topic coverage**

Run: `rg -n '基础语法|标准库|面向对象|虚拟环境|文件|异常|数据库|网络|测试|工程化|Django|Flask|FastAPI|机器学习' docs/posts/learning/python/python-learning-roadmap.md`

Expected: 所有必需主题均出现，机器学习只作为后续方向。

---

### Task 5: Update learning index and generated navigation

**Files:**
- Modify: `docs/posts/learning/README.md`
- Generate: `docs/.vuepress/generated/posts.ts` via `pnpm docs:generate`

- [ ] **Step 1: Mention Python and Django in the learning index**

只扩展现有专题列表句子，不改变 `<PostList pathPrefix="/posts/learning/" />` 或页面结构。

- [ ] **Step 2: Generate and inspect content index**

Run: `pnpm docs:generate`

Expected: exit code 0，生成索引包含三个 Python 正式文章路径、`学习` 分类和新标签。

- [ ] **Step 3: Verify routes/sidebar and internal links**

Run: `rg -n 'learning/python|Python 学习|python-environment-setup|python-day-1|python-learning-roadmap' docs/.vuepress/generated/posts.ts docs/.vuepress/.temp/internal/routes.js docs/.vuepress/.temp/theme-hope/sidebar.js`

Expected: 专题页和三篇文章均有生成引用；所有 Python 内部链接与实际路径一致。

---

### Task 6: Build, commit and push

**Files:**
- Verify: Python 四篇文章、学习索引、生成索引、规划记录。

- [ ] **Step 1: Run production build and hygiene checks**

Run: `pnpm docs:build`, `git diff --check`, `git status --short`

Expected: 构建退出码为 0、无空白错误、只有本任务范围内的文件变化。

- [ ] **Step 2: Review the final diff**

Run: `git diff --stat` and `git diff -- docs/posts/learning/python docs/posts/learning/README.md`

Confirm no unrelated 样式、配置或缓存文件被加入。

- [ ] **Step 3: Commit**

Run:

```bash
git add docs/posts/learning/python docs/posts/learning/README.md docs/.vuepress/generated/posts.ts findings.md progress.md task_plan.md docs/superpowers/plans/2026-09-12-python-learning-roadmap.md
git commit -m "docs: add Python learning roadmap"
```

Expected: `main` 创建一个包含 Python 内容和生成索引的提交。

- [ ] **Step 4: Push without force**

Run: `git push origin main`

Expected: `origin/main` 前进到新提交；若远程分叉，停止并报告，不使用 force push。

- [ ] **Step 5: Confirm remote state**

Run: `git status --short --branch` and `git log -1 --oneline --decorate`

Expected: `main` 工作区干净，最新提交为 Python 路线提交。

## Execution status

- [x] Task 1：Python 专题入口
- [x] Task 2：Windows/macOS 安装与 PyCharm 配置
- [x] Task 3：Python Day 1 基础语法
- [x] Task 4：Python 阶段化路线总览
- [x] Task 5：学习索引、生成导航与内部链接检查
- [x] Task 6：构建、提交并推送到 GitHub
