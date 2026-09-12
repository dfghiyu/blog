---
title: Java 学习 Day 1：从运行环境到方法
description: 认识 JDK、JRE、JVM，掌握 Java 基础语法、条件判断、字符串比较和方法，为后续学习 Spring Boot 打好基础。
date: 2026-09-12
category: 学习
tag:
  - Java
  - Spring Boot
  - 学习笔记
author: 韩子阳
---

# Java 学习 Day 1：从运行环境到方法

今天不急着学习 Spring Boot 框架，而是先补齐阅读 Spring Boot 代码所需要的 Java 基础。目标不是一天学完 Java，而是能够看懂一个简单的 Java 类，知道程序从哪里开始运行，并能自己写出包含变量、判断和方法的小程序。

## 今天要掌握什么

本篇包括以下内容：

- JDK、JRE 和 JVM 的关系
- `main` 方法和 Java 程序的入口
- 变量与常见数据类型
- `String` 字符串
- 算术、比较和逻辑运算符
- `if/else` 条件判断
- 方法的定义、参数和返回值
- 使用 `equals` 比较字符串
- 一个综合示例
- 理论练习与 Day 1 总结

## 1. JDK、JRE 和 JVM

Java 源代码通常保存在 `.java` 文件中。运行 Java 程序时，可以先把源代码编译成字节码，再交给 JVM 执行：

`\`\`text
Java 源代码（.java）
        ↓ javac 编译
Java 字节码（.class）
        ↓ JVM 执行
程序运行结果
`\`\`

### JVM：Java 虚拟机

JVM（Java Virtual Machine）是真正执行 Java 字节码的虚拟机。不同操作系统可以有不同的 JVM 实现，只要它们都能理解同一份字节码，Java 程序就可以在 Windows、macOS 和 Linux 上运行。

这也是 Java “一次编写，到处运行”这句话的基础之一。不过，程序是否完全不需要调整，还会受到文件路径、操作系统命令和第三方依赖等因素影响。

### JRE：Java 运行环境

JRE（Java Runtime Environment）提供运行 Java 程序所需要的环境，核心包括 JVM 和 Java 类库。只运行已经编译好的 Java 程序时，理论上 JRE 就够了。

### JDK：Java 开发工具包

JDK（Java Development Kit）是开发 Java 程序所需要的工具包，包含：

`\`\`text
JDK
├── JVM
├── Java 类库
├── javac（Java 编译器）
└── java（Java 启动器）
`\`\`

学习 Java 和 Spring Boot 时安装 JDK 即可。可以选择项目要求的 Java 版本，例如 Java 17 或 Java 21。检查本机 JDK 版本：

`\`\`bash
java -version
javac -version
`\`\`

## 2. `main` 方法：程序从哪里开始

一个最简单的 Java 程序如下：

`\`\`java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
`\`\`

保存为 `Hello.java` 后，可以在该文件所在目录运行：

`\`\`bash
javac Hello.java
java Hello
`\`\`

输出：

`\`\`text
Hello Java
`\`\`

初学阶段可以先把下面这段代码整体理解为 Java 程序的入口：

`\`\`java
public static void main(String[] args)
`\`\`

后面再逐步拆开理解：

- `public`：方法可以被外部访问。
- `static`：调用这个方法不需要先创建对象。
- `void`：方法不返回结果。
- `main`：约定俗成的入口方法名。
- `String[] args`：接收从命令行传入的字符串参数。

输出内容使用：

`\`\`java
System.out.println("第一行");
System.out.println("第二行");
`\`\`

`println` 会在输出后换行。Java 中大多数语句以分号 `;` 结束，代码块使用大括号 `{}` 表示范围。

## 3. 变量与常见数据类型

变量就是一个有名字的存储位置。声明变量的基本形式是：

`\`\`java
数据类型 变量名 = 初始值;
`\`\`

例如：

`\`\`java
int age = 20;
double height = 175.5;
boolean student = true;
String name = "韩子阳";
`\`\`

### 常见基本数据类型

Day 1 先掌握下面几种：

| 类型 | 用途 | 示例 |
| --- | --- | --- |
| `int` | 普通整数 | `int age = 20;` |
| `long` | 更大的整数 | `long count = 1400000000L;` |
| `double` | 小数 | `double price = 19.9;` |
| `boolean` | 真或假 | `boolean enabled = true;` |
| `char` | 单个字符 | `char level = 'A';` |
| `String` | 字符串文本 | `String city = "杭州";` |

`long` 类型的数字通常在末尾加 `L`，字符使用单引号，字符串使用双引号：

`\`\`java
long population = 1400000000L;
char firstLetter = 'J';
String language = "Java";
`\`\`

变量的值可以重新赋值，但类型必须匹配：

`\`\`java
int score = 80;
score = 95;
`\`\`

下面的写法会报错，因为字符串不能直接赋值给 `int`：

`\`\`java
// int score = "95";
`\`\`

## 4. `String` 字符串

`String` 用来表示一段文本：

`\`\`java
String username = "hanziyang";
String message = "正在学习 Java";
`\`\`

字符串可以使用 `+` 拼接：

`\`\`java
String name = "韩子阳";
int day = 1;

System.out.println(name + "正在学习 Java Day " + day);
`\`\`

输出：

`\`\`text
韩子阳正在学习 Java Day 1
`\`\`

常用的字符串方法包括：

`\`\`java
String text = "Spring Boot";

System.out.println(text.length());         // 字符串长度
System.out.println(text.toUpperCase());    // 转为大写
System.out.println(text.contains("Boot")); // 是否包含内容
`\`\`

需要注意：字符串是对象，不能用 `==` 判断两个字符串的文本内容是否相同。字符串内容比较应该使用 `equals`。

## 5. 运算符

### 算术运算符

`\`\`java
int a = 10;
int b = 3;

System.out.println(a + b); // 13
System.out.println(a - b); // 7
System.out.println(a * b); // 30
System.out.println(a / b); // 3
System.out.println(a % b); // 1
`\`\`

两个 `int` 相除时结果仍然是整数，所以 `10 / 3` 的结果是 `3`。如果希望保留小数，需要使用 `double`：

`\`\`java
double result = 10.0 / 3;
System.out.println(result);
`\`\`

### 比较运算符

比较运算符的结果是 `boolean`：

`\`\`java
int age = 20;

System.out.println(age > 18);  // true
System.out.println(age == 20); // true
System.out.println(age != 18); // true
System.out.println(age <= 16); // false
`\`\`

常见比较运算符：

`\`\`text
>   大于
<   小于
>=  大于等于
<=  小于等于
==  等于
!=  不等于
`\`\`

### 逻辑运算符

逻辑运算符可以组合多个条件：

`\`\`java
int age = 22;
boolean hasId = true;

boolean canEnter = age >= 18 && hasId;
boolean needsHelp = age < 18 || !hasId;
`\`\`

`\`\`text
&&  并且，两个条件都为 true 时结果才为 true
||  或者，至少一个条件为 true 时结果为 true
!   取反，把 true 变成 false
`\`\`

## 6. `if/else` 条件判断

程序可以根据条件执行不同代码：

`\`\`java
int score = 85;

if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("需要继续练习");
}
`\`\`

如果有多个区间，可以使用 `else if`：

`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("合格");
} else {
    System.out.println("继续努力");
}
`\`\`

判断条件必须得到 `true` 或 `false`。例如，不能直接把整数写进 `if`：

`\`\`java
// if (score) { }
`\`\`

这和一些允许把数字当作布尔值的语言不同，Java 的条件判断更加明确。

## 7. 方法：把一段逻辑单独命名

方法可以理解为一段有名字的、可以重复调用的代码。基本形式是：

`\`\`java
访问修饰符 返回类型 方法名(参数列表) {
    方法体
    return 返回值;
}
`\`\`

例如，定义一个加法方法：

`\`\`java
public static int add(int a, int b) {
    return a + b;
}
`\`\`

调用方法：

`\`\`java
int result = add(2, 3);
System.out.println(result); // 5
`\`\`

这里可以这样理解：

- `public`：方法的访问范围。
- `static`：可以直接通过类调用，暂时和 `main` 一起使用即可。
- `int`：返回值类型。
- `add`：方法名。
- `int a, int b`：方法参数。
- `return`：把结果返回给调用者。

如果方法不返回结果，返回类型使用 `void`：

`\`\`java
public static void printWelcome(String name) {
    System.out.println("欢迎你，" + name);
}
`\`\`

调用：

`\`\`java
printWelcome("韩子阳");
`\`\`

方法的价值在于拆分逻辑。例如，主程序只负责组织流程，具体判断交给单独的方法完成，代码会更容易阅读和测试。

## 8. 字符串比较：使用 `equals`

下面的代码看起来像是在比较两个相同的字符串：

`\`\`java
String first = new String("Java");
String second = new String("Java");

System.out.println(first == second);       // false
System.out.println(first.equals(second));  // true
`\`\`

`==` 对对象通常比较的是是否为同一个对象，`equals` 才是比较对象的内容。判断字符串内容时，应该写成：

`\`\`java
if (username.equals("admin")) {
    System.out.println("管理员");
}
`\`\`

如果字符串变量可能是 `null`，更稳妥的写法是把确定不为 `null` 的字符串放在前面：

`\`\`java
if ("admin".equals(username)) {
    System.out.println("管理员");
}
`\`\`

这样即使 `username` 是 `null`，也不会因为调用它的 `equals` 方法而抛出空指针异常。

## 9. 综合示例：判断学习阶段

下面的程序把变量、字符串、运算符、`if/else` 和方法放在一起，判断一个人的 Java 学习阶段：

`\`\`java
public class LearningProgress {
    public static void main(String[] args) {
        String name = "韩子阳";
        String target = "Spring Boot";
        int studyDays = 1;
        int completedExercises = 3;

        String message = buildMessage(name, target, studyDays, completedExercises);
        System.out.println(message);
    }

    public static String buildMessage(
            String name,
            String target,
            int studyDays,
            int completedExercises
    ) {
        if (studyDays >= 7 && completedExercises >= 10) {
            return name + "已经完成基础阶段，可以开始接触 " + target + "。";
        } else if (studyDays >= 1 && completedExercises >= 1) {
            return name + "已经开始学习 Java，还需要继续积累基础。";
        } else {
            return name + "还没有开始今天的学习。";
        }
    }
}
`\`\`

这个示例的执行过程可以拆成：

1. `main` 方法创建学习者、学习目标和学习进度变量。
2. 调用 `buildMessage` 方法，把这些数据传进去。
3. 方法使用 `&&` 组合条件，并通过 `if/else` 选择一条消息。
4. `return` 把消息返回给 `main` 方法。
5. `System.out.println` 输出最终结果。

把逻辑放到方法里之后，如果以后要修改判断规则，只需要调整 `buildMessage`，主程序不需要跟着变。

## 10. 理论练习

先尝试自己回答，再查看参考答案。重点是说清楚“为什么”，而不只是记住结果。

### 练习一：JDK、JRE、JVM

1. `javac` 的作用是什么？
2. JVM 负责什么？
3. 开发 Java 程序时为什么通常安装 JDK？

参考答案：

1. `javac` 把 `.java` 源代码编译成 `.class` 字节码。
2. JVM 负责加载并执行 Java 字节码。
3. JDK 包含编译器和其他开发工具，同时包含运行 Java 所需要的环境。

### 练习二：变量和运算符

下面程序的输出是什么？

`\`\`java
int a = 7;
int b = 2;

System.out.println(a / b);
System.out.println(a % b);
System.out.println(a > b && b > 0);
`\`\`

参考答案：

`\`\`text
3
1
true
`\`\`

因为 `a` 和 `b` 都是 `int`，整数相除会舍弃小数部分。

### 练习三：字符串比较

下面两个判断有什么区别？

`\`\`java
username == "admin"
"admin".equals(username)
`\`\`

参考答案：

`==` 主要比较两个对象是否是同一个对象；`equals` 比较字符串内容。判断字符串内容时，应使用 `equals`，并可以把字面量放在前面避免 `username` 为 `null` 时出错。

### 练习四：自己写一个方法

编写一个 `isAdult` 方法：接收一个 `int age`，如果年龄大于等于 18 返回 `true`，否则返回 `false`。

参考实现：

`\`\`java
public static boolean isAdult(int age) {
    return age >= 18;
}
`\`\`

## Day 1 总结

今天先建立了 Java 程序的基本地图：

`\`\`text
JDK 提供开发工具
JVM 执行字节码
main 是程序入口
变量保存数据
运算符产生计算结果或布尔条件
if/else 根据条件选择分支
方法封装可以重复使用的逻辑
equals 比较字符串内容
`\`\`

今天不需要死记所有关键字。只要能够自己解释一段简单代码，并能修改变量、条件和方法，就已经达到了 Day 1 的目标。

## 这些内容和 Spring Boot 有什么关系

Spring Boot 项目本质上仍然是 Java 程序。之后看到的 Controller、Service、实体类和配置类，都会建立在今天这些基础之上：

- 类和方法：Spring Boot 的业务逻辑最终都写在类的方法中。
- 变量和类型：请求参数、数据库字段和返回结果都需要明确类型。
- `String` 和 `equals`：用户名、状态、权限等文本判断非常常见。
- `if/else`：登录校验、参数校验和业务分支都会用到条件判断。
- `main` 方法：Spring Boot 应用也需要从启动入口开始运行。
- JDK 和 JVM：运行 Maven、启动 Spring Boot 和部署应用都离不开 Java 运行环境。

后续学习 Spring Boot 时，不会重新讲完一遍 Java，而是会在真实项目中反复使用这些知识。因此今天的重点是打好能够继续前进的基础，下一步可以继续学习类、对象、构造方法、封装和集合。
