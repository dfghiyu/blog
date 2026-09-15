---
title: Java 学习 Day 3：类、对象与封装
description: 理解 Java 面向对象基础，掌握类、对象、构造方法、this、private、getter 和 setter，为后续学习 Spring Boot 打好基础。
date: 2026-09-15
category: 学习
tag:
  - Java
  - Spring Boot
  - 学习笔记
author: 韩子阳
---

# Java 学习 Day 3：类、对象与封装

Day 1 学习了变量、数据类型、条件判断和方法，Day 2 学习了循环、数组和用户输入。今天开始学习 Java 最核心的内容：面向对象。

Spring Boot 中大量代码都是由类和对象组成的，所以理解类、对象和封装非常重要。

## 今天要掌握什么

- 理解类和对象的关系
- 创建类和对象
- 定义成员变量和成员方法
- 使用构造方法初始化对象
- 理解 `this` 关键字
- 使用 `private` 实现封装
- 编写 getter 和 setter
- 为对象数据增加基本校验

## 1. 什么是类和对象

可以把类理解成模板，把对象理解成根据模板创建出来的具体实例。

例如：

```text
Student 是学生类
张三是一个 Student 对象
李四也是一个 Student 对象
```

类描述一类事物共同拥有的属性和行为：

```text
属性：姓名、年龄、学号
行为：学习、考试、介绍自己
```

在 Java 中：

```text
成员变量：描述对象有什么
成员方法：描述对象能做什么
```

## 2. 创建一个类

```java
public class Student {
    String name;
    int age;

    void study() {
        System.out.println(name + " 正在学习");
    }
}
```

这个 `Student` 类包含：

- `name`：成员变量
- `age`：成员变量
- `study()`：成员方法

类名通常使用大驼峰命名，例如 `Student`、`User`、`OrderItem`。

## 3. 创建对象

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "张三";
        student.age = 20;

        System.out.println(student.name);
        System.out.println(student.age);

        student.study();
    }
}
```

这行代码：

```java
Student student = new Student();
```

可以理解为：

```text
使用 Student 类创建一个对象
把这个对象保存到 student 变量中
```

`new Student()` 会创建一个新的 `Student` 对象。每使用一次 `new`，通常就会得到一个新的对象。

例如：

```java
Student student1 = new Student();
Student student2 = new Student();

student1.name = "张三";
student2.name = "李四";
```

`student1` 和 `student2` 是两个不同的对象，它们各自保存自己的数据。

## 4. 成员变量和成员方法

```java
public class Dog {
    String name;
    String color;

    void bark() {
        System.out.println(name + " 正在叫");
    }

    void introduce() {
        System.out.println("名字：" + name);
        System.out.println("颜色：" + color);
    }
}
```

这里：

```text
name、color：对象保存的数据
bark()、introduce()：对象可以执行的行为
```

使用对象时，可以通过点号访问成员：

```java
Dog dog = new Dog();
dog.name = "旺财";
dog.color = "黄色";
dog.bark();
dog.introduce();
```

## 5. 构造方法

如果每次创建对象后都手动设置属性，代码会比较繁琐：

```java
Student student = new Student();
student.name = "张三";
student.age = 20;
```

可以使用构造方法，在创建对象时直接初始化数据：

```java
public class Student {
    String name;
    int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void study() {
        System.out.println(name + " 正在学习");
    }
}
```

使用构造方法：

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student("张三", 20);

        student.study();
    }
}
```

构造方法有几个特点：

- 方法名必须和类名相同
- 没有返回值类型，连 `void` 也不能写
- 创建对象时自动执行
- 可以有参数，也可以没有参数

## 6. `this` 关键字

观察这段代码：

```java
public Student(String name, int age) {
    this.name = name;
    this.age = age;
}
```

这里有两个 `name`：

```text
this.name：当前对象的成员变量
name：构造方法的参数
```

`this` 表示当前对象。它可以帮助我们区分成员变量和方法参数。

如果参数换一个名字，也可以这样写：

```java
public Student(String studentName, int studentAge) {
    name = studentName;
    age = studentAge;
}
```

但是在实际项目中，参数名和成员变量名相同，再使用 `this` 是更常见的写法。

## 7. 封装

如果成员变量可以被外部随便修改，数据就可能不合理：

```java
student.age = -100;
```

因此通常会使用 `private` 隐藏成员变量：

```java
public class Student {
    private String name;
    private int age;
}
```

使用 `private` 后，类的外部不能直接访问这些变量：

```java
Student student = new Student();
student.age = 20; // 编译错误
```

这时可以提供公开的方法，让外部通过方法读取和修改数据。

## 8. getter 和 setter

```java
public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }
}
```

命名习惯：

```text
getName()：读取 name
setName()：修改 name
getAge()：读取 age
setAge()：修改 age
```

使用对象：

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student("张三", 20);

        System.out.println(student.getName());

        student.setAge(21);
        System.out.println(student.getAge());
    }
}
```

setter 还可以增加校验逻辑：

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        System.out.println("年龄不合法");
        return;
    }

    this.age = age;
}
```

这就是封装的价值：对象自己控制数据如何被读取和修改。

## 9. 完整示例：User 用户类

```java
public class User {
    private String username;
    private int age;

    public User(String username, int age) {
        this.username = username;
        this.age = age;
    }

    public void introduce() {
        System.out.println("我叫 " + username + "，今年 " + age + " 岁");
    }

    public boolean isAdult() {
        return age >= 18;
    }

    public String getUsername() {
        return username;
    }
}
```

使用这个类：

```java
public class Main {
    public static void main(String[] args) {
        User user = new User("韩子阳", 20);

        user.introduce();

        if (user.isAdult()) {
            System.out.println("已经成年");
        } else {
            System.out.println("还未成年");
        }
    }
}
```

这个示例把数据和行为放到了同一个对象中：

```text
数据：username、age
行为：introduce()、isAdult()
```

## 10. 今日练习

### 练习 1：创建 Phone 类

要求包含：

```text
品牌 brand
价格 price
打电话 call()
```

### 练习 2：创建 User 类

要求包含：

```text
用户名 username
密码 password
登录方法 login()
```

登录时判断输入的用户名和密码是否正确。

### 练习 3：完善年龄校验

创建 `Person` 类：

```java
private int age;
```

要求：

- 年龄不能小于 0
- 年龄不能大于 150
- 不合法时不修改原来的年龄

### 练习 4：创建商品类

要求包含：

```text
商品名称
商品价格
购买方法
```

购买时判断余额是否足够。

## 11. Day 3 总结

今天重点掌握了：

```text
class        定义类
object       创建对象
new          创建对象
constructor   构造方法
this         当前对象
private      私有成员
get/set      读取和修改数据
封装         保护对象内部数据
```

还需要记住：

- 类是对象的模板
- 对象是类的具体实例
- 构造方法在创建对象时执行
- `this` 表示当前对象
- `private` 可以限制外部直接访问
- getter 和 setter 是常见的数据访问方式

## 12. 这些知识和 Spring Boot 有什么关系

在 Spring Boot 项目中，你会经常看到各种 Java 类：

- User 用户类
- Order 订单类
- Controller 控制器类
- Service 业务类
- Repository 数据访问类

它们虽然用途不同，但本质上都是 Java 类。以后学习实体类、请求对象和服务对象时，都会用到今天的类、对象、构造方法和封装知识。

下一天可以继续学习继承、多态和接口，进一步理解 Java 面向对象的核心思想。
