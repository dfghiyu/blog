# C++ 学习路线任务发现

## 项目现状

- 项目路径：`/Users/jingzhe/Desktop/blog`
- 技术栈：VuePress 2、vuepress-theme-hope、Vue 3、TypeScript、pnpm。
- 站点 base：`/blog/`。
- 当前 Git 分支：`main`，开始任务时工作区干净。

## 内容组织

- 学习分类目录：`docs/posts/learning/`。
- 已有专题：`acm`、`java`、`linux`，都使用目录 `README.md` 作为专题入口。
- 正式文章 frontmatter 使用中文标题、描述、日期、`category: 学习`、tag 数组和作者字段。
- `README.md` 不会被 `scripts/generate-content.mjs` 收集为文章，正式路线文章必须另有带 frontmatter 的 Markdown 文件。

## 导航生成

- `scripts/generate-content.mjs` 递归收集除 `README.md` 外的 Markdown，并输出 `docs/.vuepress/generated/posts.ts`。
- `docs/.vuepress/config.ts` 根据文章 slug 构建分类、专题和文章侧边栏。
- 因此只添加 `cpp` 目录入口不足以让专题出现在自动文章 sidebar；需要同时添加正式路线文章。
- 顶部 navbar 已有“学习”入口，本次不需要再增加一级导航。

## 风格

- 学习文章使用中文、编号小节、目标导向的解释、代码块和练习/总结。
- 现有内容强调可复现、循序渐进和与后续实践的联系；C++ 路线沿用该表达方式。

## 环境配置资料核验（2026-09-12）

- VS Code 官方 C/C++ 文档明确说明：C/C++ 扩展提供语法高亮、IntelliSense 和错误检查，但不包含编译器或调试器；需要单独安装 GCC/MinGW、Clang 或其他工具链。
- Windows 路线采用 MSYS2 + MinGW-w64 UCRT64：先安装 MSYS2，再在 UCRT64 终端执行 `pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`，默认工具目录为 `C:\msys64\ucrt64\bin`。
- MSYS2 官方环境说明显示 UCRT64 是默认推荐环境，MINGW64 正在弃用；文章不再推荐旧的独立 MinGW 下载器或过时的 `C:\mingw64\bin` 路径作为主流程。
- Windows 配置需要重新打开终端，让 PATH 生效，并验证 `gcc --version`、`g++ --version`、`gdb --version`。
- VS Code 第一次运行 C++ 文件时可以选择 `C/C++: g++.exe build and debug active file` 自动生成 `.vscode/tasks.json`；IntelliSense 可通过 `C/C++: Select IntelliSense Configuration` 或 `.vscode/c_cpp_properties.json` 指定 `compilerPath`、`cppStandard` 和 `intelliSenseMode`。
- macOS 使用 Apple Clang 和 `libc++`。先安装 Xcode Command Line Tools，并验证 `clang++ --version`、`xcrun --find clang++`；不把 MinGW 引入 macOS 主流程。若项目使用外部库，应通过 Homebrew、CMake 或库自身文档处理依赖，而不是为了“库”切换成 MinGW。
- macOS 上如果要从终端使用 `code`，需要在 VS Code 命令面板运行 `Shell Command: Install 'code' command in PATH`；这与 C++ 编译器 PATH 是两件事。
- CMake 官方教程建议使用 `cmake -B build` 和 `cmake --build build` 的 out-of-source 构建；多文件项目不应依赖 MSYS2 默认关闭的通配符展开。

## 资料链接

- [VS Code C/C++ overview](https://code.visualstudio.com/docs/languages/cpp)
- [VS Code: Using GCC with MinGW](https://code.visualstudio.com/docs/cpp/config-mingw)
- [VS Code C++ extension settings](https://code.visualstudio.com/docs/cpp/customize-cpp-settings)
- [MSYS2 environments](https://www.msys2.org/docs/environments/)
- [MSYS2 installation](https://www.msys2.org/docs/installer/)
- [MSYS2 updating](https://www.msys2.org/docs/updating/)
- [Apple C++ language support](https://developer.apple.com/xcode/cpp/)
- [Apple Command Line Tools](https://developer.apple.com/documentation/xcode/installing-the-command-line-tools)
- [CMake tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [参考文章：CSDN VS Code C++ 环境配置](https://blog.csdn.net/Yhw20040823/article/details/147520781)
