---
title: Python 环境配置：Windows、macOS 与 PyCharm
description: 介绍 Python 在 Windows 和 macOS 上的安装、版本验证、虚拟环境、pip 与 PyCharm 项目解释器配置。
date: 2026-09-12
category: 学习
tag:
  - Python
  - PyCharm
  - 虚拟环境
  - 环境配置
author: 韩子阳
---

# Python 环境配置：Windows、macOS 与 PyCharm

学习 Python 的第一步不是马上安装一堆第三方库，而是先确认三件事：系统能找到正确的 Python、项目有独立的虚拟环境、PyCharm 使用的解释器和终端里使用的是同一个环境。

本文分别介绍 Windows 和 macOS 的安装方式。当前 Python 官方下载页显示 Python 3.14.7 是最新稳定补丁版本，但版本会持续更新，实际安装时应以 Python 官方下载页显示的稳定版本为准。若某个项目明确要求 Python 3.13 或更低版本，应优先遵循项目依赖的兼容范围。

## 1. 先理解几个名称

| 名称 | 作用 |
| --- | --- |
| Python 解释器 | 读取并执行 .py 文件的程序 |
| python / python3 | 启动某个默认 Python 解释器的命令 |
| pip | 安装 Python 包的工具 |
| 虚拟环境 | 为一个项目隔离解释器和第三方依赖的目录 |
| PyCharm | 面向 Python 开发的 IDE，提供编辑、运行、调试和项目管理 |

需要特别记住：PyCharm 不是 Python 解释器，安装 PyCharm 不等于安装 Python。PyCharm 的官方文档也要求先为项目配置一个 Python interpreter。

## 2. Windows 安装 Python

Python 3.14 的 Windows 官方文档已经把 Python Install Manager 作为推荐获取方式。它可以从 Python 官方 Windows 下载页或 Microsoft Store 安装。

### 2.1 使用 Python Install Manager

1. 打开 Python 官方 Windows 下载页，下载 Python Install Manager，或者在 Microsoft Store 搜索并安装它。
2. 安装完成后重新打开 PowerShell 或 Windows Terminal。
3. 安装一个稳定的 Python 运行时。可以明确安装 3.14 系列：

~~~powershell
py install 3.14
~~~

如果只想使用默认稳定版本，也可以直接输入 python，但在多版本环境中更推荐用 py 查看和选择版本。

4. 检查当前安装的运行时：

~~~powershell
python --version
py --version
py list
~~~

5. 执行一段最小代码：

~~~powershell
python -c "print('Python Windows 环境正常')"
~~~

看到 Python 版本和中文提示，就说明命令已经可以被终端找到。

### 2.2 Windows 的命令区别

- python：启动当前默认 Python，日常运行脚本和创建虚拟环境时最常用。
- py：适合管理多个 Python 版本，例如 py -V:3.14 可以指定一个运行时。
- pymanager：Python Install Manager 的明确命令名称，适合脚本或需要避免和旧版 py.exe 混淆的场景。
- py list：列出 Python Install Manager 能看到的运行时。

普通学习项目不需要记住所有参数。先保证 python --version、py --version 和 py list 能给出合理结果，再进入虚拟环境。

### 2.3 Windows 的 PATH 与执行别名

安装 Python 时，Install Manager 可能会询问是否把全局别名目录加入 PATH。默认目录通常是：

~~~text
%LocalAppData%\Python\bin
~~~

如果安装后终端找不到 python 或某个全局脚本，可以：

1. 关闭并重新打开终端，让新的环境变量生效；
2. 在开始菜单搜索“编辑账户的环境变量”，检查用户 PATH；
3. 打开 Windows 的“应用执行别名”设置，确认没有被旧的 Microsoft Store 别名截获；
4. 再运行 where python、where py，确认命令实际来自哪里。

如果电脑上已经使用传统 Python 安装器，也不必为了迁移而删除旧版本。先查看 where python 和 py list 的结果，确定项目要使用哪个解释器，再在 PyCharm 中明确选择它。

## 3. macOS 安装 Python

macOS 通常能找到一个 /usr/bin/python3，但它可能属于 Apple 的开发工具链。它和我们为项目安装的 Python 不是同一个东西，不要删除或覆盖 /usr/bin/python3。

macOS 常见有两种安装方式：python.org 官方安装器和 Homebrew。第一次学习 Python 时选一种即可，不要在同一台电脑上无目的地重复安装多个发行版。

### 3.1 方式一：python.org 官方安装器

1. 打开 Python Releases for macOS。
2. 下载当前稳定版本的 macOS installer。官方安装器通常会根据芯片提供通用安装包，适合 Apple Silicon 和 Intel Mac。
3. 按向导完成安装。安装完成后，可以在应用程序中看到对应的 Python 文件夹，其中包含 IDLE、Python Launcher 和证书安装脚本。
4. 首次安装后运行 Install Certificates.command，让这套 Python 使用正确的 SSL 根证书。
5. 重新打开终端并验证：

~~~bash
which python3
python3 --version
python3 -m pip --version
python3 -c "print('Python macOS 环境正常')"
~~~

which python3 用来确认当前命令实际指向哪里。如果它指向的是 /usr/bin/python3，说明系统路径排在前面，需要根据所选安装方式调整 PATH，或者直接在 PyCharm 中选择目标解释器。

### 3.2 方式二：Homebrew

如果平时已经使用 Homebrew 管理开发工具，可以使用：

~~~bash
brew update
brew install python
~~~

安装后重新打开终端，检查：

~~~bash
which python3
python3 --version
python3 -m pip --version
~~~

Homebrew 会随着公式更新 Python。项目长期维护时，仍然应该使用 .venv 固定项目依赖，并在项目文档中写清楚所需的 Python 主版本。

## 4. 为项目创建虚拟环境

全局 Python 适合启动解释器，项目依赖则应该放在项目自己的虚拟环境里。这样 Django、requests 或测试工具不会互相污染，也不会因为另一个项目升级了包而突然失效。

### 4.1 Windows PowerShell

在项目根目录打开 PowerShell：

~~~powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install requests
python -m pip list
~~~

激活成功后，命令行前面通常会出现 (.venv)。结束当前终端会话前可以退出：

~~~powershell
deactivate
~~~

如果 PowerShell 因执行策略阻止激活脚本，可以先使用 Command Prompt 激活：

~~~bat
.venv\Scripts\activate.bat
~~~

也可以在确认理解风险后，仅为当前用户设置允许本地脚本的策略：

~~~powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
~~~

### 4.2 macOS Terminal

在项目根目录打开 Terminal：

~~~bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install requests
python -m pip list
~~~

验证当前终端使用的是虚拟环境：

~~~bash
which python
python --version
python -c "import sys; print(sys.executable)"
~~~

退出虚拟环境：

~~~bash
deactivate
~~~

激活虚拟环境后通常可以统一使用 python。python -m pip 会让 pip 跟随当前解释器，比直接输入一个可能指向别处的 pip 更不容易装错环境。

### 4.3 不要提交 .venv

虚拟环境包含解释器链接、平台相关文件和已安装包，不能作为跨平台源码提交。项目根目录的 .gitignore 至少应包含：

~~~gitignore
.venv/
__pycache__/
*.py[cod]
~~~

依赖应该通过 requirements.txt 或 pyproject.toml 描述，而不是提交整个 .venv 文件夹。

## 5. 在 PyCharm 中配置项目

### 5.1 新建项目时创建虚拟环境

打开 PyCharm，新建项目时在 Python Interpreter 区域选择项目虚拟环境。推荐让 PyCharm 在项目目录中创建 .venv，并选择已经安装好的 Python 3.14 解释器作为 Base interpreter。

这样创建出来的项目会把代码和依赖放在清晰的位置：

~~~text
my-python-project/
├── .venv/
└── main.py
~~~

### 5.2 为已有项目选择解释器

Windows 的路径通常是：

~~~text
项目目录\.venv\Scripts\python.exe
~~~

macOS 的路径通常是：

~~~text
项目目录/.venv/bin/python
~~~

在 Windows 中打开：

~~~text
File > Settings > Project > Python Interpreter
~~~

在 macOS 中打开：

~~~text
PyCharm > Settings/Preferences > Project > Python Interpreter
~~~

选择 Add Interpreter 或已有解释器，然后指向项目内的 .venv。配置后，在 PyCharm 的 Python Console、运行配置和 Terminal 中都检查一次当前解释器。

### 5.3 用 PyCharm 运行和调试

新建 hello.py：

~~~python
import sys

print("Hello, Python")
print(sys.executable)
~~~

点击运行按钮，确认输出的 sys.executable 位于项目的 .venv 中。再在 print 行左侧设置断点，点击 Debug，确认调试器能够停住。能运行、能看到正确解释器、能命中断点，才算 PyCharm 配置完成。

## 6. 常见问题

| 现象 | 排查方式 |
| --- | --- |
| python 不是命令 | 重开终端，检查 where python，处理 PATH 或 Windows 应用执行别名 |
| macOS 找到的是 /usr/bin/python3 | 不要删除它；用 which python3 检查 PATH 顺序，并在 PyCharm 中直接选目标解释器 |
| pip install 后 PyCharm 仍然报红 | 在 PyCharm 中确认项目解释器与安装包所用的 .venv 是同一个 |
| 包安装到了错误位置 | 激活 .venv 后使用 python -m pip show 包名和 python -c 检查 sys.executable |
| PowerShell 无法运行激活脚本 | 使用 activate.bat，或仅对当前用户设置 RemoteSigned 后重开终端 |
| PyCharm 没有可选解释器 | 先在终端确认 Python 可用，再通过 Add Interpreter 添加本地解释器 |
| 多个 Python 版本互相混淆 | Windows 使用 py list，macOS 使用 which python3，然后为每个项目单独创建 .venv |

## 7. 环境验收清单

完成后可以逐项确认：

- [ ] Windows 或 macOS 终端能够显示 Python 版本；
- [ ] 当前项目存在 .venv；
- [ ] python -m pip list 显示的是项目环境中的包；
- [ ] PyCharm 使用项目内的 .venv 解释器；
- [ ] hello.py 能运行，也能在断点处暂停；
- [ ] .venv/ 已加入 .gitignore。

## 8. 官方资料与参考

- [Python 官方下载页](https://www.python.org/downloads/)
- [Python Releases for Windows](https://www.python.org/downloads/windows/)
- [Python Releases for macOS](https://www.python.org/downloads/macos/)
- [Using Python on Windows](https://docs.python.org/3.14/using/windows.html)
- [Using Python on macOS](https://docs.python.org/3.14/using/mac.html)
- [Python Packaging User Guide：venv 与 pip](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
- [PyCharm：Configure a Python interpreter](https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html)
- [用户提供的 CSDN DevPress 参考文章](https://devpress.csdn.net/awstech/6a473b2a10ee7a33f2874831.html)

网页内容和版本会变化。遇到本文与官方页面不一致时，以官方页面和项目自身的依赖要求为准。
