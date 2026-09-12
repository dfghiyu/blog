---
title: Linux 学习 Day 2：Linux 根目录结构与文件系统规范
description: 理解 Linux 根目录下常见目录的用途，掌握配置、程序、日志、用户文件和网站内容的规范位置。
date: 2026-09-10
category: 学习
tag:
  - Linux
  - 文件系统
  - 服务器
  - 部署
author: 韩子阳
---

# Linux 学习 Day 2：Linux 根目录结构与文件系统规范

今天继续学习 Linux 文件系统。重点不是死记每一个目录，而是建立分类意识：

> 配置去哪、程序去哪、日志去哪、用户文件去哪、网站去哪。

Linux 不像 Windows 那样分成 C 盘、D 盘和 E 盘，整个系统都从一个根目录开始：

```text
/
```

可以把它想成一棵树：

```text
/
├── bin
├── boot
├── dev
├── etc
├── home
├── opt
├── proc
├── root
├── run
├── srv
├── sys
├── tmp
├── usr
└── var
```

## 1. /

/ 是整个 Linux 文件系统的根。所有目录、磁盘和设备，最终都会出现在这棵目录树下面。

因此 / 不是某个普通文件夹，而是整个文件系统的起点。

## 2. /bin

bin 来自 binary，主要保存基础可执行命令，例如：

```text
ls
cp
mv
cat
mkdir
```

传统上这些命令大量放在 /bin。不过现代 Linux 中，很多发行版已经把 /bin 做成指向 /usr/bin 的符号链接：

```text
/bin -> /usr/bin
```

所以初学阶段只需要记住：

> /bin 是基础命令相关目录。

## 3. /sbin

sbin 可以理解成 system binary，主要保存系统管理相关命令，例如：

```text
reboot
fdisk
mkfs
```

现代系统中也经常会出现：

```text
/sbin -> /usr/sbin
```

可以简单区分：

```text
/usr/bin
普通命令

/usr/sbin
系统管理命令
```

## 4. /boot

/boot 存放 Linux 启动相关文件，例如 Linux 内核、GRUB 和 initramfs：

```text
/boot/vmlinuz-...
/boot/grub/
/boot/initrd.img-...
```

这个目录非常重要。正常情况下不要随便删除 /boot 里的文件，否则可能导致系统无法启动。

## 5. /dev

dev 来自 device，是设备目录。

Linux 有一个非常重要的思想：

> 很多设备都可以表现成文件。

常见设备文件包括：

```text
/dev/sda
/dev/nvme0n1
/dev/tty
/dev/null
```

它们可能分别代表磁盘、NVMe 硬盘和终端设备。

其中 /dev/null 很经典，可以把它理解成一个“黑洞”。例如：

```bash
command > /dev/null
```

意思是把命令输出直接丢弃，不在终端显示。

## 6. /etc

/etc 是系统配置中心，也是最重要的目录之一。很多系统服务的配置都放在这里：

```text
/etc/nginx/
/etc/ssh/
/etc/systemd/
/etc/hosts
/etc/passwd
```

以后部署网站、配置 SSH 或修改服务参数时，经常都会进入 /etc。

看到 /etc 时，第一反应应该是：

> 系统配置文件。

## 7. /home

/home 是普通用户的家目录。

假设用户名叫 jingzhe，通常会有：

```text
/home/jingzhe
```

这里可以放项目、文档、代码、下载文件和个人配置。

用户登录后看到的 ~，通常就代表自己的 home。例如：

```text
~
/home/jingzhe
```

在很多系统中，二者表示同一个位置。

## 8. /root

/ 和 /root 很容易混淆。

```text
/
整个系统的根目录

/root
root 用户自己的家目录
```

普通用户的家目录通常是：

```text
/home/jingzhe
```

root 用户的家目录通常是：

```text
/root
```

它们是完全不同的概念。

## 9. /opt

opt 可以理解为 optional，通常用来放独立的第三方应用程序：

```text
/opt/openlist
/opt/myapp
/opt/backend
```

如果自己写了一个包含前端、后端、配置和启动脚本的完整项目，放在 /opt/myapp 是比较合理的。

可以先记住：

> /opt 更偏向“完整应用”。

## 10. /var

var 来自 variable，表示经常变化的数据。

例如日志、缓存、网站文件、数据库数据和队列等，都可能放在 /var 下：

```text
/var/log
/var/cache
/var/lib
/var/www
```

所以 /var 不是某一个具体软件的目录，而是运行过程中会持续变化的数据的集中区域。

## 11. /var/log

/var/log 主要存放日志：

```text
/var/log/nginx
/var/log/syslog
```

以后服务器出问题，一个特别重要的思维是：

```text
服务出错
↓
看日志
↓
找报错信息
↓
定位原因
```

遇到网站打不开、服务启动失败或程序异常退出时，第一反应不要只是重启，而应该先想：

> 日志在哪里？

## 12. /var/www

/var/www 经常用于存放网站内容：

```text
/var/www/html
/var/www/blog
```

里面可能放：

```text
index.html
css/
js/
assets/
```

它尤其适合 Nginx 或 Apache 直接托管静态网页。

## /opt 和 /var/www 的区别

这是部署网站时非常值得理解的区别。

如果项目包含：

```text
Vue 前端
Node / Python 后端
配置文件
启动脚本
```

它更像是一个完整应用，可以考虑放在：

```text
/opt/myapp
```

如果只是编译好的静态网页：

```text
index.html
css
js
图片
```

则更适合放在：

```text
/var/www/blog
```

可以简单理解为：

```text
/opt
完整应用

/var/www
Web 内容
```

这不是说其中一个一定正确、另一个一定错误，而是二者的语义和行业习惯不同。

## 13. /usr

不要简单把 usr 理解成 user。用户个人文件应该放在 /home，而 /usr 主要保存大量程序、命令、库和共享资源：

```text
/usr/bin
/usr/sbin
/usr/lib
/usr/share
/usr/local
```

可以简单记成：

> /usr 是 Linux 软件资源的大本营。

## 14. /usr/bin

大量日常命令会放在 /usr/bin，例如：

```text
/usr/bin/git
/usr/bin/python3
/usr/bin/curl
```

所以输入 git 时，Shell 实际可能执行的是 /usr/bin/git。

这就涉及之后会学习的 PATH：Shell 会根据 PATH 中的目录寻找要执行的程序。

## 15. /usr/local

/usr/local 一般用于管理员自己额外安装的软件：

```text
/usr/local/bin
/usr/local/lib
```

可以先这样区分：

```text
/usr/bin
系统或包管理器安装的程序

/usr/local/bin
本机管理员手动安装的程序
```

这是 Linux 中很常见的目录约定。

## 16. /tmp

tmp 来自 temporary，是临时文件目录。

程序可能会把缓存、临时压缩文件和临时计算数据放在这里。

最重要的一点是：

> 不要把重要文件长期放在 /tmp。

因为系统可能会自动清理这个目录。

## 17. /proc

/proc 比较特殊。它不是普通意义上存放磁盘文件的目录，而是一个虚拟文件系统，主要展示进程、内存、CPU 和内核状态。

例如：

```text
/proc/cpuinfo
```

可以看到 CPU 信息。

```text
/proc/meminfo
```

可以看到内存信息。

还可能看到：

```text
/proc/1234
```

这里的数字通常是某个进程的 PID，也就是进程 ID。

因此可以把 /proc 理解成：

> Linux 内核和进程状态的窗口。

## 18. /sys

/sys 也是一个特殊的系统目录，主要反映：

```text
硬件
设备
驱动
内核对象
```

可以先这样记：

```text
/proc
偏进程和系统运行状态

/sys
偏设备、驱动和内核对象
```

初学阶段不需要深入修改这里，先理解它的用途即可。

## 19. /run

/run 主要保存系统运行时产生的数据，例如：

```text
PID 文件
Socket
服务状态
```

这些数据通常会在系统启动后重新生成，重启以后可能发生变化。

所以：

> /run 不是长期保存数据的地方。

## 20. /srv

srv 来自 service，理论上用于保存系统对外提供服务的数据。

例如有人会使用：

```text
/srv/www
/srv/ftp
```

不过实际生产环境中，不同团队的习惯并不完全相同。你更常看到的还是 /opt 和 /var/www。

## 今天最重要的分类表

先记住下面这张表：

| 目录 | 第一反应 |
|---|---|
| / | 整个系统根目录 |
| /bin | 基础命令 |
| /sbin | 系统管理命令 |
| /boot | 启动文件 |
| /dev | 设备 |
| /etc | 配置 |
| /home | 普通用户家目录 |
| /root | root 家目录 |
| /opt | 第三方完整应用 |
| /proc | 进程、内核信息 |
| /sys | 硬件、驱动、内核对象 |
| /tmp | 临时文件 |
| /usr | 软件、命令、库 |
| /var | 经常变化的数据 |
| /var/log | 日志 |
| /var/www | 网站内容 |
| /run | 运行时数据 |
| /srv | 服务数据 |

最重要的是形成这种条件反射：

```text
配置
→ /etc

日志
→ /var/log

用户文件
→ /home

完整程序
→ /opt

网页文件
→ /var/www

临时文件
→ /tmp

设备
→ /dev

系统命令
→ /usr/bin
```

## Day 2 最容易混淆的 4 个点

### 1. / 和 /root

/ 是整个系统的根目录，/root 是 root 用户的家目录。

### 2. /home 和 /usr

/home 放普通用户文件，/usr 放系统软件、命令、库和共享资源。

### 3. /opt 和 /var/www

/opt 更偏完整应用，/var/www 更偏网站公开内容。

### 4. /proc 和 /sys

/proc 更偏进程和运行状态，/sys 更偏设备、驱动和内核对象。

## Day 2 总结

今天不需要把每个目录的英文全称都背下来，真正需要理解的是：

> Linux 的目录不是随便放文件，而是有明确用途和行业习惯的。

所以以后部署项目时，可以开始主动判断：

```text
配置应该放哪？
日志应该放哪？
网站文件应该放哪？
程序应该放哪？
```

这就是 Linux 文件系统思维。

下一天继续学习 **Day 3：Linux 文件与目录命令原理**，重点包括 pwd、ls、cd、mkdir、touch、cp、mv、rm，以及 rm -rf 为什么危险。
