---
title: Python 学习 Day 1：从运行环境到基础语法
description: 从 Python 解释器、变量和基本类型开始，学习输入输出、条件判断、循环、常见容器和函数。
date: 2026-09-12
category: 学习
tag:
  - Python
  - Python基础
  - 学习笔记
author: 韩子阳
---

# Python 学习 Day 1：从运行环境到基础语法

第一天不急着安装大量库，也不急着学习 Django。先把一个 Python 文件运行起来，理解变量、类型、输入输出、条件、循环、容器和函数，后面的标准库和 Web 框架才有落脚点。

今天的目标是：能够独立写出一个接收输入、做出判断、循环处理数据并输出结果的小程序。

## 1. 运行第一个 Python 程序

### 1.1 交互式解释器

在 Windows 中打开 PowerShell，在 macOS 中打开 Terminal。先输入：

~~~bash
python --version
~~~

macOS 如果默认命令是 python3，就使用：

~~~bash
python3 --version
~~~

输入 python 或 python3 后，可以直接在交互环境中试代码：

~~~python
>>> 2 + 3
5
>>> print("Hello, Python")
Hello, Python
~~~

交互式解释器适合快速验证一个表达式。真正写程序时，应该把代码保存为 .py 文件。

### 1.2 脚本文件

新建 hello.py：

~~~python
name = "韩子阳"
print(f"你好，{name}")
~~~

在文件所在目录运行：

~~~bash
python hello.py
~~~

macOS 使用 python3 hello.py 也可以。Python 会从上到下执行脚本，缩进决定代码块的范围。

## 2. 注释、缩进和变量

注释是写给人看的说明，以 # 开始：

~~~python
# 这是单行注释
message = "先让程序运行起来"
~~~

Python 不使用大括号表示代码块，而是使用缩进：

~~~python
score = 85

if score >= 60:
    print("通过")
~~~

冒号后面开始一个代码块，下一行通常缩进四个空格。不要在同一个文件里混用 Tab 和空格。

变量是给数据起的名字：

~~~python
name = "Python"
study_days = 1
is_started = True
~~~

Python 是动态类型语言，同一个变量名之后可以绑定不同类型的值：

~~~python
value = 10
value = "十"
~~~

这很灵活，但也意味着我们要给变量起清楚的名字，并在需要时主动检查或转换类型。

## 3. 常见基本类型

| 类型 | 示例 | 用途 |
| --- | --- | --- |
| int | study_days = 1 | 整数 |
| float | progress = 0.5 | 小数 |
| bool | is_finished = False | 真或假 |
| str | name = "Python" | 文本 |
| None | result = None | 表示暂时没有值 |

可以用 type 查看类型：

~~~python
age = 20
height = 175.5
nickname = "BugAwake"
enabled = True

print(type(age))
print(type(height))
print(type(nickname))
print(type(enabled))
~~~

None 不是字符串，也不是数字。它通常表示结果还没有产生：

~~~python
answer = None
~~~

## 4. 输出、输入和类型转换

print 用来输出内容：

~~~python
name = "Python"
day = 1
print(name, "学习 Day", day)
print(f"{name} 学习 Day {day}")
~~~

input 会读取用户输入，但返回值永远是字符串：

~~~python
name = input("请输入你的名字：")
print(f"你好，{name}")
~~~

如果要把输入当整数计算，需要显式转换：

~~~python
days = int(input("今天学习了几天？"))
print(days + 1)
~~~

小数使用 float：

~~~python
progress = float(input("请输入完成比例："))
print(progress)
~~~

直接对字符串和整数做加法会产生类型错误：

~~~python
# age = input("年龄：")
# print(age + 1)  # input 返回 str，不能直接和 int 相加
~~~

## 5. 运算符

### 5.1 算术运算

~~~python
a = 10
b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
~~~

### 5.2 比较和逻辑运算

比较表达式的结果是 True 或 False：

~~~python
score = 85
print(score >= 60)
print(score == 100)
print(score != 0)
~~~

逻辑运算可以组合条件：

~~~python
age = 20
has_time = True

can_study = age >= 18 and has_time
needs_break = age < 18 or not has_time
print(can_study)
print(needs_break)
~~~

字符串可以使用 in 判断是否包含某段文本：

~~~python
title = "Python 学习路线"
print("Python" in title)
~~~

### 5.3 == 和 is 不一样

== 用来比较两个值是否相等，is 用来判断两个变量是否指向同一个对象。日常比较字符串、数字等值时使用 ==：

~~~python
first = "Python"
second = "Python"

print(first == second)
~~~

判断一个结果是否为 None 时，使用 is None：

~~~python
result = None
if result is None:
    print("暂时没有结果")
~~~

## 6. 条件判断

最基本的条件结构是 if/else：

~~~python
score = 76

if score >= 60:
    print("通过")
else:
    print("继续练习")
~~~

多个范围使用 elif：

~~~python
score = 86

if score >= 90:
    level = "优秀"
elif score >= 60:
    level = "通过"
else:
    level = "需要复习"

print(level)
~~~

条件成立时执行缩进块中的代码。缩进错位会导致 IndentationError，这是 Python 初学时很常见但也很容易修复的错误。

## 7. 循环

### 7.1 for 和 range

for 适合遍历一组数据。range(1, 4) 产生 1、2、3，不包含右边界 4：

~~~python
for day in range(1, 4):
    print(f"完成第 {day} 天学习")
~~~

### 7.2 while

while 在条件成立时重复执行：

~~~python
remaining = 3

while remaining > 0:
    print(f"还剩 {remaining} 个练习")
    remaining -= 1
~~~

如果忘记修改条件相关的变量，while 可能永远不会结束。因此写 while 时要明确：循环何时开始、每次如何变化、何时停止。

### 7.3 break 和 continue

break 立即结束当前循环，continue 跳过本轮剩余代码：

~~~python
for number in range(1, 6):
    if number == 3:
        continue
    if number == 5:
        break
    print(number)
~~~

## 8. 字符串初识

字符串可以使用单引号或双引号：

~~~python
language = "Python"
message = '正在学习基础语法'
~~~

常用操作包括长度、去除两端空白、大小写转换和拆分：

~~~python
text = "  Python Web  "

print(len(text))
print(text.strip())
print(text.lower())
print(text.split())
~~~

使用 f-string 把变量放进文本：

~~~python
name = "韩子阳"
topic = "Python"
print(f"{name} 正在学习 {topic}")
~~~

## 9. 列表、元组、字典和集合

今天先建立四种容器的直觉：

| 容器 | 特点 | 示例 |
| --- | --- | --- |
| list | 有顺序、可以修改 | days = [1, 2, 3] |
| tuple | 有顺序、通常不修改 | point = (10, 20) |
| dict | 键值映射 | user = {"name": "韩子阳"} |
| set | 不重复的元素集合 | tags = {"Python", "Web"} |

列表适合保存一组按顺序排列的数据：

~~~python
topics = ["语法", "循环", "函数"]
topics.append("容器")
print(topics[0])
print(len(topics))
~~~

字典通过键读取值：

~~~python
student = {
    "name": "韩子阳",
    "day": 1,
    "finished": True,
}

print(student["name"])
print(student.get("score"))
~~~

集合会自动去重：

~~~python
languages = {"Python", "Java", "Python"}
print(languages)
~~~

先学会使用这些容器，再深入切片、推导式、迭代器和生成器。

## 10. 函数初识

函数是给一段逻辑起名字，让它可以被重复调用：

~~~python
def greet(name):
    return f"你好，{name}"


message = greet("Python")
print(message)
~~~

参数是函数接收的输入，return 是函数交回的结果。如果函数没有显式 return，默认返回 None：

~~~python
def add(left, right):
    return left + right


print(add(2, 3))
~~~

函数内部创建的变量通常是局部变量，只在函数内部有效：

~~~python
def calculate_total(price, count):
    total = price * count
    return total


print(calculate_total(10, 3))
~~~

把长程序拆成多个小函数后，每个函数更容易理解、测试和修改。

## 11. 综合练习：学习进度记录器

下面的程序把今天的知识连接起来：读取名字和学习天数，判断进度，遍历已学习内容，并输出一份小报告。

保存为 learning_progress.py：

~~~python
name = input("请输入你的名字：").strip()
days_text = input("已经学习了几天？").strip()

if not days_text.isdigit():
    print("学习天数必须是非负整数")
else:
    days = int(days_text)
    topics = ["解释器", "变量", "条件判断", "循环", "容器", "函数"]

    if days == 0:
        status = "准备开始"
    elif days < 3:
        status = "正在建立基础"
    else:
        status = "已经形成习惯"

    print(f"{name or '同学'}，当前状态：{status}")
    print(f"已学习 {days} 天，今天可以复习：")

    for index, topic in enumerate(topics, start=1):
        print(f"{index}. {topic}")
~~~

这个例子里：

- input 接收文本，strip 去掉两端空白；
- isdigit 先判断输入是否像一个非负整数；
- int 把字符串转换成整数；
- 列表保存要复习的主题；
- if/elif/else 生成学习状态；
- for 和 enumerate 输出带序号的主题；
- f-string 把变量填进最终报告。

### 11.1 Day 1 练习

在上面的程序基础上完成：

1. 增加一个“今天学习了多少分钟”的输入，并输出学习强度；
2. 把 topics 改成字典，给每个主题增加完成状态；
3. 写一个 describe_progress(days) 函数，让状态判断独立出来；
4. 当输入为空时，给名字设置一个默认值；
5. 尝试让程序循环运行，直到用户输入 q 退出。

## 12. 今天容易犯的错误

- 把 input 的返回值直接和数字相加，忘记类型转换；
- if、for 或函数定义后忘记冒号；
- 代码块缩进不一致；
- 把 = 赋值和 == 比较混在一起；
- 用 is 比较普通字符串或数字；
- range(1, 4) 误以为会包含 4；
- while 中没有让循环条件发生变化；
- 在错误的 Python 解释器或全局环境中安装依赖。

## Day 1 总结

今天先建立一条完整路径：

~~~text
解释器 → 脚本 → 变量 → 类型 → 输入输出 → 条件 → 循环 → 容器 → 函数
~~~

下一步可以继续学习列表和字典的更多操作、切片、推导式、模块导入和标准库。等这些基础变得熟练后，再进入文件、异常、包管理和 Django。

延伸阅读：[Python 官方教程](https://docs.python.org/3/tutorial/)、[Python 解释器介绍](https://docs.python.org/3/tutorial/interpreter.html)、[控制流工具](https://docs.python.org/3/tutorial/controlflow.html)。
