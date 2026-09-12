---
title: VS Code 配置 C++ 开发环境：Windows MinGW-w64、macOS Clang 与算法测试
description: 参考 Java 环境文章的完整配置方式，介绍 VS Code 插件、Windows MinGW-w64、macOS Apple Clang、算法刷题模板、CMake 和 CTest 测试环境。
date: 2026-09-12
category: 学习
tag:
  - C++
  - VS Code
  - MinGW-w64
  - MSYS2
  - Clang
  - CMake
  - 算法
  - 开发环境
author: 韩子阳
---

# VS Code 配置 C++ 开发环境：Windows MinGW-w64、macOS Clang 与算法测试

如果准备学习 C++ 或算法，建议先把环境搭建成“能编译、能运行、能调试、能测试、能复现”的状态。只安装 VS Code 还不够，因为 VS Code 是编辑器，不包含 C++ 编译器和调试器。

本文参考 Java 环境文章的组织方式，从下载软件开始，分别配置 Windows 和 macOS，并把算法刷题中经常遇到的 bits/stdc++.h 问题讲清楚。完成本文后，你应该能够：

- 安装 VS Code 和正确的 C++ 扩展；
- 在 Windows 上使用 MSYS2 UCRT64 MinGW-w64；
- 在 macOS 上使用 Apple Clang 和 libc++；
- 在 VS Code 中配置 IntelliSense、编译和断点调试；
- 使用标准头文件编写跨平台算法代码；
- 用 CMake + CTest 建立可重复的测试环境。

## 一、先看结论：两套平台方案怎么选

| 平台 | 编译器 | 调试器 | 标准库 | 推荐用途 |
| --- | --- | --- | --- | --- |
| Windows | MSYS2 UCRT64 MinGW-w64 GCC | GDB | libstdc++ | Windows 原生 C++、算法练习、CMake 项目 |
| macOS | Apple Clang | LLDB | libc++ | macOS 原生 C++、算法练习、CMake 项目 |

Windows 的 MinGW-w64 和 macOS 的 Apple Clang 是面向不同操作系统的工具链。macOS 不需要、也不应该为了使用第三方库而切换到 MinGW。第三方库应该按照 macOS 版本的官方文档，通过 Homebrew、CMake 或库自身的包管理方式接入。

### VS Code、扩展、编译器和调试器不是一回事

~~~text
VS Code
  └── 编辑器和开发入口
      ├── C/C++ 扩展：补全、跳转、错误提示、调试集成
      ├── 编译器：g++ 或 clang++，把 cpp 源文件编译成程序
      ├── 调试器：gdb 或 lldb，负责断点、单步和变量查看
      └── CMake：管理多文件项目、编译选项、库和测试
~~~

Microsoft 的 C/C++ 扩展不会替你安装 g++、clang++ 或 gdb。

## 二、VS Code 应该安装哪些插件

在 VS Code 左侧打开 Extensions：Windows/Linux 使用 Ctrl + Shift + X，macOS 使用 Command + Shift + X。

| 级别 | 扩展名称 | 扩展 ID | 作用 |
| --- | --- | --- | --- |
| 必装 | C/C++（Microsoft） | ms-vscode.cpptools | IntelliSense、错误检查、代码导航和调试入口 |
| 推荐 | CMake Tools（Microsoft） | ms-vscode.cmake-tools | 配置、构建、运行和测试 CMake 项目 |
| 可选 | CMake | twxs.cmake | CMakeLists.txt 语法高亮和补全 |
| 可选 | CodeLLDB | vadimcn.vscode-lldb | macOS 或跨平台项目的另一套 LLDB 调试界面 |

C/C++ 扩展是必装项，CMake Tools 是多文件项目和测试的推荐项。VS Code 自带 Testing UI，不需要把已标记为 deprecated 的旧版 Test Explorer UI 当成必装扩展。

Code Runner 一类的一键运行扩展可能隐藏编译参数，也容易和 CMake、任务和调试配置冲突。先理解下面的真实命令，再考虑是否安装：

~~~bash
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o main
clang++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o main
~~~

不要同时启用 Microsoft C/C++、clangd 等多个 C++ 智能感知引擎，否则可能出现重复补全和重复诊断。

## 三、下载和安装 VS Code

### 3.1 Windows

打开 [Visual Studio Code 官方下载页](https://code.visualstudio.com/)，普通 Intel/AMD 电脑选择 Windows x64。个人电脑学习优先选择 User Setup，通常不需要管理员权限；安装时建议勾选将 code 加入 PATH，以及“用 Code 打开文件/文件夹”的右键菜单。

安装完成后，关闭已经打开的终端和 VS Code，再打开新的 PowerShell 验证：

~~~powershell
code --version
~~~

如果 code 找不到，先完全退出终端和 VS Code，再打开新的终端。环境变量只会传给新启动的进程。

### 3.2 macOS

执行下面的命令确认芯片：

~~~bash
uname -m
~~~

arm64 选择 Apple silicon，x86_64 选择 Intel。下载 dmg 后把 Visual Studio Code.app 拖到 Applications 文件夹。

如果希望使用 code .：

1. 打开 VS Code 命令面板；
2. 执行 Shell Command: Install 'code' command in PATH；
3. 重新打开终端；
4. 执行 code --version。

这里的 code 只是启动编辑器的命令，与编译 C++ 的 clang++ 没有关系。

## 四、Windows：安装 MSYS2 UCRT64 MinGW-w64

### 4.1 安装和更新

从 [MSYS2 官方安装页面](https://www.msys2.org/docs/installer/) 下载 64 位安装器，安装目录建议保留：

~~~text
C:\msys64
~~~

安装后从开始菜单打开 MSYS2 UCRT64，不要用普通 MSYS2 MSYS 终端安装 Windows C++ 工具链。

先更新：

~~~bash
pacman -Suy
~~~

如果更新核心组件时提示关闭终端，按提示关闭，重新打开 UCRT64，再执行一次 pacman -Suy，确认更新完成后再继续。

### 4.2 安装编译器、调试器和构建工具

安装 MinGW-w64 工具链：

~~~bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
~~~

验证：

~~~bash
gcc --version
g++ --version
gdb --version
~~~

准备学习 CMake 和测试时，再安装：

~~~bash
pacman -S --needed mingw-w64-ucrt-x86_64-cmake mingw-w64-ucrt-x86_64-ninja
cmake --version
ninja --version
~~~

不要把旧教程中的独立 MinGW 压缩包、随机下载的 mingw64 和 MSYS2 混用。

### 4.3 配置 Windows 用户 Path

把下面的目录加入当前用户的 Path：

~~~text
C:\msys64\ucrt64\bin
~~~

操作路径：搜索“编辑账户的环境变量” → “环境变量” → “用户变量” → Path → “编辑” → “新建”。不要覆盖 Path 原有内容，只追加目录。

保存后关闭并重新打开 PowerShell、CMD 和 VS Code，验证：

~~~powershell
gcc --version
g++ --version
gdb --version
where.exe g++
~~~

where.exe g++ 应该指向类似 C:\msys64\ucrt64\bin\g++.exe。MSYS2 UCRT64 终端自带 /ucrt64/bin，因此 MSYS2 终端能运行 g++，不代表从 Windows 启动的 VS Code 也能找到它；两个环境都要分别验证。

## 五、macOS：Apple Clang、libc++ 和 CMake

### 5.1 安装 Command Line Tools

如果还没有命令行开发工具，执行：

~~~bash
xcode-select --install
~~~

验证：

~~~bash
clang++ --version
xcrun --find clang++
~~~

通常 xcrun --find clang++ 会输出 /usr/bin/clang++。macOS 的主线是 Apple Clang、LLDB 和 libc++，学习 C++ 不必为了使用 VS Code 安装完整 Xcode。

### 5.2 安装 CMake 和 Ninja

如果已使用 Homebrew：

~~~bash
brew install cmake ninja
cmake --version
ninja --version
~~~

也可以从 [CMake 官方下载页](https://cmake.org/download/) 安装。先用 which cmake 确认当前实际使用的版本。

### 5.3 macOS 不要为了库切换到 MinGW

bits/stdc++.h 是 GCC 生态常见的内部聚合头文件，不是 ISO C++ 标准的一部分。Apple Clang + libc++ 不保证提供它。MinGW-w64 的目标是 Windows 原生程序，不是 macOS 的库兼容层。

macOS 上应当：

- 使用 Apple Clang 编译 C++；
- 使用 macOS 对应架构和 SDK 的库；
- 通过 Homebrew 或库的官方方式安装依赖；
- 通过 CMake 的 find_package、目标链接和配置文件接入第三方库。

如果要比较 GNU GCC，可以安装 macOS 版本的 GCC；它仍然是 macOS 工具链，不是 MinGW-w64，Homebrew 命令通常会带版本后缀，例如 g++-15。

## 六、解决算法中的 bits/stdc++.h

### 6.1 推荐方案：直接使用标准头文件

算法代码优先按功能包含标准头文件：

| 功能 | 常用标准头文件 |
| --- | --- |
| 输入输出 | iostream |
| 字符串 | string、string_view |
| 动态数组 | vector |
| 排序、二分、反转 | algorithm |
| 求和和数值操作 | numeric |
| 队列、优先队列 | queue |
| 栈 | stack |
| 集合、映射 | set、map |
| 哈希表 | unordered_set、unordered_map |
| 数组和元组 | array、tuple |
| 极值和断言 | limits、cassert |

跨平台算法模板：

~~~cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
    std::vector<int> numbers{4, 1, 3, 2};
    std::sort(numbers.begin(), numbers.end());

    const int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "sum = " << total << '\n';

    std::unordered_map<std::string, int> frequency;
    ++frequency["cpp"];
    return 0;
}
~~~

编译时明确指定标准和警告：

~~~bash
# Windows + MinGW-w64
g++ -std=c++17 -Wall -Wextra -pedantic -g main.cpp -o main.exe

# macOS + Apple Clang
clang++ -std=c++17 -Wall -Wextra -pedantic -g main.cpp -o main
~~~

### 6.2 兼容旧模板：本地聚合头文件

如果旧题解大量使用 include bits/stdc++.h，可以在项目内创建：

~~~text
include/
└── bits/
    └── stdc++.h
~~~

内容由项目自己维护，例如：

~~~cpp
#pragma once

#include <algorithm>
#include <array>
#include <cassert>
#include <cmath>
#include <deque>
#include <iostream>
#include <limits>
#include <list>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
~~~

编译时增加项目头文件路径：

~~~bash
# Windows
g++ -std=c++17 -Iinclude main.cpp -o main.exe

# macOS
clang++ -std=c++17 -Iinclude main.cpp -o main
~~~

这只是兼容旧代码，不是把它变成标准头文件。新代码仍建议直接列出标准头文件，这样 IntelliSense、其他编译器和在线评测环境更一致。

## 七、在 VS Code 中配置 IntelliSense

### 7.1 打开项目文件夹

不要只打开一个 cpp 文件，使用 File → Open Folder 打开项目根目录，例如：

~~~text
cpp-learning/
├── .vscode/
├── include/
├── src/
├── tests/
└── CMakeLists.txt
~~~

### 7.2 选择编译器

按 F1 或 Command/Ctrl + Shift + P，执行：

~~~text
C/C++: Select IntelliSense Configuration
~~~

Windows 选择 MSYS2 UCRT64 的 g++.exe，macOS 选择 /usr/bin/clang++。

compilerPath 决定扩展从哪套编译器推断标准库路径、默认宏和系统头文件。不要一开始盲目复制很多内部 includePath。

Windows 的 .vscode/c_cpp_properties.json：

~~~json
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
~~~

macOS：

~~~json
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
~~~

各字段含义：

- compilerPath：IntelliSense 使用的实际编译器；
- cppStandard：编辑器提示所依据的 C++ 标准，初学阶段可用 c++17；
- intelliSenseMode：平台和编译器对应的智能感知模式；
- includePath：额外项目头文件目录，需要时再添加。

使用 CMake Tools 后，CMake 生成的编译信息可以作为 C/C++ 扩展的 configuration provider，通常比手工维护 includePath 更准确。

### 7.3 推荐工作区设置

.vscode/settings.json：

~~~json
{
  "C_Cpp.default.cppStandard": "c++17",
  "C_Cpp.default.cStandard": "c17",
  "cmake.configureOnOpen": true,
  "cmake.buildDirectory": "${workspaceFolder}/build"
}
~~~

这只是编辑器默认设置，真正决定编译命令的是任务或 CMake。

## 八、单文件编译、运行和调试

创建 main.cpp：

~~~cpp
#include <iostream>

int main() {
    int value = 0;
    std::cin >> value;
    std::cout << value * 2 << '\n';
    return 0;
}
~~~

Windows PowerShell：

~~~powershell
g++ -std=c++17 -Wall -Wextra -pedantic -g main.cpp -o main.exe
.\main.exe
~~~

macOS：

~~~bash
clang++ -std=c++17 -Wall -Wextra -pedantic -g main.cpp -o main
./main
~~~

确认终端编译成功后，再在 VS Code 中打开 main.cpp，点击右上角运行按钮，选择 C/C++: g++.exe build and debug active file；macOS 选择检测到的 Clang 构建选项。

扩展通常会生成 .vscode/tasks.json 和 .vscode/launch.json：

- tasks.json 负责编译；
- launch.json 负责启动调试器；
- 两者都不能替代编译器和调试器的安装。

手写单文件任务的关键配置：

~~~json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "C++: build active file",
      "type": "shell",
      "windows": {
        "command": "g++",
        "args": ["-std=c++17", "-Wall", "-Wextra", "-pedantic", "-g", "${file}", "-o", "${fileDirname}\\${fileBasenameNoExtension}.exe"]
      },
      "osx": {
        "command": "clang++",
        "args": ["-std=c++17", "-Wall", "-Wextra", "-pedantic", "-g", "${file}", "-o", "${fileDirname}/${fileBasenameNoExtension}"]
      },
      "problemMatcher": ["$gcc"],
      "group": {"kind": "build", "isDefault": true}
    }
  ]
}
~~~

在行号左侧点击断点，按 F5 启动调试。Windows 的 GDB 路径应指向：

~~~text
C:\msys64\ucrt64\bin\gdb.exe
~~~

macOS 使用 LLDB；如果 cppdbg 体验不理想，再安装 CodeLLDB，避免给同一个启动项同时配置两套调试器。

## 九、多文件项目：用 CMake

出现多个 cpp、头文件、第三方库或测试后，应使用 CMake，不要依赖：

~~~bash
g++ src/*.cpp -o app
~~~

不同终端对通配符的处理不同。CMake 中显式列出源文件：

~~~cmake
cmake_minimum_required(VERSION 3.20)
project(cpp_learning LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(cpp_learning
    src/main.cpp
    src/solution.cpp
)

target_include_directories(cpp_learning PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_compile_options(cpp_learning PRIVATE
    $<$<CXX_COMPILER_ID:GNU,Clang>:-Wall -Wextra -pedantic>
)
~~~

配置和构建：

~~~bash
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build build
~~~

如果使用 Visual Studio 这类多配置生成器：

~~~powershell
cmake --build build --config Debug
~~~

## 十、配置算法练习的测试环境

### 10.1 第一层：单文件快速检查

每道算法题至少做三件事：使用警告编译，用最小、边界和极端样例运行，把可复用逻辑写成函数并用 assert 做回归检查。

~~~cpp
#include <cassert>

int max_value(int left, int right) {
    return left > right ? left : right;
}

int main() {
    assert(max_value(2, 5) == 5);
    assert(max_value(-3, -7) == -3);
    assert(max_value(4, 4) == 4);
    return 0;
}
~~~

返回 0 表示通过，断言失败会返回非零状态，适合用命令行或 VS Code 任务快速验证。

### 10.2 第二层：CMake + CTest

练习项目结构：

~~~text
algorithm-practice/
├── CMakeLists.txt
├── src/
│   ├── sum.cpp
│   └── sum.hpp
└── tests/
    └── sum_test.cpp
~~~

src/sum.hpp：

~~~cpp
#pragma once
int sum(int left, int right);
~~~

src/sum.cpp：

~~~cpp
#include "sum.hpp"

int sum(int left, int right) {
    return left + right;
}
~~~

tests/sum_test.cpp：

~~~cpp
#include <cassert>
#include "sum.hpp"

int main() {
    assert(sum(2, 3) == 5);
    assert(sum(-2, 2) == 0);
    assert(sum(0, 0) == 0);
    return 0;
}
~~~

CMakeLists.txt：

~~~cmake
cmake_minimum_required(VERSION 3.20)
project(algorithm_practice LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_library(solution src/sum.cpp)
target_include_directories(solution PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

add_executable(sum_test tests/sum_test.cpp)
target_link_libraries(sum_test PRIVATE solution)

include(CTest)
if(BUILD_TESTING)
    add_test(NAME sum_test COMMAND sum_test)
endif()
~~~

执行：

~~~bash
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
cmake --build build
ctest --test-dir build --output-on-failure
~~~

include(CTest) 会生成测试信息，ctest 从 build 目录发现并运行测试；--output-on-failure 会打印失败程序的输出。

### 10.3 在 VS Code 中运行 CMake 测试

安装 ms-vscode.cmake-tools 后：

1. 打开包含 CMakeLists.txt 的项目根目录；
2. 在底部状态栏选择 GCC 或 Clang Kit；
3. 执行 Configure；
4. 执行 Build；
5. 打开左侧 Testing 面板运行或调试测试；
6. 也可以执行 ctest --test-dir build --output-on-failure。

项目变大后，可以按 [GoogleTest CMake Quickstart](https://google.github.io/googletest/quickstart-cmake.html) 接入 GoogleTest。第一次配置可能联网下载依赖；CI 或团队环境不允许联网时，应固定版本并准备缓存或包管理方案。

## 十一、调试与运行时检查

学习阶段使用 -g 和警告，不要一开始加 -O3：

~~~bash
clang++ -std=c++17 -Wall -Wextra -pedantic -g main.cpp -o main
~~~

macOS 的 Apple Clang 还可以尝试 sanitizer：

~~~bash
clang++ -std=c++17 -Wall -Wextra -g \
  -fsanitize=address,undefined \
  -fno-omit-frame-pointer \
  main.cpp -o main
./main
~~~

它们可以帮助发现越界、悬空指针和一部分未定义行为。Windows MinGW-w64 对 sanitizer 的支持可能因版本不同而不同；如果参数不支持，先回到普通 Debug 编译。

## 十二、常见问题排查

### g++ 不是内部或外部命令 / command not found

检查工具链是否安装，Path 是否为 C:\msys64\ucrt64\bin，是否重新打开终端和 VS Code，以及 where.exe g++ 找到的是否是旧版 MinGW。

### 能编译但 IntelliSense 标红

执行 C/C++: Select IntelliSense Configuration，选择实际使用的 g++ 或 clang++。CMake 项目确认已 Configure，并检查旧的 c_cpp_properties.json 是否覆盖了项目配置。

### bits/stdc++.h 找不到

优先改成标准头文件；兼容旧模板时，在项目中创建 include/bits/stdc++.h，并在编译命令中加 -Iinclude。不要为了这个头文件给 macOS 安装 MinGW。

### gdb 找不到

在 MSYS2 UCRT64 中重新执行：

~~~bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
~~~

确认 C:\msys64\ucrt64\bin 在 Windows Path 中，不要下载来源不明的 gdb.exe 混入当前工具链。

### VS Code 反复询问编译器

确认 VS Code 集成终端中能运行 g++ --version 或 clang++ --version，打开的是项目文件夹，compilerPath 指向实际编译器，CMake 项目已执行 Configure。

### macOS xcrun 找不到 Clang

执行：

~~~bash
xcode-select --install
xcode-select -p
xcrun --find clang++
~~~

不要删除系统开发工具目录来“清理环境”。

## 十三、完成检查表

- [ ] VS Code 能打开一个 C++ 项目文件夹。
- [ ] 已安装 ms-vscode.cpptools。
- [ ] 多文件项目已安装 ms-vscode.cmake-tools。
- [ ] Windows 能运行 g++ --version、gdb --version；或 macOS 能运行 clang++ --version、xcrun --find clang++。
- [ ] hello.cpp 能编译、运行和设置断点。
- [ ] IntelliSense 能识别 vector、string 和 sort。
- [ ] 算法模板使用标准头文件，而不是依赖 bits/stdc++.h。
- [ ] 已知如何用 CMake 配置、构建和运行 CTest。
- [ ] 明白 macOS 使用 Apple Clang + libc++，不需要为了库切换到 MinGW。

## 参考资料

- [Visual Studio Code 官方下载页](https://code.visualstudio.com/)
- [VS Code：C/C++ 官方文档](https://code.visualstudio.com/docs/languages/cpp)
- [Microsoft C/C++ 扩展 Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [VS Code：Using GCC with MinGW](https://code.visualstudio.com/docs/cpp/config-mingw)
- [VS Code：C++ IntelliSense 配置](https://code.visualstudio.com/docs/cpp/configure-intellisense)
- [VS Code：CMake Tools 教程](https://code.visualstudio.com/docs/cpp/cmake-linux)
- [VS Code：Testing 官方文档](https://code.visualstudio.com/docs/debugtest/testing)
- [MSYS2 安装文档](https://www.msys2.org/docs/installer/)
- [MSYS2 环境说明](https://www.msys2.org/docs/environments/)
- [MSYS2 更新文档](https://www.msys2.org/docs/updating/)
- [Apple：C++ language support](https://developer.apple.com/xcode/cpp/)
- [Apple：Installing the command-line tools](https://developer.apple.com/documentation/xcode/installing-the-command-line-tools)
- [cppreference：C++ 标准库](https://en.cppreference.com/w/cpp/standard_library)
- [CMake：Testing and CTest](https://cmake.org/cmake/help/latest/guide/tutorial/Testing%20and%20CTest.html)
- [GoogleTest：CMake Quickstart](https://google.github.io/googletest/quickstart-cmake.html)
- [CodeLLDB Marketplace](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)
- [参考文章：用 VS Code 配置 C++ 环境](https://blog.csdn.net/Yhw20040823/article/details/147520781)
