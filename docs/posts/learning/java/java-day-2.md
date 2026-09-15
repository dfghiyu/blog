---
title: Java 学习 Day 2：循环、数组与用户输入
description: 掌握 for、while、break、continue、数组、增强 for 和 Scanner 用户输入，为后续学习集合与 Spring Boot 打好基础。
date: 2026-09-15
category: 学习
tag:
  - Java
  - Spring Boot
  - 学习笔记
author: 韩子阳
---

# Java 学习 Day 2：循环、数组与用户输入

Day 1 学习了变量、数据类型、条件判断和方法。今天继续学习 Java 中非常常用的三类基础能力：循环、数组和用户输入。

很多实际程序都离不开它们：

- 循环：重复执行任务
- 数组：保存一组相同类型的数据
- 用户输入：让程序能够接收外部信息

## 今天要掌握什么

本篇包括以下内容：

- `for` 循环
- `while` 循环
- `break` 和 `continue`
- 数组的创建、访问和遍历
- 增强 `for` 循环
- `Scanner` 接收用户输入
- 一个成绩统计综合示例
- 理论练习与 Day 2 总结

## 1. 为什么需要循环

如果要输出五次文字，可以重复写五行代码：

```java
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
System.out.println("Java");
```

但是，如果要输出一百次、一万次，就不应该手写这么多行。循环可以让一段代码重复执行。

## 2. `for` 循环

### 2.1 基本结构

```java
for (初始化; 循环条件; 更新) {
    // 循环体
}
```

例如，输出 1 到 5：

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}
```

输出：

```text
1
2
3
4
5
```

### 2.2 `for` 循环的执行过程

下面这段代码：

```java
for (int i = 1; i <= 3; i++) {
    System.out.println(i);
}
```

可以拆成：

```text
1. 执行 int i = 1
2. 判断 i <= 3
3. 执行循环体
4. 执行 i++
5. 回到第 2 步
6. 条件不成立时结束循环
```

### 2.3 输出偶数

```java
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        System.out.println(i);
    }
}
```

`%` 是取余运算符。一个数字除以 2 的余数为 0，就说明它是偶数。

也可以直接让循环每次增加 2：

```java
for (int i = 2; i <= 10; i += 2) {
    System.out.println(i);
}
```

## 3. `while` 循环

`while` 的基本结构是：

```java
while (条件) {
    // 条件成立时重复执行
}
```

示例：

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

### 3.1 `for` 和 `while` 怎么选择

| 场景 | 更适合的循环 |
| --- | --- |
| 已经知道循环次数 | `for` |
| 只知道结束条件 | `while` |
| 遍历数组或集合 | `for` 或增强 `for` |
| 等待用户输入正确内容 | `while` |

例如，模拟重复检查密码：

```java
int password = 1234;
int input = 0;

while (input != password) {
    System.out.println("密码不正确，请重新输入");
    input = password;
}

System.out.println("登录成功");
```

这里为了演示循环，把输入值直接改成了正确密码。真正接收用户输入的写法会在后面的 `Scanner` 中学习。

### 3.2 小心死循环

下面的代码会一直输出数字：

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
}
```

因为 `i` 从来没有变化，`i <= 5` 永远成立。应该在循环内部更新变量：

```java
int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}
```

## 4. `break` 和 `continue`

### 4.1 `break`：结束整个循环

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }

    System.out.println(i);
}
```

输出：

```text
1
2
3
4
```

当 `i` 等于 5 时，`break` 直接结束整个循环。

### 4.2 `continue`：跳过本次循环

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }

    System.out.println(i);
}
```

输出：

```text
1
2
4
5
```

`continue` 不会结束整个循环，只会跳过当前这一次，继续执行下一次循环。

## 5. 数组

数组用于保存多个相同类型的数据。

### 5.1 创建数组

直接初始化数组：

```java
int[] scores = {90, 85, 78, 96};
```

也可以先创建指定长度的数组：

```java
int[] scores = new int[4];
```

这种写法会创建一个长度为 4 的整数数组，初始值都是 `0`。

### 5.2 数组下标

数组下标从 `0` 开始：

```java
int[] scores = {90, 85, 78, 96};

System.out.println(scores[0]); // 90
System.out.println(scores[1]); // 85
System.out.println(scores[3]); // 96
```

这个数组长度是 4，因此合法下标是：

```text
0、1、2、3
```

不能访问 `scores[4]`，否则会出现 `ArrayIndexOutOfBoundsException`。

### 5.3 修改数组元素

```java
int[] scores = {90, 85, 78, 96};

scores[2] = 88;

System.out.println(scores[2]); // 88
```

数组长度可以通过 `length` 获取：

```java
System.out.println(scores.length); // 4
```

注意，数组使用的是 `length`，不是 `length()`。后续学习 `String` 时，字符串长度使用的是 `length()` 方法。

## 6. 遍历数组

### 6.1 使用普通 `for` 循环

```java
int[] scores = {90, 85, 78, 96};

for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}
```

这里使用 `i < scores.length`，不能写成 `i <= scores.length`，否则最后一次会访问不存在的下标。

### 6.2 使用增强 `for` 循环

```java
int[] scores = {90, 85, 78, 96};

for (int score : scores) {
    System.out.println(score);
}
```

可以把它理解为：每次从 `scores` 中取出一个元素，放入变量 `score`。

增强 `for` 适合只读取数组元素。如果需要知道下标，或者需要修改指定位置，就使用普通 `for` 循环。

## 7. 使用 `Scanner` 接收用户输入

Java 可以使用 `Scanner` 读取键盘输入：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("请输入你的年龄：");
        int age = scanner.nextInt();

        System.out.println("你的年龄是：" + age);
    }
}
```

常用方法：

| 方法 | 作用 |
| --- | --- |
| `nextInt()` | 读取整数 |
| `nextDouble()` | 读取小数 |
| `next()` | 读取一个不含空格的单词 |
| `nextLine()` | 读取一整行文字 |

读取字符串：

```java
Scanner scanner = new Scanner(System.in);

System.out.print("请输入姓名：");
String name = scanner.next();

System.out.println("你好，" + name);
```

### 7.1 `nextInt()` 和 `nextLine()` 的常见问题

下面的代码可能读不到姓名：

```java
int age = scanner.nextInt();
String name = scanner.nextLine();
```

因为 `nextInt()` 读取数字后，回车符还留在输入缓冲区，`nextLine()` 可能直接读取到这一行剩余的空内容。

可以先额外调用一次 `nextLine()` 消耗回车符：

```java
int age = scanner.nextInt();
scanner.nextLine();
String name = scanner.nextLine();
```

## 8. 综合示例：成绩统计

下面的程序统计一组成绩的总分、平均分、最高分和最低分：

```java
public class Main {
    public static void main(String[] args) {
        int[] scores = {90, 85, 78, 96, 60};

        int sum = 0;
        int max = scores[0];
        int min = scores[0];

        for (int score : scores) {
            sum += score;

            if (score > max) {
                max = score;
            }

            if (score < min) {
                min = score;
            }
        }

        double average = (double) sum / scores.length;

        System.out.println("总分：" + sum);
        System.out.println("平均分：" + average);
        System.out.println("最高分：" + max);
        System.out.println("最低分：" + min);
    }
}
```

输出结果大致是：

```text
总分：409
平均分：81.8
最高分：96
最低分：60
```

这个示例综合使用了：

- 数组
- 增强 `for` 循环
- `if` 条件判断
- 累加变量
- 最大值和最小值比较
- 类型转换

## 9. 今日练习

### 练习 1：输出偶数

使用循环输出 `1` 到 `100` 中的所有偶数。

### 练习 2：计算总和

计算下面表达式的结果：

```text
1 + 2 + 3 + ... + 100
```

### 练习 3：查找最大值

找出数组中的最大值：

```java
int[] numbers = {12, 45, 8, 99, 23};
```

### 练习 4：判断奇偶数

让用户输入一个整数，判断它是奇数还是偶数。

提示：

```java
number % 2 == 0
```

### 练习 5：成绩平均分

让用户输入 5 个成绩，然后计算平均分。

可以先思考：

1. 需要创建多长的数组？
2. 如何使用循环读取 5 次输入？
3. 如何计算总分？
4. 平均分应该使用什么数据类型？

## 10. Day 2 总结

今天重点掌握了：

```text
for       已知循环次数时重复执行
while     根据条件重复执行
break     结束整个循环
continue  跳过本次循环
数组      保存多个相同类型的数据
Scanner   接收用户输入
```

还需要特别记住：

- 数组下标从 `0` 开始
- 数组最后一个下标是 `length - 1`
- 数组使用 `length`，字符串使用 `length()`
- 循环条件必须最终能够结束
- `nextInt()` 后使用 `nextLine()` 时要注意回车符

## 11. 这些知识和 Spring Boot 有什么关系

以后学习 Spring Boot 时，你会经常看到类似的逻辑：

- 循环处理数据库查询结果
- 使用数组或集合保存一批数据
- 判断请求参数是否满足条件
- 统计订单、成绩或用户数据
- 读取配置和处理输入内容

现在先把循环、数组和方法学扎实，后面学习 `List`、`Map`、数据库查询和接口开发时会更容易理解。

Day 2 完成后，建议你亲自运行综合示例，并尝试完成前 3 道练习。
