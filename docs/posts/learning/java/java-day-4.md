---
title: Java 学习 Day 4：继承、多态与接口
description: 理解 Java 面向对象中的继承、方法重写、多态、抽象类和接口，为后续学习 Spring Boot 业务设计打好基础。
date: 2026-09-15
category: 学习
tag:
  - Java
  - Spring Boot
  - 学习笔记
author: 韩子阳
---

# Java 学习 Day 4：继承、多态与接口

Day 3 学习了类、对象和封装。今天继续学习面向对象的三个核心概念：继承、多态和接口。

这些内容在 Spring Boot 的业务类、服务类和接口设计中都会出现。

## 今天要掌握什么

- 使用 `extends` 实现继承
- 使用 `@Override` 重写父类方法
- 使用 `super` 调用父类成员
- 理解多态
- 理解抽象类和抽象方法
- 使用接口定义能力和规范
- 区分抽象类与接口

## 1. 什么是继承

继承表示子类拥有父类的属性和方法。

例如，狗和猫都属于动物：

```text
Animal
├── Dog
└── Cat
```

创建父类：

```java
public class Animal {
    String name;

    public void eat() {
        System.out.println(name + " 正在吃东西");
    }
}
```

创建子类：

```java
public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " 正在叫");
    }
}
```

使用：

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();

        dog.name = "旺财";
        dog.eat();
        dog.bark();
    }
}
```

`Dog` 通过 `extends Animal` 继承了 `Animal` 的 `name` 属性和 `eat()` 方法，同时还拥有自己的 `bark()` 方法。

## 2. 方法重写

如果子类不满意父类的方法，可以重新定义这个方法。

父类：

```java
public class Animal {
    public void sound() {
        System.out.println("动物发出声音");
    }
}
```

子类重写：

```java
public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("狗在汪汪叫");
    }
}
```

`@Override` 表示这个方法正在重写父类方法。建议始终写上它，让编译器帮助检查方法名和参数是否正确。

方法重写需要满足：

- 方法名相同
- 参数列表相同
- 返回值类型兼容
- 子类方法的访问权限不能比父类更严格

## 3. `super` 关键字

`super` 可以调用父类的成员。

```java
public class Animal {
    public void eat() {
        System.out.println("动物正在吃东西");
    }
}
```

```java
public class Dog extends Animal {
    @Override
    public void eat() {
        super.eat();
        System.out.println("狗正在吃骨头");
    }
}
```

输出：

```text
动物正在吃东西
狗正在吃骨头
```

子类方法中的 `super.eat()` 表示调用父类的 `eat()` 方法。

如果父类有带参数的构造方法，也可以使用 `super()` 调用：

```java
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }
}
```

```java
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
}
```

## 4. 什么是多态

多态可以理解为：父类类型的变量，可以指向子类对象。

```java
Animal animal = new Dog();
```

完整示例：

```java
public class Animal {
    public void sound() {
        System.out.println("动物发出声音");
    }
}
```

```java
public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("狗在汪汪叫");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        animal.sound();
    }
}
```

输出：

```text
狗在汪汪叫
```

虽然变量类型是 `Animal`，但实际对象是 `Dog`，所以运行时执行的是 `Dog` 重写后的方法。

这就是多态：

```text
父类引用指向子类对象
调用方法时执行子类的实现
```

## 5. 多态的好处

可以编写一个接收父类类型的方法：

```java
public static void makeSound(Animal animal) {
    animal.sound();
}
```

调用时可以传入不同的子类对象：

```java
makeSound(new Dog());
makeSound(new Cat());
```

方法不需要分别写成：

```text
makeDogSound()
makeCatSound()
```

只要 `Dog` 和 `Cat` 都继承了 `Animal`，就可以统一处理。

这使代码更容易扩展。以后增加 `Bird`、`Fish` 等新的子类时，原来的处理方法通常不需要修改。

## 6. 抽象类

如果一个父类只是为了给子类提供共同结构和规范，可以使用抽象类。

```java
public abstract class Animal {
    public abstract void sound();

    public void eat() {
        System.out.println("动物正在吃东西");
    }
}
```

抽象方法只有声明，没有方法体：

```java
public abstract void sound();
```

子类必须实现抽象方法：

```java
public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("狗在汪汪叫");
    }
}
```

抽象类不能直接创建对象：

```java
Animal animal = new Animal(); // 错误
```

但是可以指向子类对象：

```java
Animal animal = new Dog();
```

## 7. 接口

接口表示一种能力或规范。

```java
public interface Flyable {
    void fly();
}
```

实现接口：

```java
public class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟正在飞");
    }
}
```

使用接口：

```java
public class Main {
    public static void main(String[] args) {
        Flyable flyable = new Bird();

        flyable.fly();
    }
}
```

接口相关的关键字：

```text
interface：定义接口
implements：实现接口
```

## 8. 一个类实现多个接口

Java 类只能继承一个父类，但可以实现多个接口。

```java
public interface Swimmable {
    void swim();
}
```

```java
public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子可以飞");
    }

    @Override
    public void swim() {
        System.out.println("鸭子可以游泳");
    }
}
```

这也是接口的重要作用：一个类可以拥有多种能力。

## 9. 抽象类和接口的区别

| 对比 | 抽象类 | 接口 |
| --- | --- | --- |
| 关键字 | `abstract class` | `interface` |
| 继承方式 | `extends` | `implements` |
| 一个类可以使用几个 | 只能继承一个 | 可以实现多个 |
| 更适合表示 | 是什么 | 能做什么 |
| 是否可以有普通方法 | 可以 | 可以定义接口方法 |
| 是否可以有成员变量 | 可以 | 通常定义常量 |

简单记忆：

```text
Dog 是一种 Animal
Bird 具有 Flyable 能力
```

## 10. 今日练习

### 练习 1：动物继承

创建：

```text
Animal
Dog
Cat
```

要求：

- `Animal` 有 `eat()` 方法
- `Dog` 重写 `sound()`
- `Cat` 重写 `sound()`
- 使用父类变量调用不同动物的声音

### 练习 2：支付接口

创建接口：

```java
public interface Payable {
    void pay(double amount);
}
```

创建 `Alipay` 和 `WechatPay`，让两个类分别实现支付方法。

### 练习 3：多接口实现

创建：

```text
Flyable
Swimmable
Duck
```

让 `Duck` 同时实现飞行和游泳能力。

## 11. Day 4 总结

今天重点掌握了：

```text
extends       继承
@Override     方法重写
super         调用父类成员
多态          父类引用指向子类对象
abstract      抽象类或抽象方法
interface     接口
implements    实现接口
```

最重要的多态示例：

```java
Animal animal = new Dog();
```

变量看起来是父类类型，但实际运行的可能是子类方法。

## 12. 这些知识和 Spring Boot 有什么关系

在 Spring Boot 项目中，你会经常看到各种 Java 类：

- User 用户类
- Order 订单类
- Controller 控制器类
- Service 业务类
- Repository 数据访问类

它们虽然用途不同，但本质上都是 Java 类。以后学习实体类、请求对象、服务对象和依赖注入时，都会用到今天的继承、多态和接口知识。

下一天可以继续学习 Java 集合框架，包括 `List`、`ArrayList`、`Set` 和 `Map`。
