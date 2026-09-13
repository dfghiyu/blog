---
title: Python 学习 Day 2：数据结构与函数基础
description: 掌握列表、元组、字典、集合、遍历、推导式、函数参数和作用域，完成一个学习成绩统计程序。
date: 2026-09-13
category: 学习
tag:
  - Python
  - Python基础
  - 数据结构
  - 函数
  - 学习笔记
author: 韩子阳
---

# Python 学习 Day 2：数据结构与函数基础

第一天我们学习了变量、基本类型、输入输出、条件判断、循环、容器和函数的基本概念。第二天不急着接触 Django，而是把最常用的数据结构和函数写法练熟。

今天的目标是：能够选择合适的容器保存数据，遍历并处理这些数据，再把重复逻辑拆成参数清楚、返回值明确的小函数。

## 今天要掌握什么

- 列表、元组、字典和集合的区别；
- 索引、切片和常见容器操作；
- 可变对象、不可变对象和浅复制的基本概念；
- 使用 for、enumerate 和 zip 遍历数据；
- 使用列表推导式简化简单的数据处理；
- 函数参数、默认参数、关键字参数和返回值；
- 局部作用域、全局变量和变量遮蔽；
- 完成一个学习成绩统计程序。

## 1. 先复习 Day 1 的核心思路

Day 1 的程序通常可以抽象成：

~~~text
输入数据 → 保存数据 → 判断条件 → 循环处理 → 输出结果
~~~

第二天要做的是把“保存数据”和“循环处理”学得更扎实。例如，多个学习主题适合放进列表，一组主题与分数的对应关系适合放进字典；重复的统计逻辑则应该放进函数。

先准备一组数据：

~~~python
topics = ["变量", "条件判断", "循环"]
scores = {"变量": 90, "条件判断": 85, "循环": 78}
~~~

这两个对象都能保存多个值，但它们表达的关系不同：

- topics 表示一组有顺序的主题；
- scores 表示“主题对应分数”；
- 选择数据结构时，先想清楚数据之间的关系，不要只看写法是否方便。

## 2. 列表：保存有顺序的一组数据

列表使用方括号创建，可以保存任意多个元素：

~~~python
topics = ["变量", "条件判断", "循环"]
numbers = [10, 20, 30]
mixed = ["Python", 3, True]
empty = []
~~~

列表保留元素顺序，并且允许重复值。

### 2.1 索引和切片

Python 的索引从 0 开始：

~~~python
topics = ["变量", "条件判断", "循环", "函数"]

print(topics[0])
print(topics[2])
print(topics[-1])
~~~

可以使用切片取得一个子列表。切片的右边界不包含在结果中：

~~~python
topics = ["变量", "条件判断", "循环", "函数"]

print(topics[1:3])
print(topics[:2])
print(topics[2:])
print(topics[::-1])
~~~

输出结果分别是：

~~~text
["条件判断", "循环"]
["变量", "条件判断"]
["循环", "函数"]
["函数", "循环", "条件判断", "变量"]
~~~

切片不会改变原列表。直接修改某个索引，才会改变列表内容：

~~~python
topics = ["变量", "条件判断", "循环"]
topics[1] = "分支判断"
print(topics)
~~~

### 2.2 常见列表方法

~~~python
topics = ["变量", "循环"]

topics.append("函数")
topics.insert(1, "条件判断")
print(topics)

last_topic = topics.pop()
print(last_topic)
print(topics)
~~~

常见操作可以这样记：

| 操作 | 作用 |
| --- | --- |
| append(value) | 在末尾添加一个元素 |
| insert(index, value) | 在指定位置插入元素 |
| extend(values) | 把另一组元素追加到末尾 |
| remove(value) | 删除第一个匹配的元素 |
| pop() | 删除并返回最后一个元素 |
| len(values) | 获取元素数量 |
| value in values | 判断元素是否存在 |

remove 找不到元素时会抛出 ValueError，pop 对空列表操作时会抛出 IndexError。使用之前要确认数据状态，或者选择更安全的判断方式。

## 3. 元组：不可变的一组数据

元组使用圆括号创建：

~~~python
# position = (杭州, 30)  # 错误：杭州会被当成变量名
rgb = (255, 128, 0)
~~~

上面的示例中杭州没有加引号，会被 Python 当成变量。正确写法是：

~~~python
position = ("杭州", 30)
rgb = (255, 128, 0)
~~~

元组也支持索引和切片：

~~~python
rgb = (255, 128, 0)
print(rgb[0])
print(rgb[:2])
~~~

但元组创建后不能直接修改元素：

~~~python
rgb = (255, 128, 0)
# rgb[0] = 0  # TypeError：元组不支持这样修改
~~~

当一组数据不应该被修改，或者需要表达一个固定结构时，可以使用元组。常见例子包括坐标、颜色值和函数返回的多个结果。

### 3.1 元组解包

可以把元组中的值一次性赋给多个变量：

~~~python
student = ("小林", 18, "Python")
name, age, language = student

print(name)
print(age)
print(language)
~~~

如果变量数量和元素数量不匹配，就会报 ValueError。使用星号可以接收剩余元素：

~~~python
first, *middle, last = [1, 2, 3, 4, 5]

print(first)
print(middle)
print(last)
~~~

## 4. 字典：保存键和值的对应关系

字典使用大括号创建，格式是 key: value：

~~~python
student = {
    "name": "小林",
    "age": 18,
    "language": "Python",
}
~~~

字典适合表达“一个名称对应一个信息”。通过键访问值：

~~~python
print(student["name"])
print(student["language"])
~~~

如果不确定键是否存在，使用 get 更安全：

~~~python
print(student.get("email"))
print(student.get("email", "暂未填写"))
~~~

直接使用不存在的键会产生 KeyError：

~~~python
# print(student["email"])  # KeyError
~~~

### 4.1 新增、修改和删除

~~~python
student = {"name": "小林", "age": 18}

student["age"] = 19
student["city"] = "杭州"
student.update({"language": "Python", "level": "beginner"})

removed_city = student.pop("city")
print(removed_city)
print(student)
~~~

字典中的键通常使用字符串，也可以使用数字或元组等不可变对象。初学阶段先使用清晰的字符串键即可。

### 4.2 遍历字典

~~~python
scores = {"变量": 90, "条件判断": 85, "循环": 78}

for topic in scores:
    print(topic)

for score in scores.values():
    print(score)

for topic, score in scores.items():
    print(f"{topic}：{score}")
~~~

实际开发中，items() 是最常用的字典遍历方式之一，因为它可以同时拿到键和值。

## 5. 集合：自动去重

集合使用大括号创建，但它只保存不重复的元素，不通过索引访问：

~~~python
languages = {"Python", "Java", "Python"}
print(languages)
~~~

输出顺序不应该被依赖，因为集合主要关注“元素是否存在”，而不是位置。

常见操作：

~~~python
python_topics = {"变量", "函数", "循环"}
web_topics = {"函数", "HTTP", "数据库"}

print(python_topics | web_topics)
print(python_topics & web_topics)
print(python_topics - web_topics)
print("函数" in python_topics)
~~~

其中：

- | 求并集；
- & 求交集；
- - 求差集；
- in 判断元素是否存在。

如果要创建空集合，不能直接写 {}，因为 {} 表示空字典：

~~~python
empty_set = set()
empty_dict = {}
~~~

## 6. 可变对象、不可变对象和复制

列表和字典是可变对象，元组、字符串和整数通常按不可变对象理解。把列表赋值给另一个变量时，两个变量可能指向同一个列表：

~~~python
original = ["变量", "循环"]
alias = original
alias.append("函数")

print(original)
print(alias)
~~~

original 也出现了“函数”，因为 alias 没有创建新列表，只是给原列表增加了另一个名字。

如果希望复制一份列表，可以使用切片或 copy：

~~~python
original = ["变量", "循环"]
copied = original.copy()
copied.append("函数")

print(original)
print(copied)
~~~

字典也可以使用 copy：

~~~python
scores = {"变量": 90}
new_scores = scores.copy()
new_scores["循环"] = 78

print(scores)
print(new_scores)
~~~

对于包含嵌套列表或嵌套字典的复杂对象，copy() 是浅复制，后面学习标准库时再了解深复制。现在先记住：需要独立修改时，不要直接使用 alias = original。

## 7. 遍历：把容器中的数据逐个取出来

最基本的遍历使用 for：

~~~python
topics = ["变量", "循环", "函数"]

for topic in topics:
    print(f"今天复习：{topic}")
~~~

### 7.1 enumerate：同时获取序号和元素

不要手动维护一个容易出错的计数变量，优先使用 enumerate：

~~~python
topics = ["变量", "循环", "函数"]

for index, topic in enumerate(topics, start=1):
    print(f"{index}. {topic}")
~~~

### 7.2 zip：同时遍历多组数据

当两组数据一一对应时，可以使用 zip：

~~~python
topics = ["变量", "循环", "函数"]
hours = [1.5, 2, 1]

for topic, hour in zip(topics, hours):
    print(f"{topic}：学习 {hour} 小时")
~~~

如果两组数据长度不同，zip 默认只遍历到较短的一组。需要严格检查长度时，后面可以学习标准库 itertools.zip_longest。

## 8. 列表推导式：简洁地生成新列表

如果只是根据一个列表生成另一个列表，可以使用列表推导式：

~~~python
numbers = [1, 2, 3, 4, 5]
squares = [number * number for number in numbers]

print(squares)
~~~

加入条件：

~~~python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = [number for number in numbers if number % 2 == 0]

print(even_numbers)
~~~

等价的普通写法是：

~~~python
even_numbers = []
for number in numbers:
    if number % 2 == 0:
        even_numbers.append(number)
~~~

列表推导式适合简单、清楚的转换。如果一行代码塞入太多条件或函数调用，就应该恢复成普通 for 循环，优先保证可读性。

字典也有类似的字典推导式：

~~~python
topics = ["变量", "循环", "函数"]
topic_lengths = {topic: len(topic) for topic in topics}

print(topic_lengths)
~~~

## 9. 函数：参数、返回值和默认值

Day 1 已经接触过函数。今天重点看函数接口：调用者传入什么，函数返回什么。

~~~python
def add(left, right):
    return left + right


result = add(2, 3)
print(result)
~~~

参数是函数接收的数据，return 把结果交还给调用者。return 执行后，函数会立即结束。

### 9.1 默认参数

可以为参数提供默认值：

~~~python
def greet(name, language="Python"):
    return f"{name} 正在学习 {language}"


print(greet("小林"))
print(greet("小林", "Django"))
~~~

有默认值的参数通常放在没有默认值的参数后面。默认参数应该使用不会被意外共享修改的值，例如数字、字符串和 None；不要把空列表或空字典直接作为可变默认参数。

推荐写法：

~~~python
def add_topic(topic, topics=None):
    if topics is None:
        topics = []
    topics.append(topic)
    return topics
~~~

### 9.2 关键字参数

调用函数时可以写出参数名，提升可读性：

~~~python
def build_message(name, day):
    return f"{name} 正在学习 Python Day {day}"


message = build_message(name="小林", day=2)
print(message)
~~~

位置参数和关键字参数可以混用，但位置参数要写在关键字参数前面：

~~~python
print(build_message("小林", day=2))
~~~

### 9.3 函数返回多个结果

Python 可以使用元组返回多个结果：

~~~python
def split_score(score):
    passed = score >= 60
    message = "通过" if passed else "继续练习"
    return passed, message


passed, message = split_score(85)
print(passed)
print(message)
~~~

函数只负责一件清楚的事情，通常比一个函数同时读取输入、修改全局数据、打印所有结果更容易测试。

### 9.4 可变参数的基础用法

如果参数数量不固定，可以使用 *args 接收多个位置参数，使用 **kwargs 接收多个关键字参数：

~~~python
def summarize(*scores, **metadata):
    print(f"学生：{metadata.get('name', '未命名')}")
    print(f"分数：{scores}")
    print(f"平均分：{sum(scores) / len(scores)}")


summarize(90, 85, 78, name="小林")
~~~

可变参数很灵活，但初学阶段不要为了“看起来高级”而到处使用。函数参数数量固定且含义清楚时，直接写出参数名更容易阅读。

## 10. 作用域：变量在哪里有效

函数内部创建的变量通常是局部变量，只在函数内部有效：

~~~python
def calculate_total(price, count):
    total = price * count
    return total


result = calculate_total(10, 3)
print(result)
# print(total)  # NameError：total 只在函数内部存在
~~~

函数外部创建的变量可以被函数读取：

~~~python
language = "Python"


def show_language():
    print(language)


show_language()
~~~

但是，不建议依赖全局变量来修改程序状态。全局变量越多，函数就越难单独理解和测试。

不推荐：

~~~python
total = 0


def add_score(score):
    global total
    total += score
~~~

更清楚的写法是通过参数传入数据，并用 return 返回结果：

~~~python
def add_score(total, score):
    return total + score


total = 0
total = add_score(total, 90)
total = add_score(total, 85)
print(total)
~~~

还要注意变量遮蔽：内层作用域中与外层同名的变量，会让代码阅读变得困难。

~~~python
language = "Python"


def show_language():
    language = "Django"
    print(language)


show_language()
print(language)
~~~

函数内部输出 Django，函数外部仍然是 Python。初学阶段给变量起更具体的名字，通常比依赖复杂的作用域规则更好。

## 11. 综合练习：学习成绩统计程序

下面的程序使用字典保存每个主题的分数，使用函数拆分统计逻辑，再用 enumerate 输出带序号的报告。

~~~python
def average_score(scores):
    if not scores:
        return 0
    return sum(scores.values()) / len(scores)


def passed_topics(scores, pass_line=60):
    return [
        topic
        for topic, score in scores.items()
        if score >= pass_line
    ]


def build_report(name, scores, pass_line=60):
    average = average_score(scores)
    passed = passed_topics(scores, pass_line)

    lines = [
        f"学习者：{name}",
        f"平均分：{average:.1f}",
        f"通过主题数：{len(passed)}",
        "详细成绩：",
    ]

    for index, (topic, score) in enumerate(scores.items(), start=1):
        status = "通过" if score >= pass_line else "需要复习"
        lines.append(f"{index}. {topic}：{score}（{status}）")

    return "\n".join(lines)


scores = {
    "变量与类型": 92,
    "条件判断": 86,
    "循环": 78,
    "函数": 88,
}

report = build_report("小林", scores)
print(report)
~~~

这个程序里：

- 字典保存主题和分数的对应关系；
- scores.values() 用于计算平均分；
- scores.items() 同时取得主题和分数；
- 列表推导式筛选通过的主题；
- 默认参数 pass_line 让调用者可以自定义及格线；
- 函数通过 return 返回完整报告，不直接依赖全局变量；
- enumerate 为每条成绩添加序号。

可以把及格线改为 80：

~~~python
print(build_report("小林", scores, pass_line=80))
~~~

## 12. 今天容易犯的错误

- 列表索引从 0 开始，最后一个元素可以使用 -1；
- 切片右边界不包含，topics[1:3] 只取得索引 1 和 2；
- 把空字典 {} 误认为是空集合，空集合应使用 set()；
- 用不存在的字典键直接访问，忘记考虑 KeyError；
- 把 alias = original 当成复制，导致修改一个列表时另一个也变化；
- 使用 zip 时忽略两组数据长度可能不同；
- 列表推导式写得过于复杂，降低可读性；
- 忘记函数的 return 值，导致调用者拿到 None；
- 把带默认值的参数放在普通参数前面；
- 为了修改外部变量滥用 global，导致函数难以测试；
- 使用可变对象作为函数默认参数，造成数据在多次调用之间意外共享。

## 13. Day 2 练习

1. 创建一个包含 5 个城市的列表，完成增加、删除、替换、切片和倒序；
2. 使用字典保存 3 名同学的姓名和分数，并输出平均分最高的同学；
3. 使用集合找出两组学习主题的共同部分和不同部分；
4. 使用 enumerate 输出带序号的待办事项；
5. 使用 zip 将主题列表和学习时长列表组合成字典；
6. 写一个 filter_passed(scores, pass_line=60) 函数，只返回分数达标的主题；
7. 修改综合示例，增加最高分、最低分和未通过主题；
8. 分别用普通 for 循环和列表推导式筛选偶数，比较两种写法的可读性。

## Day 2 检查清单

- [ ] 能说明列表、元组、字典和集合分别适合保存什么数据；
- [ ] 能熟练使用索引、切片、items、enumerate 和 zip；
- [ ] 理解列表赋值和列表复制的区别；
- [ ] 能写出带参数和返回值的函数；
- [ ] 能使用默认参数和关键字参数；
- [ ] 知道局部变量和全局变量的区别；
- [ ] 能独立完成成绩统计程序并解释每个函数的职责；
- [ ] 能指出代码中不必要的 global。

## Day 2 总结

今天的核心不是记住更多语法，而是学会让数据结构和函数各自承担清楚的职责：

~~~text
选择容器 → 遍历数据 → 处理数据 → 拆分函数 → 返回结果
~~~

下一步将进入模块、文件读写和异常处理。到那时，今天写出的函数会被放入模块中，程序也会开始处理真实文件和错误情况。

下一步：模块、文件与异常（文章准备中）。

延伸阅读：[Python 官方教程：数据结构](https://docs.python.org/3/tutorial/datastructures.html)、[Python 官方教程：定义函数](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)。
