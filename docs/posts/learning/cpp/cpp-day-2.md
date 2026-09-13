---
title: C++ 学习 Day 2：函数、参数、返回值与作用域
description: 从重复代码中提取函数，掌握函数声明、参数、返回值、值传递、引用、const 和作用域，完成学习进度报告的函数化重构。
date: 2026-09-13
category: 学习
tag:
  - C++
  - 学习笔记
  - 函数
  - 作用域
  - 编程基础
author: 韩子阳
---

# C++ 学习 Day 2：函数、参数、返回值与作用域

Day 1 我们已经能够用变量、输入输出、条件判断和循环写出一个小程序。今天继续往前走：把一段越来越长的 main 函数拆成多个职责清楚的函数。

函数是 C++ 程序组织逻辑的基本单位。学会函数之后，代码不再只能从上到下一次性执行，而是可以把“读取数据”“计算结果”“打印报告”等动作分别封装起来，之后重复调用。

今天的目标：

- 能声明、定义和调用函数；
- 能理解参数和返回值；
- 能区分值传递、引用传递和 const 引用；
- 能判断局部变量、块作用域和全局变量的可见范围；
- 能使用函数重载解决相近但不同的调用场景；
- 能把函数声明放进头文件，把实现放进源文件。

如果还没有完成第一天，可以先阅读 [C++ 学习 Day 1](/posts/learning/cpp/cpp-day-1.html)。如果编译器还没有配置好，可以阅读 [VS Code 配置 C++ 开发环境](/posts/learning/cpp/cpp-environment-setup.html)。

## 1. 为什么需要函数

先看一段没有拆分的代码：

~~~cpp
#include <iostream>

int main() {
    int first = 10;
    int second = 20;
    int sum = first + second;
    std::cout << "sum = " << sum << '\n';

    int left = 8;
    int right = 3;
    int difference = left - right;
    std::cout << "difference = " << difference << '\n';
}
~~~

这段代码很短，但当 main 函数继续增加输入、校验、计算和输出时，阅读成本会快速上升。函数可以把一个大问题拆成多个小问题：

~~~text
main
 ├── 读取数据
 ├── 计算总和
 ├── 计算平均值
 └── 打印结果
~~~

每个函数最好只承担一个清楚的职责。这样修改某一部分时，不需要在整个 main 函数里寻找相关代码。

## 2. 函数的三个动作：声明、定义和调用

### 2.1 定义一个函数

下面的函数接收两个整数，返回它们的和：

~~~cpp
int add(int left, int right) {
    return left + right;
}
~~~

这里有几个部分：

- int：返回值类型；
- add：函数名；
- left 和 right：参数；
- return left + right：把结果返回给调用者。

### 2.2 调用函数

~~~cpp
#include <iostream>

int add(int left, int right) {
    return left + right;
}

int main() {
    const int result = add(3, 5);
    std::cout << result << '\n';
    return 0;
}
~~~

程序执行到 add(3, 5) 时，会把 3 传给 left，把 5 传给 right，然后把 8 返回给 result。

### 2.3 函数声明

如果函数定义写在 main 后面，调用前需要先告诉编译器函数的名字、参数类型和返回值类型：

~~~cpp
#include <iostream>

int add(int left, int right);

int main() {
    std::cout << add(3, 5) << '\n';
    return 0;
}

int add(int left, int right) {
    return left + right;
}
~~~

这一行就是函数声明：

~~~cpp
int add(int left, int right);
~~~

声明末尾有分号，定义的函数体后面没有分号。初学阶段可以把声明理解成“先登记接口”，把定义理解成“提供具体实现”。

## 3. 返回值和 void

### 3.1 有返回值的函数

有返回值的函数必须在合适的路径上返回对应类型的结果：

~~~cpp
double average(double total, int count) {
    if (count <= 0) {
        return 0.0;
    }
    return total / count;
}
~~~

这里使用 double，是因为平均值可能包含小数。把 total 和 count 都声明为整数，会产生整数除法问题。

### 3.2 没有返回值的函数

只负责执行动作、不需要把结果交回去时，可以使用 void：

~~~cpp
#include <iostream>

void print_line() {
    std::cout << "----------------\n";
}

int main() {
    print_line();
    std::cout << "C++ Day 2\n";
    print_line();
}
~~~

void 函数可以不写 return。若需要提前结束，也可以写不带表达式的 return：

~~~cpp
void print_score(int score) {
    if (score < 0) {
        return;
    }
    std::cout << score << '\n';
}
~~~

### 3.3 不要返回局部变量的地址或引用

局部变量在函数结束时就会失效。下面的写法是错误的：

~~~cpp
int& wrong() {
    int value = 42;
    return value;
}
~~~

函数返回后，value 已经不再存在，返回的引用会指向无效对象。今天先记住一个原则：函数可以安全返回数值和对象，但不要返回局部变量的地址或引用。

## 4. 参数：函数如何接收数据

### 4.1 值传递

默认参数是值传递。函数会得到一份参数的副本：

~~~cpp
#include <iostream>

void increase(int value) {
    ++value;
    std::cout << "函数内部：" << value << '\n';
}

int main() {
    int number = 10;
    increase(number);
    std::cout << "函数外部：" << number << '\n';
}
~~~

输出中，函数内部是 11，函数外部仍然是 10。因为 increase 修改的是 value 的副本。

对于 int、double 等小类型，值传递通常简单、直观，也不会意外修改调用者的数据。

### 4.2 引用传递

如果希望函数直接修改调用者的变量，可以使用引用参数：

~~~cpp
#include <iostream>

void increase(int& value) {
    ++value;
}

int main() {
    int number = 10;
    increase(number);
    std::cout << number << '\n';
}
~~~

这里的 value 是 number 的另一个名字，不是新的整数副本。因此函数内部的修改会反映到函数外部。

引用参数适合表达“函数确实需要修改这个对象”。如果函数不应该修改数据，不要为了省略复制就随意使用非常量引用。

### 4.3 const 引用

只读且不想复制较大对象时，可以使用 const 引用：

~~~cpp
#include <iostream>
#include <string>

void print_name(const std::string& name) {
    std::cout << "姓名：" << name << '\n';
}

int main() {
    const std::string name = "BugAwake";
    print_name(name);
}
~~~

const 的含义是：函数不能通过 name 修改原来的字符串。引用的含义是：不额外复制整个字符串。

初学阶段可以先用下面的选择规则：

| 需求 | 参数形式 |
| --- | --- |
| 函数只需要一个小数值副本 | int value、double value |
| 函数需要修改调用者的变量 | int& value |
| 函数只读一个可能较大的对象 | `const std::string& name` |
| 函数只读一个小对象 | 直接值传递通常已经足够 |

## 5. 作用域：变量在哪里有效

作用域决定一个名字在哪些代码区域可以使用。

### 5.1 局部作用域

在函数内部定义的变量，只能在这个函数内部使用：

~~~cpp
void calculate() {
    int total = 100;
    // 这里可以使用 total
}

// 这里不能使用 total
~~~

main 函数里的变量也不能直接被另一个函数使用。函数之间应该通过参数和返回值传递数据，而不是依赖“神奇的共享变量”。

### 5.2 块作用域

一对花括号会形成一个新的块作用域：

~~~cpp
#include <iostream>

int main() {
    int score = 80;

    if (score >= 60) {
        int messageCode = 1;
        std::cout << messageCode << '\n';
    }

    // messageCode 在这里已经不可用
}
~~~

messageCode 只在 if 的花括号内部有效。for 和 while 的循环体也会形成自己的块作用域。

### 5.3 变量遮蔽

内部作用域可以声明和外部同名的变量，但这会降低可读性：

~~~cpp
#include <iostream>

int main() {
    int value = 10;

    {
        int value = 20;
        std::cout << value << '\n';
    }

    std::cout << value << '\n';
}
~~~

两个输出分别是 20 和 10。虽然语法允许变量遮蔽，但初学阶段最好避免给不同作用域的变量使用相同名字。

### 5.4 全局变量为什么要谨慎

函数外定义的变量具有全局作用域：

~~~cpp
int total = 0;
~~~

任何函数都可能修改它。小程序里看起来方便，程序变大后却很难判断“是谁改了 total”。除非确实需要共享且生命周期很长的状态，否则优先使用局部变量、参数和返回值。

## 6. 函数重载

函数重载允许多个函数使用同一个名字，只要参数列表不同：

~~~cpp
#include <iostream>
#include <string>

int length(int value) {
    return value >= 0 ? 1 : 2;
}

int length(const std::string& text) {
    return static_cast<int>(text.size());
}

int main() {
    std::cout << length(-12) << '\n';
    std::cout << length("C++") << '\n';
}
~~~

编译器会根据传入参数的类型选择合适的函数。

重载必须依靠参数列表区分，不能只靠返回值区分：

~~~cpp
int read();
double read(); // 错误：参数列表完全相同
~~~

重载适合表达“同一个动作支持不同类型”。如果多个函数做的事情完全不同，不要为了少写一个名字而强行重载。

## 7. 头文件和源文件

当函数越来越多时，可以把声明和实现拆开。

### 7.1 score.hpp：函数声明

~~~cpp
#pragma once

int classify_score(int score);
~~~

#pragma once 可以避免同一个头文件在一次编译中被重复包含。

### 7.2 score.cpp：函数实现

~~~cpp
#include "score.hpp"

int classify_score(int score) {
    if (score < 0 || score > 100) {
        return -1;
    }
    if (score >= 90) {
        return 3;
    }
    if (score >= 60) {
        return 2;
    }
    return 1;
}
~~~

### 7.3 main.cpp：调用函数

~~~cpp
#include <iostream>

#include "score.hpp"

int main() {
    const int score = 85;
    std::cout << classify_score(score) << '\n';
    return 0;
}
~~~

三个文件放在同一个目录时，可以显式把两个源文件交给编译器：

~~~bash
# Windows + MinGW-w64
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp score.cpp -o score_demo.exe

# macOS + Apple Clang
clang++ -std=c++17 -Wall -Wextra -pedantic main.cpp score.cpp -o score_demo
~~~

头文件通常不单独传给编译器编译。编译器会在处理 main.cpp 和 score.cpp 时，根据 include 找到 score.hpp。

## 8. 综合示例：把 Day 1 的学习报告函数化

下面把第一天的学习进度统计拆成四个职责：

- read_days：读取学习天数；
- read_hours：读取某一天的学习时长；
- calculate_average：计算平均时长；
- print_report：打印最终报告。

~~~cpp
#include <iostream>

int read_days() {
    int days = 0;
    std::cout << "学习了多少天？ ";
    std::cin >> days;
    return days;
}

double read_hours(int day) {
    double hours = 0.0;
    std::cout << "第 " << day << " 天学习了多少小时？ ";
    std::cin >> hours;
    return hours;
}

double calculate_average(double total_hours, int days) {
    if (days <= 0) {
        return 0.0;
    }
    return total_hours / days;
}

void print_report(double total_hours, double average_hours) {
    std::cout << "总学习时长：" << total_hours << " 小时\n";
    std::cout << "平均每天：" << average_hours << " 小时\n";

    if (average_hours >= 2.0) {
        std::cout << "节奏不错，继续保持。\n";
    } else {
        std::cout << "先保持连续学习，再逐步增加时长。\n";
    }
}

int main() {
    const int days = read_days();
    if (days <= 0) {
        std::cout << "学习天数必须大于 0。\n";
        return 0;
    }

    double total_hours = 0.0;
    for (int day = 1; day <= days; ++day) {
        const double hours = read_hours(day);
        if (hours < 0) {
            std::cout << "学习时长不能为负数。\n";
            return 0;
        }
        total_hours += hours;
    }

    const double average_hours = calculate_average(total_hours, days);
    print_report(total_hours, average_hours);
}
~~~

这个版本的 main 仍然负责流程控制，但每个具体动作已经有自己的函数。以后想修改平均值计算方式或报告格式时，只需要定位对应函数。

## 9. 常见错误

### 忘记函数声明

如果 main 在前、函数定义在后，调用前必须有声明，否则编译器不知道函数是什么。

### 声明和定义不一致

下面两行的参数类型不同，不能看作同一个函数：

~~~cpp
int add(int left, int right);

double add(int left, int right) {
    return left + right;
}
~~~

声明和定义必须保持返回类型、参数类型和顺序一致。

### 以为值传递会修改原变量

如果函数参数是 int value，函数修改的是副本。需要修改外部变量时，明确写成 int& value，并考虑是否真的需要修改。

### 返回类型不是 void 却没有 return

~~~cpp
int calculate() {
    // 错误：没有返回 int
}
~~~

所有可能的执行路径都应该返回正确类型的结果。

### 滥用全局变量

全局变量会让函数之间产生隐形依赖。优先把数据写成参数，把结果写成返回值。

### 在引用参数中保存局部对象

引用必须指向仍然存在的对象。不要让一个长生命周期对象保存对局部变量的引用，也不要返回局部变量的引用。

## 10. 练习题

1. 编写 is_even 函数：接收一个整数，返回它是否为偶数。
2. 编写 max_of_three 函数：接收三个整数，返回其中的最大值。
3. 编写 calculate_average 函数：接收总分和人数，返回平均值；人数不合法时返回 0。
4. 编写 swap_values 函数：使用引用交换两个整数，并在 main 中验证交换前后结果。
5. 把 Day 1 的“学习时长报告”拆成至少三个函数，要求 main 中不直接完成平均值计算和报告打印。

完成每道题时，先写函数的输入、输出和是否修改参数，再写函数体。

## 11. Day 2 完成检查

- [ ] 能区分函数声明、函数定义和函数调用。
- [ ] 能写出带参数和返回值的函数。
- [ ] 能解释 void 函数的用途。
- [ ] 能说明值传递为什么不会修改原变量。
- [ ] 能使用引用参数修改调用者的变量。
- [ ] 能使用 const 引用表达只读意图。
- [ ] 能判断局部变量、块变量和全局变量的作用域。
- [ ] 能解释变量遮蔽为什么会降低可读性。
- [ ] 知道函数重载不能只依靠返回值区分。
- [ ] 能把函数声明放进头文件，把实现放进源文件。
- [ ] 完成至少三道练习，并用编译器警告检查代码。

## 12. 下一步

下一天会进入数组、字符串、指针和引用的更完整用法。今天对引用的介绍只服务于函数参数；下一步会继续理解地址、连续内存、对象生命周期，以及为什么实际项目中通常优先使用 `std::string`、`std::array` 和 `std::vector`。

可以回到 [C++ 学习路线](/posts/learning/cpp/cpp-learning-roadmap.html) 查看完整阶段，或者继续完成 [C++ 学习 Day 1](/posts/learning/cpp/cpp-day-1.html) 中还没有做完的练习。
