# Python 学习路线设计

## 背景与目标

在现有 VuePress 2 + vuepress-theme-hope 博客的“学习”分类下新增 Python 专题，首发一套可以直接阅读和执行的学习入口、环境配置、Day 1 基础语法与阶段化路线。内容沿用现有 Java、Linux、C++ 专题的目录、frontmatter、语气和自动 sidebar 机制，不引入新的页面组件或导航样式。

本次范围止于 Python 基础、标准库、面向对象、包与虚拟环境、文件与异常、数据库、网络请求、测试、工程化和 Web 方向。Django 作为 Web 主线，Flask 与 FastAPI 作为拓展；机器学习只在路线末尾作为后续方向简要提及，不展开课程内容。

## 文件与访问结构

新增目录 `docs/posts/learning/python/`，包含四个文件：

1. `README.md`：Python 专题入口，说明目标、推荐学习方式和文章列表，并使用现有的 `<PostList pathPrefix="/posts/learning/python/" />` 组件。
2. `python-environment-setup.md`：Windows 与 macOS 的 Python 安装、版本验证、PATH 排查、pip、`.venv` 和 PyCharm 解释器配置。
3. `python-day-1.md`：第一天的解释器、脚本、变量、基本类型、输入输出、运算符、条件、循环、字符串、列表/字典初识和函数初识，并配套可运行练习。
4. `python-learning-roadmap.md`：从环境到 Web/Django 的长期路线表、阶段目标、练习产出和完成标准。

修改 `docs/posts/learning/README.md`，在现有专题简介中补充 Python 与 Django。顶部 navbar、生成索引文件和手写 sidebar 不做无必要改动：`scripts/generate-content.mjs` 会递归收集正式文章，`docs/.vuepress/config.ts` 会从生成索引构建专题树。

## 内容设计

### 专题入口

入口页保持现有专题 README 的短篇幅，包含：

- Python 适合解决的问题和本专题的学习目标；
- “先环境、再语法、再工程、最后 Web”的推荐顺序；
- 四篇首发文章的关系；
- 通过 `PostList` 展示专题文章。

### 环境配置文章

文章按照“先选版本，再安装，再验证，再配置项目”的顺序组织，避免把 IDE 配置与系统安装混在一起。

Windows 方案：

- 以 Python 3.14 系列当前最新稳定补丁版为示例，链接到 Python 官方 Windows 下载页；
- 优先说明 Python Install Manager，这是 Python 3.14 官方 Windows 文档推荐的方式；
- 说明 `python`、`py`、`pymanager` 的基本用途和 `py list` 检查运行时的方式；
- 补充传统安装器或已有 Python 的命令排查，以及 PATH 和 Windows 应用执行别名问题；
- 使用 `python -m venv .venv` 创建环境，使用 `.venv\\Scripts\\activate` 激活；
- PyCharm 中从 `File > Settings > Project > Python Interpreter` 为项目选择 `.venv\\Scripts\\python.exe`。

macOS 方案：

- 以 Python 3.14 系列当前最新稳定补丁版为示例，链接到 Python 官方 macOS 下载页；
- 说明 python.org 安装器与 Homebrew 的选择边界；
- 明确不要删除或覆盖 Apple 提供的 `/usr/bin/python3`，使用 `which python3`、`python3 --version` 和 `python3 -m pip --version` 验证实际解释器；
- 使用 `python3 -m venv .venv` 创建环境，使用 `source .venv/bin/activate` 激活；
- PyCharm 中从 `PyCharm > Settings/Preferences > Project > Python Interpreter` 选择 `.venv/bin/python`。

通用配置：

- 解释 `pip` 应通过当前解释器调用，即优先使用 `python -m pip` 或 `python3 -m pip`；
- 说明激活、安装 `requests`、查看依赖和 `deactivate`；
- 在 PyCharm 新建项目时选择已有 `.venv` 或让 PyCharm 创建项目虚拟环境；
- 提供 `python --version`/`python3 --version`、`python -c "print(...)"` 和运行示例文件的验收命令；
- 提供“命令找不到、PyCharm 红线、pip 装错环境、Windows 执行别名、macOS 系统 Python 混淆”等排查表。

### Day 1 文章

文章以一个从输入到输出的“小型学习进度记录器”贯穿，按以下顺序讲解：

1. 解释器、`.py` 脚本和运行方式；
2. 注释、缩进、变量和动态类型；
3. `int`、`float`、`bool`、`str`、`None`；
4. `print`、`input` 和类型转换；
5. 算术、比较、逻辑和成员运算符；
6. `if/elif/else`；
7. `for`、`while`、`range`、`break` 和 `continue`；
8. 字符串常用操作；
9. 列表、元组、字典和集合的初步认识；
10. `def`、参数、返回值和局部变量初识；
11. 综合练习、易错点、Day 1 总结和下一步。

示例代码必须可独立运行，使用 Python 3.14 可用的基础语法，不引入第三方依赖。涉及 HTML/Vue 可能误解析的内容全部放进代码围栏或使用行内代码。

### 路线总览文章

路线按依赖关系分阶段，首发文章包含以下阶段：

0. 环境与基本工具：解释器、终端、PyCharm、pip、`.venv`；
1. Python 基础语法：变量、类型、表达式、控制流、字符串和函数；
2. 内置数据结构：列表、元组、字典、集合、切片、推导式和迭代；
3. 模块与标准库：模块搜索路径、`pathlib`、`datetime`、`json`、`re`、`collections`、`itertools`、`logging`；
4. 面向对象：类、实例、继承、组合、特殊方法、属性和抽象边界；
5. 文件与异常：文本/CSV/JSON、上下文管理器、异常层次、日志和错误处理；
6. 包与虚拟环境：包结构、`pyproject.toml`、pip、依赖锁定、可发布包的基本概念；
7. 数据库：SQL 基础、SQLite、DB-API、事务、ORM 思维和 Django ORM 前置；
8. 网络请求：HTTP、`requests`、JSON API、超时、重试、认证和异步请求的边界；
9. 测试：`unittest`、pytest、断言、fixture、mock、覆盖率和测试数据；
10. 工程化：Git、代码风格、类型标注、ruff/black 等工具的职责、配置文件、日志、CI 和部署基础；
11. Web 主线：HTTP/Web 基础、Django 项目结构、URL、视图、模板、模型、表单、Admin、认证、测试和部署；
12. Web 拓展：Flask 的轻量路由模型、FastAPI 的类型提示与 API 文档，以及三者的适用场景比较；
13. 后续方向：数据分析、自动化、异步、爬虫、机器学习等，机器学习仅作下一阶段入口。

每个阶段都给出学习目标、核心知识、练习产出和完成标准，强调“写出可运行的小程序或小项目”而不是只阅读名词。路线文章中的 Django 版本与安装链接使用官方文档，不把暂未展开的机器学习库写成当前任务的必学依赖。

## Frontmatter 与命名

四篇正式文章均使用现有字段：`title`、`description`、`date`、`category: 学习`、`tag` 数组和 `author: 韩子阳`。文件名使用小写英文和连字符，与现有 `java-day-1.md`、`cpp-learning-roadmap.md` 保持一致。目录 `README.md` 不参与文章索引，但负责专题入口。

## 验证方案

完成内容后执行：

1. `pnpm docs:generate`，确认生成索引包含 Python 正式文章、学习分类和新标签；
2. 检查生成的路由与 sidebar，确认 `/posts/learning/python/` 和四个文章页可达；
3. `pnpm docs:build`，确认 VuePress 构建成功且没有 Markdown/Vue 模板解析错误；
4. 使用脚本或文本检查确认新增内部链接目标存在，frontmatter 字段完整；
5. `git diff --check`，确认没有空白错误；
6. 复核差异，确认没有修改生成文件以外的无关配置或样式。

## 资料原则

安装与版本信息以 Python 官方下载页和 Python 3.14 文档为准，虚拟环境以 Python Packaging User Guide 为准，PyCharm 解释器配置以 JetBrains 官方文档为准，Django 方向以 Django 官方文档为准。用户提供的 CSDN DevPress 页面作为表达和结构参考，不照搬可能过时的命令。
