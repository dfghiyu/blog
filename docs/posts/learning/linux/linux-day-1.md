---
title: Linux 学习 Day 1：Linux、Shell、Terminal 与目录结构基础
description: 从 Linux 内核、发行版、Shell 与 Terminal 的区别开始，理解命令、路径、文件系统和权限的基础概念。
date: 2026-09-09
category: 学习
tag:
  - Linux
  - Shell
  - Terminal
  - 命令行
author: 韩子阳
---

# Linux 学习 Day 1：Linux、Shell、Terminal 与目录结构基础

今天先不追求大量实操，重点理解 Linux、Shell、Terminal、命令和目录结构这些基础概念。之后学习 Git、GitHub、pip 和服务器部署时，都会反复用到它们。

## 1. Linux 到底是什么

Linux 严格来说不是一个完整操作系统，而是一个**操作系统内核（Kernel）**。

我们平时说的 Ubuntu、Debian、CentOS、Rocky Linux、Arch Linux 和 Alpine Linux，准确地说叫 **Linux 发行版**。它们通常由 Linux 内核、系统工具、软件包管理器、桌面环境或服务等部分组成：

```text
Linux Kernel
     ↓
系统工具
     ↓
软件包管理器
     ↓
桌面环境 / 服务
     ↓
Ubuntu / Debian / Rocky Linux ...
```

Linux 内核主要负责管理 CPU、内存、磁盘、进程、网络和硬件设备。程序读取硬盘文件时，通常通过系统调用请求内核完成：

```text
应用程序 → 系统调用 → Linux Kernel → 磁盘
```

## 2. Shell 和 Terminal

登录服务器后，经常会看到：

```text
root@server:~#
jingzhe@server:~$
```

此时正在和一个叫 **Shell** 的程序交互。Shell 可以理解成“人和 Linux 内核之间的命令解释器”。输入 ls 后，Shell 会解析命令，再让系统执行对应的程序。

常见 Shell 有：

```text
sh
bash
zsh
fish
```

Terminal（终端）和 Shell 不是一回事。Terminal 负责提供显示和输入界面，例如 macOS Terminal、iTerm2、Windows Terminal 和 VS Code Terminal；Shell 负责解释命令，例如 bash、zsh 和 PowerShell。

它们的关系可以简单表示为：

```text
Terminal
   ↓
Shell
   ↓
操作系统
```

## 3. 什么叫“命令”

例如：

```bash
ls -la /opt
```

可以拆成三个部分：

```text
ls       -la       /opt
│         │          │
命令      选项        参数
```

ls 表示列出文件，-la 是选项，/opt 是操作对象。单横线通常表示短选项，双横线表示长选项：

```bash
ls -l
ls --all
ls -l -a -h
ls -lah
```

多个短选项可以组合。这里的 l、a、h 通常分别表示 long、all 和 human-readable。

## 4. Linux 为什么依赖命令行

Linux 服务器经常没有桌面环境，管理员主要通过 SSH 和 Shell 管理系统。例如：

```bash
apt install nginx
systemctl start nginx
systemctl status nginx
journalctl
ls
```

所以学习 Linux 的重点不只是背命令，而是理解 Linux 如何组织和管理整台计算机。命令只是操作系统提供给人的一种入口。

## 5. “一切皆文件”

普通文本是文件：

```text
hello.txt
```

硬盘、终端等设备也可以表现成文件：

```text
/dev/sda
/dev/nvme0n1
/dev/tty
```

/proc 和 /sys 则通过虚拟文件系统提供进程、内核、设备和驱动相关信息。因此 Linux 中很多操作最终都可以理解为读文件、写文件或修改文件。

## 6. Linux 文件系统是一棵目录树

Windows 常见的是 C 盘、D 盘，Linux 则从唯一的根目录 / 开始：

```text
/
├── bin
├── boot
├── dev
├── etc
├── home
├── opt
├── root
├── tmp
├── usr
└── var
```

所有磁盘最终都会被挂载到这棵目录树中的某个位置。可以把 Linux 的文件系统理解成一棵从 / 开始的树。

## 7. /、~、. 和 ..

- / 是整个文件系统的根目录。
- ~ 是当前用户的家目录，例如普通用户通常是 /home/jingzhe，root 用户通常是 /root。
- . 表示当前目录，例如 ./app 表示当前目录里的 app。
- .. 表示上一级目录。

如果当前位于 /home/jingzhe/blog，那么 .. 就是 /home/jingzhe。

## 8. 绝对路径与相对路径

从 / 开始写出的路径是绝对路径：

```text
/home/jingzhe/blog/index.html
```

不以 / 开始、从当前位置出发的路径是相对路径：

```text
blog/index.html
```

如果当前目录是 /home/jingzhe，上面的相对路径才对应 /home/jingzhe/blog/index.html。很多 No such file or directory 报错，并不代表文件一定不存在，也可能只是当前目录不对。

## 9. Linux 区分大小写

下面是三个不同的文件：

```text
test.txt
Test.txt
TEST.txt
```

因此 cd Blog 和 cd blog 可能完全不是一回事。这是从 Windows 环境切换到 Linux 时很常见的细节。

## 10. root 和 sudo

Linux 中的 root 用户拥有很高的权限，可以删除文件、修改配置、关闭服务、创建用户、修改权限，甚至格式化磁盘。因此类似下面的命令必须极其谨慎：

```bash
rm -rf /
```

服务器通常更推荐使用普通用户，并在必要时通过 sudo 临时提升权限：

```bash
sudo apt install nginx
```

看到 sudo 时，应该意识到这条命令正在进行高权限操作，不能只看教程就机械复制。

## 11. 第一天先认识 5 条命令

```bash
pwd
ls
cd
whoami
man
```

可以把它们记成：

```text
pwd     我在哪
ls      有什么
cd      去哪里
whoami  我是谁
man     怎么用
```

今天不需要背几十条命令，只要先理解这些命令分别在回答什么问题。

## Day 1 核心总结

今天需要理解的概念包括：

```text
Linux Kernel
Linux 发行版
Terminal
Shell
Command
Option
Argument
根目录 /
用户目录 ~
绝对路径 / 相对路径
```

还要记住三个重要思想：

```text
Linux 是一棵目录树
Linux 的大量功能通过文件体现
服务器管理大量依赖 Shell
```

下一步可以继续学习 Linux 文件系统中 /bin、/etc、/home、/opt、/usr、/var、/tmp、/dev 和 /proc 分别负责什么。
