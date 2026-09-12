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

## Python 路线任务上下文（2026-09-12）

- 当前目标项目已确认是 `/Users/jingzhe/Desktop/blog`，不是对话生成的空工作区。
- 当前 `main` 分支与 `origin/main` 一致，工作区干净；最近提交已完成 C++ 学习路线。
- Python 应仿照现有 `docs/posts/learning/{java,linux,cpp}/` 的专题目录组织，优先使用目录 `README.md` 作为专题入口，再添加正式文章以进入自动文章索引和 sidebar。
- 顶部导航已有“学习”一级入口，通常不需要新增导航项；是否调整专题 sidebar 要根据现有配置和构建结果决定。
- 现有 Java、Linux、C++ 专题都采用“目录 `README.md` + 正式文章”的形式，入口页用 `<PostList pathPrefix="/posts/learning/<topic>/" />` 展示专题文章。
- 当前生成脚本会递归收集 `docs/posts/` 下除 `README.md` 外的 Markdown，并把嵌套路径转换为 `/posts/learning/<topic>/<slug>.html`；配置会根据生成索引自动生成专题 sidebar，因此 Python 只需按同样目录结构添加内容。
- 当前“学习”分类简介已明确提到 C++、Java、Spring Boot、Linux、ACM；新增 Python 时应同步加入 Python/Django，保持索引页与实际内容一致。
- Python 路线适合以“专题入口 + 路线总览”作为首批发布内容，路线总览覆盖用户指定的基础、标准库、面向对象、环境、文件/异常、数据库、网络、测试、工程化和 Web/Django，并把 Flask/FastAPI 作为拓展分支。

## Python 资料核验（2026-09-12）

- Python 官方下载页当前显示最新稳定版为 Python 3.14.7（2026-08-05）；Python 3.13.15 仍可作为兼容性/生态保守选择。文章会以“跟随官网最新稳定版”表述，并提醒项目以依赖兼容性为准，不把补丁版本写死为永久不变的步骤。
- Python 3.14 官方 Windows 文档已将 Python Install Manager 作为推荐获取方式；安装后可使用 `python`、`py`、`pymanager`，推荐每个项目使用 `python -m venv <env>` 创建虚拟环境。旧式 launcher 文档在 3.14 已标记为 deprecated，因此环境文章应优先介绍 Install Manager，同时补充传统安装器/已有 Python 的排查方式。
- Python 官方 macOS 文档说明：python.org 安装器会提供框架、`python3`/版本命令和证书安装脚本；系统自带 `/usr/bin/python3` 可能属于 Apple 开发工具，不应删除或覆盖。文章需区分系统 Python、python.org 安装器和 Homebrew，不混淆 PATH。
- JetBrains 官方 PyCharm 文档当前仍以“为项目配置 Python interpreter”为核心；文章应同时说明 Windows 的 `File > Settings` 和 macOS 的 `PyCharm > Settings/Preferences` 路径，并优先选择项目内 `.venv` 解释器。
- Python Packaging User Guide 推荐使用 `venv` 与 `pip` 隔离项目依赖；Windows 激活命令为 `.venv\\Scripts\\activate`，macOS/Unix 激活命令为 `source .venv/bin/activate`，退出统一使用 `deactivate`。
- Python 3.14 官方教程覆盖解释器、控制流、数据结构、模块、输入输出、异常和类，适合作为 Day 1 与总路线的官方延伸链接。
- Django 官方下载页当前显示可用的 Django 6.1.1 安装命令；Django 6.1 发布说明说明其支持窗口与新的年度发布节奏有关。路线文章可把 Django 6.x 作为 Web 主线，但不在首批环境文章中绑定过多框架版本。
- 用户提供的 CSDN DevPress 页面通过内置网页检索无法稳定打开正文（返回内部错误），因此仅作为用户给出的参考入口；安装和配置步骤以 Python、JetBrains、Packaging、Django 官方资料为准。

## Python 环境配置反馈补充（2026-09-12）

- 用户反馈原环境文章虽然提到 PATH，但缺少“全局环境变量”的完整引导，并特别关注安装器中的勾选项；后续内容需要仿照 Java 环境文章的手把手结构。
- Python 3.14 官方 Windows 文档推荐 Python Install Manager；首次安装运行时可能提示将 %LocalAppData%\Python\bin 加入 PATH，运行时自己的 Scripts 目录也可能需要加入 PATH。
- Windows 环境变量应区分当前终端、用户变量和系统变量；个人电脑优先使用用户变量，修改 Path 时追加目录而不是覆盖原值。Python 学习不需要照搬 Java 的 JAVA_HOME，普通项目也不应随意设置 PYTHONPATH。
- Windows 图形界面入口可使用“编辑账户的环境变量”→“环境变量”→“用户变量”→“Path”；修改后必须重新打开终端和 PyCharm Terminal。
- 传统 Python Windows 安装器需要明确说明 Add python.exe to PATH、Add Python to environment variables、pip、py launcher、Install for all users 等选项的取舍。
- macOS 个人用户的持久 PATH 适合放在 ~/.zshrc；Homebrew 路径应先用 brew --prefix 确认，不能删除或覆盖 /usr/bin/python3。从 Dock 启动的 PyCharm 不一定继承 Terminal 中的临时变量，因此仍需在项目设置里明确选择 .venv。

## 资料链接补充

- [Python Using Python on Windows](https://docs.python.org/3.14/using/windows.html)
- [PowerShell about_Environment_Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables)

## C++ VS Code 与算法测试环境优化资料（2026-09-12）

- VS Code 官方 C++ 文档与 Microsoft C/C++ Marketplace 页面都明确说明：`ms-vscode.cpptools` 提供 IntelliSense、编辑和调试集成，但不包含编译器或调试器。
- CMake Tools 的官方 VS Code 教程适合多文件项目；它可以作为 C/C++ 扩展的 configuration provider，避免手写一堆平台相关 includePath。
- VS Code 官方测试文档已经提供原生 Testing UI；旧版 Test Explorer UI Marketplace 页面标记为 deprecated，因此文章不把它列为必装插件。
- C++ 标准库头文件应按功能从 `<algorithm>`、`<vector>`、`<string>`、`<queue>`、`<numeric>` 等标准头文件中选择。`bits/stdc++.h` 是 GCC 生态常见的非标准聚合头文件，Apple Clang + libc++ 不保证提供它。
- macOS 的解决方案不是安装 MinGW，而是继续使用 Apple Clang + libc++；如果要兼容旧算法模板，可以在项目 `include/bits/stdc++.h` 放一个列出标准头文件的本地兼容文件，并通过 `-Iinclude` 使用，但新代码仍推荐直接写标准头文件。
- CMake/CTest 官方流程使用 `enable_testing()`、`add_test()` 和 `ctest --test-dir build --output-on-failure`；GoogleTest 官方 CMake quickstart 使用 `FetchContent`、`gtest_discover_tests` 和 CTest。

### 新增资料链接

- [VS Code C/C++ 官方文档](https://code.visualstudio.com/docs/languages/cpp)
- [Microsoft C/C++ 扩展 Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [VS Code CMake Tools 教程](https://code.visualstudio.com/docs/cpp/cmake-linux)
- [VS Code C++ IntelliSense 配置](https://code.visualstudio.com/docs/cpp/configure-intellisense)
- [VS Code 官方测试文档](https://code.visualstudio.com/docs/debugtest/testing)
- [cppreference 标准库头文件](https://en.cppreference.com/w/cpp/standard_library)
- [CMake Testing and CTest](https://cmake.org/cmake/help/latest/guide/tutorial/Testing%20and%20CTest.html)
- [GoogleTest CMake Quickstart](https://google.github.io/googletest/quickstart-cmake.html)
- [CodeLLDB Marketplace](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)
