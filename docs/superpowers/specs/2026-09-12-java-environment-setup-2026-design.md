# 2026 Java 开发环境搭建教程设计

## 目标

在博客的“学习 / Java”目录下新增一篇面向 Java 和 Spring Boot 初学者的开发环境搭建教程。教程以 Windows 为主，同时提供完整的 macOS 安装、环境变量和验证步骤，内容按 2026 年的 JDK、IntelliJ IDEA 与 JetBrains 学生权益重新整理。

## 受众与范围

- 面向第一次安装 Java 开发环境的学习者。
- Windows 是主线，覆盖 JDK 安装、`JAVA_HOME`、`Path`、版本验证、IDEA 安装和项目 SDK 配置。
- macOS 是重要支线，覆盖 Intel 与 Apple Silicon 的安装包选择、`zsh` 环境变量、`java_home` 和版本验证。
- 包含 IDEA 2026.2 的安装方式、创建第一个 Java 项目、运行 Hello World。
- 包含 JetBrains Student Pack 的申请入口、认证方式、使用限制和无法认证时的替代方案。
- 只对 Linux 给出简短提示，不展开为第三套完整教程，以控制文章长度和维护成本。
- 不复制第三方文章原文；第三方文章只作为结构参考，正文以官方文档和原创说明为准。

## 版本策略

教程以 2026-09-12 可访问的官方资料为依据：

- JDK 25 作为新项目和本学习路线的推荐版本。Oracle 当前将 JDK 25 标为最新 LTS，并提供 Windows、macOS 和 Linux 安装包。
- JDK 21 作为旧项目或课程要求时的兼容选项。
- Spring Boot 4.1.1 至少需要 Java 17，兼容 Java 26，因此 JDK 25 满足后续 Spring Boot 学习的版本要求。
- IntelliJ IDEA 2026.2 采用统一产品形态，基础 Java/Kotlin 开发能力可免费使用；需要完整高级功能时再说明 Ultimate/学生权益。
- 所有下载链接优先使用官方长期入口，不把易失效的具体补丁包 URL 写死在正文中。

## 文章结构

1. 先看结论：推荐版本、软件下载入口和完成后的验证目标。
2. 准备工作：确认 Windows 64 位或 Mac Intel/Apple Silicon 架构，清理旧 JDK 冲突的注意事项。
3. Windows 安装 JDK 25：下载安装包、安装路径、`JAVA_HOME`、`Path`、新终端生效和 `java`/`javac` 验证。
4. macOS 安装 JDK 25：DMG 选择、安装位置、`~/.zshrc` 配置、`/usr/libexec/java_home -v 25` 和验证。
5. 多版本与常见冲突：`where java`、`which java`、IDEA 项目 SDK 和终端 Java 不一致时的排查；明确不需要配置 `CLASSPATH`。
6. 安装 IntelliJ IDEA 2026.2：Toolbox 推荐方式、独立安装方式、首次启动和项目 SDK 选择。
7. 创建第一个 Java 项目：运行 Hello World，确认 IDE 和命令行使用的是同一个 JDK。
8. 申请 JetBrains Student Pack：申请入口、学校邮箱/ISIC/ITIC/GitHub Student Developer Pack、续期和非商业使用限制；说明只学习 Java 时可直接使用 IDEA 免费核心功能。
9. 常见问题：`java`/`javac` 找不到、IDEA 没有 JDK、版本过低、学生认证失败、误用破解激活。
10. 最终检查清单与后续 Spring Boot 学习建议。
11. 资料来源：Oracle JDK 25 下载与安装文档、JetBrains IDEA 安装/注册文档、JetBrains Student Pack、Spring Boot 系统要求，以及一篇结构完整的中文参考文章。

## 关键写作原则

- 每个系统都先说明“做什么”，再给操作步骤和验证命令。
- Windows 步骤使用图形界面名称和可复制的变量值；macOS 步骤使用可复制的 `zsh` 命令。
- `JAVA_HOME` 指向 JDK 根目录，不拼接 `bin`；`Path` 只追加对应的 `bin` 目录。
- 不建议新手配置旧式 `CLASSPATH`，避免把 JDK 8 时代的过时教程带入新环境。
- 学生许可只说明合法申请和非商业教育用途，不提供破解、激活码或许可证服务器内容。
- 对可能变化的版本和许可信息注明“以官方页面当前显示为准”。

## 验收标准

- 文章位于 `docs/posts/learning/java/`，frontmatter 使用 `category: 学习`，标签至少包含 `Java`、`JDK`、`IntelliJ IDEA`、`Spring Boot`。
- Windows 和 macOS 两套步骤都能从下载入口走到 `java -version`、`javac -version` 验证。
- 文章明确解释 IDEA 自带 JetBrains Runtime 与开发 Java 所需独立 JDK 的区别。
- 文章包含学生申请入口和合法使用限制。
- 所有外部链接指向官方页面或明确标注的参考文章。
- `pnpm docs:generate` 能发现新文章，`pnpm docs:build` 成功且不产生 Markdown 代码块渲染问题。
- 变更范围只包含本文章、必要的目录说明/导航文字和本设计记录。

## 资料来源

- [Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)
- [Oracle JDK 25 Installation Guide](https://docs.oracle.com/en/java/javase/25/install/)
- [Oracle JDK 25 macOS Installation](https://docs.oracle.com/en/java/javase/25/install/installation-jdk-macos.html)
- [Oracle JDK 25 Windows Installation](https://docs.oracle.com/en/java/javase/25/install/installation-jdk-microsoft-windows-platforms.html)
- [Install IntelliJ IDEA 2026.2](https://www.jetbrains.com/help/idea/installation-guide.html)
- [Register IntelliJ IDEA](https://www.jetbrains.com/help/idea/register.html)
- [JetBrains Student Pack](https://www.jetbrains.com/academy/student-pack/)
- [Spring Boot System Requirements](https://docs.spring.io/spring-boot/system-requirements.html)
- [滚雪球学Java(04)：JDK、IntelliJ IDEA的安装和环境变量配置](https://developer.cloud.tencent.com/article/2411276?from=15425&frompage=seopage)（结构参考，正文不转载）
