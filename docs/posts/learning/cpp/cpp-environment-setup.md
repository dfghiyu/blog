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

# VS Code 配置 C++ 开发环境：Windows MinGW-w64 与 macOS Clang

学 C++ 的第一道门槛通常不是语法，而是“代码到底由谁编译、怎样运行”。VS Code 和 C/C++ 扩展负责编辑、补全和调试入口，但不自带 g++、clang++ 或 gdb。本文把编辑器、编译器、调试器和标准库拆开，分别配置 Windows 和 macOS 两套环境。

- Windows：VS Code + Microsoft C/C++ 扩展 + MSYS2 UCRT64 + MinGW-w64 GCC/GDB。
- macOS：VS Code + Microsoft C/C++ 扩展 + Xcode Command Line Tools + Apple Clang + libc++。

这两条路线都可以完成 C++ 的编译、运行、调试和后续 CMake 开发。MinGW-w64 是面向 Windows 的工具链，macOS 不需要为了使用第三方库而切换到 MinGW。

## 1. 先弄清楚几个名字

| 名称 | 作用 | Windows | macOS |
| --- | --- | --- | --- |
| 编译器 | 把 cpp 源代码翻译成可执行文件 | g++ | clang++ |
| 调试器 | 断点、单步执行、查看变量 | gdb | LLDB/Xcode 工具链 |
| C++ 标准库 | 提供 iostream、string、vector 等 | GCC 的 libstdc++ | Apple 的 libc++ |
| 编辑器 | 编写代码、调用工具 | VS Code | VS Code |
| 构建系统 | 管理多文件、库和编译选项 | CMake | CMake |

VS Code 的 C/C++ 扩展提供语法高亮、IntelliSense 和错误提示，但不包含编译器或调试器。看到扩展已经安装，不代表电脑已经可以编译 C++。

## 2. 下载和安装 VS Code

### 2.1 Windows

打开 [Visual Studio Code 官方下载页](https://code.visualstudio.com/)，下载 Windows 版本。普通个人电脑优先选择 User setup：只为当前用户安装，通常不需要管理员权限，更新比较方便，安装程序也会把 code 命令加入 PATH。

安装完成后，重新打开 PowerShell 或命令提示符，验证：

```powershell
code --version
```

如果找不到 code，完全退出已经打开的终端和 VS Code，再打开新的终端。旧进程不会自动读取安装后更新的环境变量。

### 2.2 macOS

打开 [Visual Studio Code 官方下载页](https://code.visualstudio.com/)，根据 Mac 芯片选择 Apple silicon、Intel 或 Universal 版本。下载 dmg 后，把 Visual Studio Code.app 拖到 Applications 文件夹。

如果希望在终端中使用 code .：打开 VS Code 命令面板，执行 Shell Command: Install 'code' command in PATH，重新打开终端，再执行 code --version 验证。code 命令只是 VS Code 的启动命令，与后面的 clang++ 不是同一件事。

## 3. 安装 C/C++ 扩展

打开 VS Code 左侧 Extensions，搜索 C++，安装 Microsoft 发布的 C/C++ 扩展。快捷键是 Windows/Linux 的 Ctrl+Shift+X，或 macOS 的 Command+Shift+X。

安装后打开 cpp 文件，可以立即看到语法高亮，但仍然需要安装平台对应的编译器。

## 4. Windows：安装 MSYS2 和 MinGW-w64

### 4.1 为什么选择 MSYS2 UCRT64

MinGW-w64 让 GCC 在 Windows 上生成原生 Windows 程序。MSYS2 提供安装器、终端环境和 pacman 包管理器，可以安装和更新 MinGW-w64、GCC、GDB 以及开发库。

本文使用 UCRT64：MSYS2 当前默认推荐 UCRT64；它使用 Windows 的 Universal C Runtime；适合新建 Windows C++ 项目；可以一次安装编译器、调试器和常用开发工具。

不建议把多年前的独立 MinGW 安装包、随机下载的 mingw64 压缩包和 MSYS2 混用。混用后经常会出现头文件、运行时和 PATH 来自不同版本的问题。

### 4.2 安装和更新 MSYS2

从 [MSYS2 官方安装页面](https://www.msys2.org/docs/installer/) 下载 64 位安装器。普通情况下保留默认目录：

```text
C:\msys64
```

安装结束后，打开开始菜单中的 MSYS2 UCRT64。不要先打开普通的 MSYS2 MSYS 终端来安装 Windows C++ 工具链，不同终端对应不同环境。

在 MSYS2 UCRT64 终端执行：

```bash
pacman -Suy
```

MSYS2 是滚动更新发行版。如果更新过程中提示关闭终端，按提示关闭，重新打开 MSYS2 UCRT64，再次执行 pacman -Suy。不要在更新尚未完成时继续安装工具链。

### 4.3 安装 MinGW-w64 工具链

在 MSYS2 UCRT64 终端执行：

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

出现软件包列表时按 Enter 接受默认选择，再输入 Y 确认。安装完成后验证：

```bash
gcc --version
g++ --version
gdb --version
```

### 4.4 配置 Windows PATH

把下面的目录加入当前用户的 Path：

```text
C:\msys64\ucrt64\bin
```

步骤：Windows 搜索“编辑账户的环境变量”→“环境变量”→用户变量中的 Path→编辑→新建。保存后重新打开 PowerShell、命令提示符和 VS Code。

在新的 PowerShell 中验证：

```powershell
gcc --version
g++ --version
gdb --version
where.exe g++
```

where.exe g++ 应该能看到 C:\msys64\ucrt64\bin\g++.exe。MSYS2 UCRT64 终端自带 /ucrt64/bin，所以 MSYS2 内部能运行 g++，不代表从 PowerShell 启动的 VS Code 也能找到它；两个环境要分别验证。

## 5. 在 VS Code 中配置 Windows C++

### 5.1 创建工作区和测试文件

新建 cpp-learning 文件夹，用 VS Code 的 File → Open Folder 打开文件夹，而不是只打开单独的 cpp 文件。创建 hello.cpp：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << '\n';
    return 0;
}
```

### 5.2 配置 IntelliSense

打开命令面板，执行 C/C++: Select IntelliSense Configuration，选择检测到的 g++.exe。需要手动配置时，创建 .vscode/c_cpp_properties.json：

```json
{
  "configurations": [
    {
      "name": "Win32-GCC",
      "compilerPath": "C:/msys64/ucrt64/bin/g++.exe",
      "intelliSenseMode": "windows-gcc-x64",
      "cppStandard": "c++17",
      "cStandard": "c17"
    }
  ],
  "version": 4
}
```

compilerPath 最重要。C/C++ 扩展会询问这个编译器，从它那里推断标准库头文件和默认宏。不要先复制网上的几十条 GCC 内部 includePath。

### 5.3 编译、运行和调试

第一次点击编辑器右上角的运行按钮时，选择 C/C++: g++.exe build and debug active file。扩展通常会在 .vscode/tasks.json 中保存构建任务。构建成功后，输出会出现在 VS Code 集成终端中；点击行号左侧设置断点，再选择 Debug C/C++ File 即可调试。

tasks.json 负责如何编译，launch.json 负责如何启动调试器；它们都不能替代编译器安装和 PATH 配置。进入多文件项目后，应使用 CMake 管理源文件和库。

### 5.4 不要依赖 *.cpp 通配符

MSYS2 的 MinGW-w64 环境默认不会像某些 Unix Shell 那样自动展开所有通配符。多文件项目不要依赖 g++ src/*.cpp 这种写法。可以显式列出源文件，或者尽早使用 CMake：

```bash
cmake -B build
cmake --build build
```

## 6. macOS：使用 Apple Clang，不安装 MinGW

### 6.1 安装 Command Line Tools

macOS 的 C++ 主线是 Apple Clang 和 libc++。需要时在终端执行：

```bash
xcode-select --install
```

验证工具位置：

```bash
clang++ --version
xcrun --find clang++
```

xcrun --find clang++ 通常会输出 /usr/bin/clang++。Apple 官方说明中，Clang 编译器随 Xcode/Command Line Tools 提供，macOS 的 C++ 标准库运行时使用 libc++。

### 6.2 在 VS Code 中配置 Clang

选择 C/C++: Select IntelliSense Configuration，选择 /usr/bin/clang++。需要手动保存时，创建 .vscode/c_cpp_properties.json：

```json
{
  "configurations": [
    {
      "name": "macOS-Clang",
      "compilerPath": "/usr/bin/clang++",
      "intelliSenseMode": "${default}",
      "cppStandard": "c++17",
      "cStandard": "c17"
    }
  ],
  "version": 4
}
```

intelliSenseMode 使用平台默认值可以让扩展根据 Intel 或 Apple silicon 选择对应架构，不要把 Windows 的 windows-gcc-x64 配置复制到 macOS。

### 6.3 编译、运行和调试

```bash
clang++ -std=c++17 -Wall -Wextra -g hello.cpp -o hello
./hello
```

macOS 底层调试器由 Apple 工具链提供，学习阶段不需要手动安装 Windows 的 gdb.exe。

### 6.4 使用第三方库时要不要切换到 MinGW

不需要。MinGW-w64 的目标平台是 Windows，它用于生成 Windows 原生程序，不是 macOS 的库兼容层。macOS 上的库要和 macOS 的编译器、架构、SDK 以及运行时匹配，通常使用 Apple Clang + libc++，再按照库的官方说明安装依赖。

CMake 可以通过 find_package、target_link_libraries 和库提供的配置文件接入第三方库。项目不应该为了一个库手动把整个编译器切换成另一套平台工具链。

如果确实想使用 GNU GCC 进行对比实验，可以安装 macOS 版本的 GCC；这仍然是 macOS 工具链，不是 MinGW-w64。初学阶段保持 Apple Clang 主线更容易排查问题。

## 7. 跨平台最小验证

Windows + GCC：

```powershell
g++ -std=c++17 -Wall -Wextra -g hello.cpp -o hello.exe
./hello.exe
```

macOS + Clang：

```bash
clang++ -std=c++17 -Wall -Wextra -g hello.cpp -o hello
./hello
```

三条命令都完成后，你已经验证了源文件、标准库、编译器、可执行文件和 VS Code 工作区可以连起来。

## 8. 常见问题

### g++ 不是内部或外部命令

检查 MSYS2 是否安装 mingw-w64-ucrt-x86_64-toolchain，PATH 是否是 C:\msys64\ucrt64\bin，终端和 VS Code 是否已经重新打开，以及 where.exe g++ 找到的是否是旧版本。

不要只把 C:\msys64\usr\bin 加入 PATH。那是 MSYS 工具目录，不等于 UCRT64 编译器目录。

### gdb 找不到

确认安装的是完整工具链组：

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

之后重新打开终端并验证 gdb --version。如果 VS Code 已经生成旧的 launch.json，检查 miDebuggerPath 是否仍然指向旧目录。

### 能编译，但 IntelliSense 仍然报错

打开命令面板执行 C/C++: Select IntelliSense Configuration，选择实际使用的 g++ 或 clang++。手动配置时优先检查 compilerPath，不要先盲目添加大量 includePath。

### macOS 找不到 xcrun 或 clang++

运行 xcode-select --install。如果系统安装过但路径损坏，根据 Apple 文档检查当前开发者目录，并以 xcrun --find clang++ 能否找到编译器为准。

## 9. 安装完成检查表

- [ ] VS Code 可以打开一个 C++ 文件夹。
- [ ] Microsoft C/C++ 扩展已经安装。
- [ ] Windows 能运行 g++ --version 和 gdb --version，或 macOS 能运行 clang++ --version 和 xcrun --find clang++。
- [ ] hello.cpp 能在终端编译和运行。
- [ ] IntelliSense 能跳转到 std::cout、std::string 等标准库类型。
- [ ] 可以设置断点并启动调试。
- [ ] 明白 Windows 的 MinGW-w64 与 macOS 的 Apple Clang 是两条不同的工具链。
- [ ] 明白第三方库应通过对应平台的官方安装方式和 CMake 接入，不需要为了 macOS 的库切换到 MinGW。

## 参考资料

- [Visual Studio Code 官方下载页](https://code.visualstudio.com/)
- [VS Code：C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp)
- [VS Code：Using GCC with MinGW](https://code.visualstudio.com/docs/cpp/config-mingw)
- [VS Code：C++ extension settings reference](https://code.visualstudio.com/docs/cpp/customize-cpp-settings)
- [MSYS2 安装文档](https://www.msys2.org/docs/installer/)
- [MSYS2 环境说明](https://www.msys2.org/docs/environments/)
- [MSYS2 更新文档](https://www.msys2.org/docs/updating/)
- [Apple：C++ language support](https://developer.apple.com/xcode/cpp/)
- [Apple：Installing the command-line tools](https://developer.apple.com/documentation/xcode/installing-the-command-line-tools)
- [CMake Tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [参考文章：用 VS Code 配置 C++ 环境](https://blog.csdn.net/Yhw20040823/article/details/147520781)
