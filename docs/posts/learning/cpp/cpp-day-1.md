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

# C++ 学习 Day 1：从第一个程序到控制流程

今天先不急着学习指针、类和 STL。第一天的目标很明确：知道 C++ 程序从哪里开始，能够自己编译和运行一个 cpp 文件，并使用变量、输入输出、判断和循环完成一个小程序。

如果还没有安装工具链，可以先阅读 [VS Code 配置 C++ 开发环境](/posts/learning/cpp/cpp-environment-setup.html)。本文默认已经可以在终端执行 g++ --version 或 clang++ --version。

## 1. 从源代码到运行结果

C++ 是编译型语言。main.cpp 只是源代码，计算机不能直接把它当成最终程序运行：

```text
main.cpp 源代码
      ↓ 编译器检查并翻译
可执行文件
      ↓ 操作系统加载
程序运行结果
```

Windows 上常用 GCC 的 g++ 编译，macOS 上常用 Apple Clang 的 clang++ 编译。编辑器帮助我们写代码，真正完成翻译的是编译器。

## 2. 第一个 C++ 程序

新建 main.cpp：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << '\n';
    return 0;
}
```

逐行理解：`include <iostream>` 引入标准输入输出流；`int main()` 是程序入口；花括号包住函数体；`std::cout` 输出文字；``n` 换行；`return 0` 表示正常结束。

Windows + g++：

```bash
g++ -std=c++17 -Wall -Wextra main.cpp -o main.exe
./main.exe
```

macOS + Apple Clang：

```bash
clang++ -std=c++17 -Wall -Wextra main.cpp -o main
./main
```

-std=c++17 指定标准版本，-Wall -Wextra 打开常用警告，-o 指定生成的可执行文件名称。

## 3. 输出和输入

std::cout 可以连续输出多个内容：

```cpp
#include <iostream>

int main() {
    int day = 1;
    std::cout << "今天是 C++ 学习 Day " << day << '\n';
    return 0;
}
```

std::cin 从终端读取数据：

```cpp
#include <iostream>

int main() {
    int hours = 0;
    std::cout << "今天学习了多少小时？ ";
    std::cin >> hours;
    std::cout << "你输入了 " << hours << " 小时。\n";
    return 0;
}
```

cout 和 cin 属于标准库的 std 命名空间，所以完整写法是 std::cout 和 std::cin。初学阶段推荐始终写完整名称，不要在所有文件开头写 using namespace std;。

## 4. 变量和常见类型

变量是有名字、有类型、可以保存数据的对象：

```cpp
#include <iostream>
#include <string>

int main() {
    int age = 20;
    long long total = 10000000000LL;
    double score = 91.5;
    char level = 'A';
    bool finished = false;
    std::string name = "BugAwake";

    std::cout << name << ' ' << age << ' ' << score << ' '
              << level << ' ' << finished << ' ' << total << '\n';
}
```

| 类型 | 常见用途 | 示例 |
| --- | --- | --- |
| int | 一般整数 | int count = 3; |
| long long | 可能超过 int 范围的整数 | long long distance = 10000000000LL; |
| double | 带小数的数值 | double average = 91.5; |
| char | 一个字符 | char answer = 'Y'; |
| bool | 真或假 | bool valid = true; |
| std::string | 一段文字 | std::string title = "C++"; |

推荐在创建变量时给它一个明确的初始值，不要让局部变量保持未初始化状态。

## 5. 运算符

### 5.1 算术运算

```cpp
int a = 7;
int b = 2;

std::cout << a + b << '\n';
std::cout << a - b << '\n';
std::cout << a * b << '\n';
std::cout << a / b << '\n';
std::cout << a % b << '\n';
```

两个操作数都是整数时，7 / 2 的结果是 3，不是 3.5。希望得到小数时，让至少一个操作数是浮点数：

```cpp
double result = 7.0 / 2;
```

### 5.2 比较和逻辑运算

比较运算得到 bool：

```cpp
int score = 85;
bool passed = score >= 60;
bool excellent = score >= 90;
bool normal = score >= 0 && score <= 100;
```

常见运算符包括 ==、!=、>、<、>=、<=、&&、|| 和 !。注意：= 是赋值，== 才是比较。

## 6. 条件判断

```cpp
#include <iostream>

int main() {
    int score = 0;
    std::cout << "请输入成绩：";
    std::cin >> score;

    if (score < 0 || score > 100) {
        std::cout << "成绩范围应为 0 到 100。\n";
    } else if (score >= 90) {
        std::cout << "优秀\n";
    } else if (score >= 60) {
        std::cout << "及格\n";
    } else {
        std::cout << "还需要继续练习\n";
    }
}
```

先判断无效输入，再判断正常区间，是比较清楚的顺序。

## 7. 循环

知道重复次数时使用 for：

```cpp
for (int number = 1; number <= 5; ++number) {
    std::cout << number << '\n';
}
```

根据条件重复时使用 while：

```cpp
int number = 1;
while (number <= 5) {
    std::cout << number << '\n';
    ++number;
}
```

要特别注意循环变量必须发生变化，否则可能形成死循环。

## 8. 综合示例：学习进度统计

下面的程序读取学习天数和每天的学习小时数，统计总时长、平均时长，并给出判断：

```cpp
#include <iostream>

int main() {
    int days = 0;
    std::cout << "学习了多少天？ ";
    std::cin >> days;

    if (days <= 0) {
        std::cout << "学习天数必须大于 0。\n";
        return 0;
    }

    double totalHours = 0.0;
    for (int day = 1; day <= days; ++day) {
        double hours = 0.0;
        std::cout << "第 " << day << " 天学习了多少小时？ ";
        std::cin >> hours;

        if (hours < 0) {
            std::cout << "学习时长不能为负数。\n";
            return 0;
        }
        totalHours += hours;
    }

    const double averageHours = totalHours / days;
    std::cout << "总学习时长：" << totalHours << " 小时\n";
    std::cout << "平均每天：" << averageHours << " 小时\n";

    if (averageHours >= 2.0) {
        std::cout << "节奏不错，继续保持。\n";
    } else {
        std::cout << "先保持连续学习，再逐步增加时长。\n";
    }
}
```

这个例子把变量、输入输出、if、for、double 和 const 放在了一起。

## 9. 第一天常见错误

### 忘记分号

```cpp
int score = 90  // 错误：语句末尾缺少分号
```

### 把赋值写成比较

```cpp
if (score = 60) {
    // 这是赋值，不是在判断是否等于 60
}
```

应该写成 if (score == 60)。

### 整数除法

需要保留小数时可以写：

```cpp
double average = static_cast<double>(total) / count;
```

### 运行旧程序

手动编译时如果没有重新执行编译命令，运行的可能仍是上一次生成的可执行文件。看到输出与代码不一致时，先重新编译，再运行。

## 10. 练习题

1. 自我介绍：输入姓名和年龄，输出一句完整的自我介绍。
2. 温度转换：输入摄氏温度，转换成华氏温度，注意整数除法。
3. 奇偶和统计：输入 n，统计 1 到 n 中奇数、偶数的数量和总和。
4. 学习时长报告：输入一周 7 天的学习小时数，输出总时长、平均时长和最长学习时长。

完成练习时，先写出输入、变量、循环、特殊判断和输出，再写代码。

## 11. Day 1 完成检查

- [ ] 能解释 cpp、编译器和可执行文件之间的关系。
- [ ] 能独立写出包含 main、cout 和 return 0 的程序。
- [ ] 能在自己的系统上编译并运行 main.cpp。
- [ ] 能使用 cin 读取整数和小数。
- [ ] 能区分 = 和 ==。
- [ ] 能使用 if/else 表达分支。
- [ ] 能使用 for 或 while 完成重复计算。
- [ ] 能解释整数除法为什么可能丢失小数。
- [ ] 至少完成上面的两道练习。

## Day 1 总结

今天的重点不是记住很多语法，而是建立一个完整的程序模型：数据先进入变量，程序根据条件选择路径，再通过循环重复处理，最后把结果输出。下一步学习函数和作用域，把越来越长的 main 拆成可理解、可复用的逻辑。
