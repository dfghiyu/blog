# C++ 学习路线设计

## 目标

在博客的“学习”分类下新增 `cpp` 专题，发布完整的 C++ 入门资料：环境安装配置文章、学习路线总览和第一天学习文章，同时保留后续按阶段扩展独立文章的空间。内容应覆盖从开发环境到项目实践的完整路径，并沿用现有 VuePress 2 + vuepress-theme-hope 博客的 Markdown 内容组织方式。

## 现有项目约束

- 文章位于 `docs/posts/learning/<topic>/`，专题入口使用该目录下的 `README.md`。
- 正式文章使用中文 frontmatter，至少包含 `title`、`description`、`date`、`category`、`tag` 和 `author`。
- `category` 必须为 `学习`，文章通过 `scripts/generate-content.mjs` 自动进入文章列表、分类和标签索引。
- `.vuepress/config.ts` 根据生成的文章 slug 自动构造目录侧边栏；不直接编辑生成文件。
- 保持现有 `base: "/blog/"`、VuePress 依赖、主题视觉和 GitHub Pages 路由不变。

## 内容设计

新增四个 Markdown 页面：

1. `docs/posts/learning/cpp/README.md`
   - 作为 C++ 专题目录入口。
   - 说明专题的学习目标、文章组织方式和适合的先修基础。
   - 复用现有 `<PostList pathPrefix="/posts/learning/cpp/" />` 组件。

2. `docs/posts/learning/cpp/cpp-learning-roadmap.md`
   - 作为带日期、分类和标签的正式文章，确保首页、学习分类、标签页和自动 sidebar 都能发现它。
   - 使用阶段化路线，至少包括：
     - 开发环境与编译运行
     - 基础语法、类型、运算符和控制流
     - 函数、参数、返回值与作用域
     - 数组、字符串、指针和引用
     - 结构体、类、对象和面向对象
     - STL 容器、迭代器、算法和实用工具
     - 模板、lambda、移动语义、智能指针和 C++17/20 现代特性
     - 文件、流、错误处理与异常
     - 工程化、调试、测试、Git 和 CMake
     - 算法与刷题方法
     - 项目实践与继续深入方向
   - 每个阶段都给出学习目标、核心主题、建议练习和阶段完成标准，避免只有知识点清单。
   - 代码示例保持短小、可编译、适合初学者复现；不引入第三方依赖。

3. `docs/posts/learning/cpp/cpp-environment-setup.md`
   - 完整介绍 VS Code 下载、安装 C/C++ 扩展、创建工作区、验证编译器和配置 IntelliSense。
   - Windows 主流程使用 MSYS2 的 UCRT64 MinGW-w64：安装、更新、工具链安装、PATH 配置、`g++`/`gdb` 验证、VS Code 的 `tasks.json`/`launch.json`/`c_cpp_properties.json` 关系和常见故障排查。
   - macOS 主流程使用 Xcode Command Line Tools 提供的 Apple Clang 与 `libc++`，解释 `clang++`、`xcrun`、VS Code `code` 命令与外部库管理的关系。
   - 明确说明 MinGW 是 Windows 目标方案，不应为了 macOS 的库安装而切换到 MinGW；跨平台项目应使用对应平台的编译器和 CMake。
   - 文章末尾提供官方资料和用户给出的 CSDN 参考链接。

4. `docs/posts/learning/cpp/cpp-day-1.md`
   - 作为环境完成后的第一天学习文章，讲解 C++ 源文件、`main`、输入输出、变量与类型、运算符、条件判断和循环。
   - 包含可运行示例、编译命令、练习题、常见错误和 Day 1 完成标准，并为函数与作用域的下一阶段埋下连接。

同时更新 `docs/posts/learning/README.md`，将 C++ 纳入现有学习专题介绍。

## 导航与生成策略

不手工增加 navbar/sidebar 条目。新增正式文章后，内容生成脚本会生成 `learning/cpp/cpp-learning-roadmap` 记录，配置中的目录树会自动产生 `/posts/learning/cpp/` 节点，并将专题文章加入侧边栏。构建验证若发现目录入口未被正确发现，只做最小的配置补充。

## 验证标准

- `pnpm docs:generate` 能生成包含 C++ 文章、`学习` 分类和 C++ 相关标签的索引。
- `pnpm docs:build` 成功完成 VuePress 构建。
- 构建产物包含 `/posts/learning/cpp/` 入口和 `/posts/learning/cpp/cpp-learning-roadmap.html` 文章页面。
- 生成的文章链接、专题入口链接和文章内链接不指向不存在的路径。
- `git diff` 仅包含 C++ 专题文档、学习分类简介、设计/实施记录及构建生成文件的预期变化；不修改依赖和主题样式。

## 非目标

- 本次不拆分多个 Day 文章，不改造内容生成器，不重构 sidebar 逻辑。
- 本次 Day 1 只覆盖入门语法，不提前展开指针、面向对象和 STL；这些主题留给路线的后续阶段。
- 本次不增加 C++ 编译器、IDE、测试框架或外部课程依赖。
- 本次不改变博客首页布局、导航层级、主题配色和部署流程。
