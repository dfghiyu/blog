---
title: 2026 Java 开发环境搭建：JDK 25、IDEA 2026.2 与学生认证
description: 以 Windows 为主、macOS 为补充，手把手完成 JDK 25 安装、JAVA_HOME 与 Path 配置、IntelliJ IDEA 2026.2 安装、Hello World 和 JetBrains 学生认证。
date: 2026-09-12
category: 学习
tag:
  - Java
  - JDK
  - IntelliJ IDEA
  - Spring Boot
  - Windows
  - macOS
author: 韩子阳
---

# 2026 Java 开发环境搭建：JDK 25、IDEA 2026.2 与学生认证

如果准备正式学习 Java 和 Spring Boot，第一步不是先下载一堆软件，而是把开发环境搭建成一个“能确认、能复现、能排错”的状态。

本文以 Windows 11/Windows 10 为主线，同时整理 macOS Intel 和 Apple Silicon 的完整步骤，带你完成：

- 安装 JDK 25
- 配置 JAVA_HOME 和 Path
- 验证 java、javac 是否可用
- 安装 IntelliJ IDEA 2026.2
- 在 IDEA 中配置项目 JDK
- 创建并运行第一个 Java 程序
- 申请 JetBrains Student Pack
- 排查版本冲突和常见错误

> 本文按 2026 年 9 月的官方页面整理。具体补丁版本、安装界面文字和学生认证规则可能变化，下载和申请时以官方页面当前显示为准。

## 一、先看结论：我应该选择哪个版本

| 软件 | 推荐选择 | 说明 |
| --- | --- | --- |
| JDK | JDK 25 | 当前最新 LTS，适合新项目和本学习路线 |
| 兼容版本 | JDK 21 | 课程或旧项目明确要求时使用 |
| IDE | IntelliJ IDEA 2026.2 | 当前统一版 IDEA |
| 后端框架 | Spring Boot 4.x | 至少需要 Java 17，可使用 Java 25 |

Oracle 当前把 JDK 25 标为 Java SE 的最新长期支持版本，同时提供 Windows、macOS 和 Linux 安装包：

[Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)

Spring Boot 4.1.1 的官方要求是至少 Java 17，并兼容到 Java 26，所以 JDK 25 可以作为后续 Spring Boot 学习的主版本：

[Spring Boot System Requirements](https://docs.spring.io/spring-boot/system-requirements.html)

### JDK 和 IDEA 是两件事

IntelliJ IDEA 自己运行时已经自带 JetBrains Runtime，因此启动 IDEA 不一定需要提前安装 Java。但是，开发 Java 项目、编译代码和运行 Spring Boot 应用，仍然需要单独安装 JDK。

可以这样理解：

    JetBrains Runtime
        └── 负责运行 IDEA 软件本身

    项目 JDK
        └── 负责编译、运行你的 Java 和 Spring Boot 项目

## 二、准备工作：先确认系统和芯片架构

### Windows

大多数 Windows 电脑选择 Windows x64。如果是搭载 ARM 处理器的 Windows 设备，再根据下载页面选择 ARM64 版本。普通 Intel 和 AMD 电脑不要误选 ARM64。

查看 Windows 系统类型：

1. 右键“此电脑”，选择“属性”。
2. 查看“系统类型”。
3. 如果显示“基于 x64 的处理器”，选择 x64 安装包。

### macOS

打开“终端”，执行：

    uname -m

常见结果：

    arm64

表示 Apple Silicon，也就是 M1、M2、M3、M4 等芯片。

    x86_64

表示 Intel 芯片。

选择方式：

| 终端结果 | JDK 下载包 |
| --- | --- |
| arm64 | macOS ARM64 / AArch64 |
| x86_64 | macOS x64 |

## 三、Windows 安装 JDK 25

### 1. 下载 JDK

打开官方页面：

[Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)

找到 JDK 25，再根据电脑选择 Windows x64 Installer。通常下载 .exe 安装程序最适合第一次安装，也可以选择 .msi。

不要下载只有运行环境的 JRE。后续需要使用 javac 编译 Java 源代码，因此应该安装 JDK。

### 2. 安装 JDK

双击下载的安装程序，按照向导操作。

安装路径可以使用默认值：

    C:\Program Files\Java\jdk-25

也可以改到其他位置：

    D:\Java\jdk-25

建议记住实际安装路径，后面配置 JAVA_HOME 时会用到。

JAVA_HOME 要指向 JDK 根目录：

    C:\Program Files\Java\jdk-25

不要写成：

    C:\Program Files\Java\jdk-25\bin

bin 是后面要加入 Path 的目录，不是 JAVA_HOME 的值。

### 3. 打开环境变量设置

按下面的路径打开环境变量：

1. 按 Win + R。
2. 输入 sysdm.cpl，按回车。
3. 切换到“高级”选项卡。
4. 点击“环境变量”。

环境变量分为两部分：

    用户变量
    只对当前 Windows 用户生效

    系统变量
    对电脑上的所有用户生效

个人电脑学习 Java 时，配置在“用户变量”里通常就够了。如果电脑由学校或公司统一管理，可能没有权限修改系统变量，这时优先使用用户变量。

### 4. 新建 JAVA_HOME

在“用户变量”区域点击“新建”，填写：

    变量名：
    JAVA_HOME

    变量值：
    C:\Program Files\Java\jdk-25

如果你的安装路径不同，以实际路径为准。

最终关系是：

    JAVA_HOME
        ↓
    C:\Program Files\Java\jdk-25
        ↓
    C:\Program Files\Java\jdk-25\bin

### 5. 配置 Path

在“用户变量”中找到 Path：

1. 选中 Path。
2. 点击“编辑”。
3. 点击“新建”。
4. 添加：

    %JAVA_HOME%\bin

使用 %JAVA_HOME%\bin 的好处是以后切换 JDK 时，只需要修改 JAVA_HOME，不用反复修改完整路径。

不要把下面这些旧教程内容照搬过来：

    %JAVA_HOME%\jre\bin
    CLASSPATH=...
    %JAVA_HOME%\lib\dt.jar
    %JAVA_HOME%\lib\tools.jar

JDK 9 以后已经不再按 JDK 8 的方式配置独立 jre、tools.jar 和传统 CLASSPATH。新项目只需要正确设置 JDK 和 Path。

### 6. 重新打开终端

环境变量只会传给新启动的程序。配置完成后：

1. 关闭已经打开的 CMD、PowerShell 和 IDEA 终端。
2. 重新打开 CMD 或 PowerShell。
3. 再执行验证命令。

只在旧终端里测试，可能会误以为配置没有生效。

### 7. 验证 JDK

#### 在 CMD 中验证

打开 CMD，执行：

    java -version
    javac -version
    echo %JAVA_HOME%
    where java
    where javac

你应该能看到 Java 25 的版本信息，以及 JDK 的安装路径。

where java 和 where javac 很重要。它们会告诉你系统实际执行的是哪个文件。如果电脑装过多个 Java 版本，可能会发现旧版本路径排在前面。

#### 在 PowerShell 中验证

PowerShell 中查看变量：

    java -version
    javac -version
    $env:JAVA_HOME
    Get-Command java
    Get-Command javac

如果 java -version 和 javac -version 都能正常输出版本，说明基本安装完成。

### 8. Windows 常见路径冲突

如果 where java 输出多个路径，例如：

    C:\Program Files\Common Files\Oracle\Java\javapath\java.exe
    C:\Program Files\Java\jdk-25\bin\java.exe

系统会优先使用排在前面的路径。此时需要检查 Path 的顺序：

1. 确认 %JAVA_HOME%\bin 指向正确的 JDK。
2. 将正确的 JDK 路径放到旧路径前面。
3. 删除已经不存在的 JDK 路径。
4. 重新打开终端。
5. 再次执行 where java 和 java -version。

不要为了“看起来干净”就删除不确定的系统路径。先确认 where java 的实际结果，再调整具体的旧 JDK 项。

## 四、macOS 安装 JDK 25

### 1. 下载正确的安装包

打开：

[Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)

在 JDK 25 的 macOS 下载区域选择 ARM64 DMG Installer 或 x64 DMG Installer，取决于前面 uname -m 的结果。

### 2. 安装 JDK

双击 .dmg 文件，在打开的窗口中双击 .pkg 安装包，然后按照向导完成安装。

Oracle JDK 在 macOS 上通常安装到：

    /Library/Java/JavaVirtualMachines/jdk-25.jdk/Contents/Home

可以使用下面的命令查看已安装的 JDK：

    /usr/libexec/java_home -V

### 3. 先直接验证

打开新的终端窗口，执行：

    java -version
    javac -version

如果能看到 Java 25 的版本信息，说明 JDK 已经安装成功。

### 4. 配置 JAVA_HOME 和 Path

macOS 默认使用 zsh。编辑当前用户的 ~/.zshrc：

    nano ~/.zshrc

在文件末尾添加：

    export JAVA_HOME=$(/usr/libexec/java_home -v 25)
    export PATH="$JAVA_HOME/bin:$PATH"

保存并退出 nano：

    Ctrl + O
    回车
    Ctrl + X

让配置立即生效：

    source ~/.zshrc

然后验证：

    echo $JAVA_HOME
    which java
    which javac
    java -version
    javac -version

JAVA_HOME 应该指向类似下面的路径：

    /Library/Java/JavaVirtualMachines/jdk-25.jdk/Contents/Home

### 5. macOS 多版本 JDK

如果同时安装了 JDK 21 和 JDK 25，可以使用 java_home 切换当前终端使用的版本。

临时使用 JDK 21：

    export JAVA_HOME=$(/usr/libexec/java_home -v 21)
    export PATH="$JAVA_HOME/bin:$PATH"

恢复到 JDK 25：

    export JAVA_HOME=$(/usr/libexec/java_home -v 25)
    export PATH="$JAVA_HOME/bin:$PATH"

如果需要永久使用某个版本，就把对应版本写入 ~/.zshrc。不建议把多个版本的 bin 路径硬编码在 Path 中，否则很容易出现版本顺序混乱。

### 6. macOS 常见问题

#### java_home -v 25 找不到版本

执行：

    /usr/libexec/java_home -V

确认列表中是否存在 25。如果没有，说明 JDK 25 没有安装成功，或者下载了错误架构的安装包。

#### 终端和 IDEA 使用的版本不同

终端使用的是 JAVA_HOME，IDEA 使用的是项目设置中的 Project SDK。两者可以不同。后文会分别设置 IDEA 的 Project SDK 和构建工具使用的 JDK。

## 五、Linux 简要说明

Linux 的安装方式取决于发行版。可以使用 Oracle JDK 25 的 .deb 或 .rpm 安装包，也可以使用发行版软件包管理器或 SDKMAN 管理多个 JDK 版本。

无论采用哪种方式，最终都应该确认：

    java -version
    javac -version
    echo "$JAVA_HOME"
    which java
    which javac

详细安装步骤可以参考：

[Oracle JDK 25 Installation Guide](https://docs.oracle.com/en/java/javase/25/install/)

## 六、安装 IntelliJ IDEA 2026.2

### 1. 下载 IDEA

官方页面：

[IntelliJ IDEA Download](https://www.jetbrains.com/idea/download/)

JetBrains 从 IntelliJ IDEA 2025.3 开始采用统一产品形态，不再要求新用户在 Community Edition 和 Ultimate Edition 之间做同样的安装选择：

[Install IntelliJ IDEA](https://www.jetbrains.com/help/idea/installation-guide.html)

当前版本提供：

    基础 Java/Kotlin 开发能力：免费使用
    高级功能：可以试用、订阅或使用符合条件的教育许可

### 2. 推荐使用 Toolbox App

JetBrains 官方推荐通过 Toolbox App 安装和管理 IDE。它适合：

- 安装最新稳定版
- 管理多个版本
- 安装或卸载 IDE
- 更新和回滚
- 管理多个 JetBrains 产品

操作步骤：

1. 打开 [Toolbox App](https://www.jetbrains.com/toolbox-app/) 官方页面。
2. 根据系统下载 Windows 或 macOS 版本。
3. 安装并启动 Toolbox。
4. 在产品列表中找到 IntelliJ IDEA。
5. 点击 Install。
6. 如果需要指定版本，打开版本菜单，选择 Available versions。

macOS 用户要注意选择 Intel 或 Apple Silicon 对应的 Toolbox 安装包。

### 3. 也可以独立安装

如果不想使用 Toolbox，可以在 IDEA 下载页选择独立安装包：

- Windows：.exe 安装程序或压缩包
- macOS：.dmg
- Linux：.tar.gz

Windows 安装时可以按需选择：

   创建桌面快捷方式
   添加命令行启动器到 Path
   右键菜单中的 Open Folder as Project
   关联 .java 文件

第一次安装 IDEA 时，可以按下面的原则处理“附加任务”页面：

- `Create Desktop Shortcut`：想从桌面启动 IDEA 就勾选，新手建议勾选。
- `Add "bin" folder to the PATH`：可选。它只影响从命令行启动 IDEA，不影响 Java 的 `JAVA_HOME` 和 `%JAVA_HOME%\bin` 配置。
- `Add "Open Folder as Project"`：建议勾选，之后可以在项目文件夹上右键，直接用 IDEA 打开。
- `.java` 文件关联：可选。勾选后，双击 `.java` 文件会默认使用 IDEA 打开。

这些勾选只属于 IDEA 安装器；JDK 安装器通常只需要确认安装目录并完成安装。macOS 使用 `.dmg` 安装时一般没有同样的 Windows“附加任务”页面，不要把两套流程混在一起。

这些选项不是 Java 环境变量。JAVA_HOME 和项目 JDK 仍然需要单独配置。

### 4. IDEA 自带运行时不等于项目 JDK

JetBrains 官方说明，IDEA 自带 JetBrains Runtime，可以用于运行 IDEA 本身；但开发 Java 应用仍然需要一个独立 JDK：

[Install IntelliJ IDEA](https://www.jetbrains.com/help/idea/installation-guide.html)

因此，即使 IDEA 能正常启动，创建项目时仍然要选择：

    Project SDK = JDK 25

## 七、在 IDEA 中配置项目 JDK

### 1. 创建 Java 项目

打开 IDEA：

1. 点击 New Project。
2. 左侧选择 Java。
3. 填写项目名称，例如 java-learning。
4. 在 JDK 下拉框中选择 JDK 25。
5. 如果列表中没有 JDK，点击 Add JDK。
6. 选择 JDK 的根目录。
7. 构建系统选择 IntelliJ，先不要增加额外复杂配置。
8. 点击 Create。

Windows 选择类似：

    C:\Program Files\Java\jdk-25

macOS 选择：

    /Library/Java/JavaVirtualMachines/jdk-25.jdk/Contents/Home

不要在 IDEA 中选择 bin 子目录。

### 2. 已有项目如何配置

如果是已经打开的项目：

1. 打开 File → Project Structure。
2. 进入 Project。
3. 将 SDK 设置为 JDK 25。
4. 将 Language level 设置为与项目要求一致。
5. 点击 Apply → OK。

官方文档：

[Project Structure Settings](https://www.jetbrains.com/help/idea/project-settings-and-structure.html)

### 3. Maven 或 Gradle 的 JDK

后续学习 Spring Boot 时会使用 Maven 或 Gradle。此时要注意三个版本位置：

    Project SDK
    编译项目使用的 JDK

    Build Tool JVM
    Maven 或 Gradle 执行时使用的 JDK

    JAVA_HOME
    终端默认使用的 JDK

它们最好保持一致。例如都使用 JDK 25。如果项目明确要求 Java 21，就全部切换到 JDK 21。

## 八、运行第一个 Java 程序

### 1. 创建 HelloJava

在 src 目录下创建 Java 类：

    public class HelloJava {
        public static void main(String[] args) {
            System.out.println("Hello Java 25");
        }
    }

点击类左侧的绿色运行按钮，选择 Run HelloJava.main()。

如果控制台输出：

    Hello Java 25

说明 IDEA 的项目 JDK 可以正常工作。

### 2. 用命令行再验证一次

把代码保存为：

    HelloJava.java

进入文件所在目录，执行：

    javac HelloJava.java
    java HelloJava

Windows CMD 中也可以执行同样的命令：

    javac HelloJava.java
    java HelloJava

学习编译过程时，先明确区分：

    javac
    编译

    java
    运行

## 九、申请 JetBrains Student Pack

### 1. 先判断自己是否需要申请

如果只是学习 Java、写普通 Java 程序和跟着 Spring Boot 入门，IntelliJ IDEA 的免费核心功能通常已经够用。

Student Pack 适合：

- 需要使用更多 JetBrains IDE
- 想使用完整的教育版功能
- 学习 Java 之外的 Python、Go、前端等技术
- 学校课程需要 JetBrains 全家桶

官方学生权益入口：

[JetBrains Student Pack](https://www.jetbrains.com/academy/student-pack/)

### 2. 准备 JetBrains Account

申请前准备：

- 一个 JetBrains Account
- 学校邮箱，或其他可接受的学生身份材料
- 学校名称和所在国家/地区
- 当前在读信息

如果没有 JetBrains Account，可以在申请流程中创建。

### 3. 申请流程

打开 Student Pack 页面后：

1. 点击申请或 Request now。
2. 登录 JetBrains Account。
3. 选择学生身份。
4. 填写学校和个人信息。
5. 根据页面提示完成学生身份验证。
6. 等待审核结果。
7. 审核通过后，在 JetBrains Account 中查看教育许可。
8. 回到 IDEA，选择 Help → Register 或 Manage Subscriptions。
9. 使用 JetBrains Account 登录并激活。

可用的验证方式可能包括：

    学校教育邮箱
    ISIC / ITIC 学生卡
    GitHub Student Developer Pack
    其他 JetBrains 页面列出的证明材料

具体方式以申请页面为准，不要相信第三方“代认证”或索要账号密码的服务。

### 4. 学生许可的使用限制

JetBrains 学生许可用于非商业教育目的，例如：

- 课程学习
- 个人练习
- 学术研究
- 学校作业
- 学习项目

不要把学生许可用于公司商业项目、接私活或商业交付。JetBrains 的教育许可页面明确说明，学生许可不能用于商业工作：

[Educational Licenses FAQ](https://sales.jetbrains.com/hc/en-gb/articles/207241195-Do-you-offer-free-educational-licenses-for-students-and-teachers)

Student Pack 通常需要按页面提示续期。续期时重新完成学生身份验证即可。

### 5. 学校邮箱无法认证怎么办

如果学校邮箱不被识别：

1. 确认邮箱仍然有效。
2. 确认学校属于符合条件的教育机构。
3. 尝试使用 ISIC/ITIC 或 GitHub Student Developer Pack。
4. 按 JetBrains 页面提示补充材料。
5. 通过官方支持渠道咨询。

不要为了通过认证提交虚假材料，也不要使用破解补丁或许可证服务器。

### 6. 不建议使用破解激活

网上有些 IDEA 教程会教人使用破解补丁、激活码、许可证服务器或修改 hosts。这些内容存在安全、法律和账号风险，也会让后续更新和排错变得困难。

学习 Java 时，使用 IDEA 免费核心功能、官方试用或合法学生许可即可。

## 十、常见问题排查

### 问题 1：java 不是内部或外部命令

Windows 排查顺序：

1. 关闭旧终端并重新打开。
2. 执行 echo %JAVA_HOME%。
3. 确认 JAVA_HOME 没有写到 bin。
4. 确认 Path 中有 %JAVA_HOME%\bin。
5. 执行 where java。
6. 检查是否有旧 JDK 路径排在前面。

macOS 排查顺序：

    echo "$JAVA_HOME"
    which java
    /usr/libexec/java_home -V

然后确认 ~/.zshrc 已保存并执行：

    source ~/.zshrc

### 问题 2：javac 找不到，但 java 可以

这通常说明找到的是运行时 Java，而不是完整 JDK。检查：

    Windows:
    where java
    where javac

    macOS:
    which java
    which javac

重新安装 JDK，并让 JAVA_HOME 和 Path 指向 JDK 的 bin 目录。

### 问题 3：IDEA 能启动，但项目没有 JDK

IDEA 能启动只说明 JetBrains Runtime 正常。进入：

    File → Project Structure → Project SDK

添加并选择 JDK 25。Windows 选择 JDK 根目录，macOS 选择 Contents/Home。

### 问题 4：命令行是 Java 25，IDEA 却显示 Java 21

分别检查：

    JAVA_HOME
    Project SDK
    Maven/Gradle JVM

IDEA 中打开项目设置，统一选择同一个 JDK。修改后重新打开终端，避免旧进程仍然使用旧环境变量。

### 问题 5：不确定 JAVA_HOME 是否正确

正确示例：

    Windows:
    C:\Program Files\Java\jdk-25

    macOS:
    /Library/Java/JavaVirtualMachines/jdk-25.jdk/Contents/Home

错误示例：

    Windows:
    C:\Program Files\Java\jdk-25\bin

    macOS:
    /Library/Java/JavaVirtualMachines/jdk-25.jdk

Windows 的 JAVA_HOME 不要带 bin；macOS 的 JDK 根目录需要指向 Contents/Home。

### 问题 6：是否必须配置 CLASSPATH

不需要。对于现代 JDK、Maven、Gradle 和 Spring Boot 项目，依赖由构建工具管理。手动配置旧式 CLASSPATH 反而可能导致项目找错类库。

## 十一、最终检查清单

### Windows

    java -version
    javac -version
    echo %JAVA_HOME%
    where java
    where javac

### macOS

    java -version
    javac -version
    echo "$JAVA_HOME"
    which java
    which javac
    /usr/libexec/java_home -V

### IDEA

    IDEA 可以正常启动
    Project SDK 是 JDK 25
    可以运行 HelloJava
    控制台输出 Hello Java 25

### 学生权益

    使用官方 Student Pack 页面申请
    使用真实学生身份验证
    只用于非商业教育用途
    不使用破解激活

## 十二、接下来如何进入 Spring Boot

环境搭好后，不必继续无止境地安装软件。建议按下面的顺序继续：

    Java 基础语法
        ↓
    类、对象、封装、继承、多态
        ↓
    集合、异常、泛型
        ↓
    Maven 与依赖管理
        ↓
    HTTP、JSON、SQL、MySQL
        ↓
    Spring Boot
        ↓
    Spring MVC、MyBatis、登录认证

当你能够：

- 在命令行使用 javac 和 java
- 在 IDEA 中创建并运行 Java 项目
- 看懂 main、变量、方法和类
- 理解 Project SDK 与 JAVA_HOME 的区别

就可以继续学习后面的 Java 基础，再进入 Spring Boot 项目实践。

## 资料来源与参考

本文主要根据以下官方资料整理：

- [Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)
- [Oracle JDK 25 Installation Guide](https://docs.oracle.com/en/java/javase/25/install/)
- [Oracle JDK 25 macOS Installation](https://docs.oracle.com/en/java/javase/25/install/installation-jdk-macos.html)
- [Oracle JDK 25 Windows Installation](https://docs.oracle.com/en/java/javase/25/install/installation-jdk-microsoft-windows-platforms.html)
- [Install IntelliJ IDEA 2026.2](https://www.jetbrains.com/help/idea/installation-guide.html)
- [Register IntelliJ IDEA](https://www.jetbrains.com/help/idea/register.html)
- [Project Structure Settings](https://www.jetbrains.com/help/idea/project-settings-and-structure.html)
- [JetBrains Student Pack](https://www.jetbrains.com/academy/student-pack/)
- [Educational Licenses FAQ](https://sales.jetbrains.com/hc/en-gb/articles/207241195-Do-you-offer-free-educational-licenses-for-students-and-teachers)
- [Spring Boot System Requirements](https://docs.spring.io/spring-boot/system-requirements.html)
- [IDEA安装教程配置java环境（超详细）](https://blog.csdn.net/Libra1313/article/details/156986905)（2026-01-18；用于参考 Windows 安装向导、环境变量和 IDEA 附加任务的操作顺序，本文按新版本重新整理）

中文结构参考：

[滚雪球学Java(04)：JDK、IntelliJ IDEA的安装和环境变量配置](https://developer.cloud.tencent.com/article/2411276?from=15425&frompage=seopage)

这篇文章只用于参考教程组织方式，本文没有转载其正文；其中 JDK 8、旧版 IDEA、传统 CLASSPATH 等内容已根据 2026 年官方资料重新调整。
