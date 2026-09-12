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

### 2.2 如果下载的是传统 Windows 安装器

Python 官方当前更推荐 Python Install Manager，但下载页仍可能出现传统的 Windows 安装程序。它的安装界面更像很多教程里的“勾选 PATH”流程。如果你下载的是 .exe 安装器，重点看下面这些选项。

#### 第一个安装页面

安装器打开后，通常会看到：

| 选项 | 第一次安装的建议 | 作用 |
| --- | --- | --- |
| Install Now | 适合想快速安装的人 | 使用默认目录和默认组件 |
| Customize installation | 想看清组件或自定义目录时选择 | 进入详细安装流程 |
| Add python.exe to PATH | 建议勾选 | 把 Python 和 Scripts 目录加入当前用户的 PATH |
| Use admin privileges when installing py.exe | 个人电脑通常可以不勾选 | 是否用管理员权限安装 py 启动器 |

最容易漏掉的是 Add python.exe to PATH。建议第一次安装时勾选它，这样安装结束后可以直接在 CMD、PowerShell 和 PyCharm Terminal 中使用 python 和 pip。这个选项只负责命令查找，不等于创建项目虚拟环境。

如果你已经安装过 Python，先不要直接覆盖旧版本。可以先取消安装，执行 where python 和 py list，确认电脑里有哪些版本，再决定使用 Install Manager、传统安装器，还是保留现有版本。

#### 选择 Customize installation 后

在 Optional Features 页面，第一次学习通常保留下面这些选项：

| 组件 | 建议 | 说明 |
| --- | --- | --- |
| Documentation | 勾选 | 安装本地 Python 文档 |
| pip | 必须勾选 | 安装和管理第三方包 |
| tcl/tk and IDLE | 建议勾选 | 使用 IDLE 和 tkinter 时需要 |
| Python test suite | 可不勾选 | 普通学习和项目开发暂时用不到 |
| py launcher | 建议勾选 | 方便管理多个 Python 版本 |
| for all users | 按需 | 是否允许电脑上的所有用户使用，不是所有人都需要 |

点击 Next 进入 Advanced Options 后，重点检查：

| 选项 | 建议 |
| --- | --- |
| Install for all users | 个人电脑一般不勾选；需要所有 Windows 用户共用且拥有管理员权限时再勾选 |
| Add Python to environment variables | 建议勾选 |
| Precompile standard library | 可以保留默认值 |
| Download debugging symbols / debug binaries | 普通学习不需要 |

安装目录可以使用默认目录。若自定义目录，建议记住 Python 根目录，例如：

~~~text
C:\Users\你的用户名\AppData\Local\Programs\Python\Python314
~~~

不要把 PATH 配成 Python 根目录之外的随机目录。传统安装器通常会把 Python 根目录和 Scripts 目录一并加入 PATH；安装完成后仍然要用 where python 和 python -m pip --version 验证实际结果。

### 2.3 Windows 的命令区别

- python：启动当前默认 Python，日常运行脚本和创建虚拟环境时最常用。
- py：适合管理多个 Python 版本，例如 py -V:3.14 可以指定一个运行时。
- pymanager：Python Install Manager 的明确命令名称，适合脚本或需要避免和旧版 py.exe 混淆的场景。
- py list：列出 Python Install Manager 能看到的运行时。

普通学习项目不需要记住所有参数。先保证 python --version、py --version 和 py list 能给出合理结果，再进入虚拟环境。

### 2.4 Windows 的 PATH 与执行别名

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

### 2.5 Windows 全局环境变量：PATH、用户变量与系统变量

这里要把四个概念分开：

| 概念 | 生效范围 | Python 学习中的处理方式 |
| --- | --- | --- |
| 当前终端变量 | 只对当前 CMD、PowerShell 窗口生效 | 适合临时测试，关掉窗口就失效 |
| 用户变量 | 当前 Windows 用户长期生效 | 个人电脑优先配置这里 |
| 系统变量 | 电脑上的所有用户长期生效 | 只有明确需要所有用户共用时才配置 |
| 项目虚拟环境 | 只服务一个项目 | 第三方包优先放在 .venv，不要污染全局 Python |

#### 推荐的配置原则

1. 个人学习电脑优先修改“用户变量”中的 Path。
2. 只有在电脑由多人共用，或管理员明确要求时，才修改“系统变量”中的 Path。
3. 修改 Path 时点击“新建”追加目录，不要把原来的整行内容全部覆盖。
4. Python 通常不要求设置 PYTHON_HOME。先把 PATH 和项目 .venv 配好，比照搬 Java 的 JAVA_HOME 更合适。
5. 普通项目不要设置 PYTHONPATH。它会额外改变模块搜索路径，容易让“本机能运行、换电脑就报错”或导入了错误版本的包。

#### 通过 Windows 图形界面永久配置

1. 按 Win + S，搜索“编辑账户的环境变量”。
2. 打开“编辑账户的环境变量”。
3. 点击“环境变量”。
4. 在“用户变量”区域选中 Path，点击“编辑”。
5. 点击“新建”，只添加实际存在的目录。
6. 点击“确定”保存所有窗口。
7. 关闭并重新打开 CMD、PowerShell、Windows Terminal 和 PyCharm Terminal。

根据安装方式，可能需要检查这些目录：

~~~text
%UserProfile%\AppData\Local\Microsoft\WindowsApps
%LocalAppData%\Python\bin
传统安装器的 Python 根目录
传统安装器的 Python 根目录\Scripts
~~~

不要把上面四项不加判断地全部添加。Install Manager、传统安装器和 Windows 应用执行别名使用的目录不同，以 where python、where py 和 py list 的结果为准。

#### 临时变量和永久变量的区别

PowerShell 中直接执行下面的命令，只对当前窗口生效：

~~~powershell
$env:PYTHON_LEARNING = "true"
$env:Path += ";C:\Tools\Python"
~~~

关闭窗口后，这些设置就会消失。若确实需要为当前用户永久保存自定义变量，可以使用：

~~~powershell
[Environment]::SetEnvironmentVariable("PYTHON_LEARNING", "true", "User")
~~~

对于 Path，初学者更推荐使用上面的图形界面追加目录，因为直接写入 Path 时很容易误覆盖原有配置。可以先查看用户 Path：

~~~powershell
[Environment]::GetEnvironmentVariable("Path", "User")
~~~

#### 配置后这样验收

新开一个 PowerShell 窗口，执行：

~~~powershell
$env:Path -split ";"
where python
where py
python --version
python -m pip --version
py list
~~~

如果 where python 显示多个路径，Windows 会使用排在前面的那个。不要只看版本号，还要确认路径确实是你希望使用的安装。进入项目后，再创建 .venv，让第三方包与全局安装隔离。

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

### 3.2 macOS 全局环境变量与 PATH

macOS 中通常把“全局变量”理解为对当前用户的 shell 持久生效的环境变量。个人学习时优先配置用户自己的 ~/.zshrc，不要一开始就修改 /etc/paths 或其他系统级文件。

#### 先确认 Homebrew 的实际目录

如果使用 Homebrew，先执行：

~~~bash
brew --prefix
~~~

Apple Silicon Mac 通常是 /opt/homebrew，Intel Mac 通常是 /usr/local，但应以命令实际输出为准。

#### 永久追加 PATH

编辑当前用户的 zsh 配置：

~~~bash
nano ~/.zshrc
~~~

根据 brew --prefix 的结果，在文件末尾加入对应的一行。Apple Silicon 示例：

~~~bash
export PATH="/opt/homebrew/bin:$PATH"
~~~

Intel 示例：

~~~bash
export PATH="/usr/local/bin:$PATH"
~~~

保存后让配置立即生效：

~~~bash
source ~/.zshrc
~~~

不要把 /usr/bin/python3 从 PATH 中删除，也不要为了“统一版本”去覆盖系统目录。先用 which python3、type -a python3 和 Python 的 sys.executable 确认当前解释器。

#### 自定义变量和 PYTHONPATH

如果只是想测试环境变量，可以在当前终端执行：

~~~bash
export PYTHON_LEARNING=true
echo "$PYTHON_LEARNING"
~~~

想让它长期对当前用户生效，再把 export PYTHON_LEARNING=true 写入 ~/.zshrc。普通 Python 项目不建议把项目源码目录写进 PYTHONPATH；使用项目 .venv、清晰的包结构和 PyCharm 解释器配置更容易复现。

从 Dock 启动的 PyCharm 不一定继承你在 Terminal 中临时设置的变量。因此，项目解释器仍然要在 PyCharm 的设置中明确选择，不能只依赖 PATH。

#### macOS 配置验收

重新打开 Terminal，执行：

~~~bash
echo "$PATH" | tr ":" "\n"
type -a python3
python3 --version
python3 -m pip --version
python3 -c "import sys; print(sys.executable)"
~~~

如果输出中包含多个 python3，选择路径正确的那个作为项目 Base interpreter；项目依赖仍然安装到 .venv。

### 3.3 方式二：Homebrew

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

## 5. 安装并配置 PyCharm

### 5.1 安装 PyCharm 时的勾选

从 JetBrains 官方页面下载 PyCharm。Python 解释器需要单独安装，PyCharm 自己不能替代 Python。

Windows 使用 .exe 安装器时，安装向导可能出现这些附加选项：

| 选项 | 建议 | 作用 |
| --- | --- | --- |
| Create Desktop Shortcut | 想从桌面启动就勾选 | 创建桌面快捷方式 |
| Add launchers directory to the PATH | 可选 | 允许从终端启动 PyCharm，不影响 Python 的 PATH |
| Update context menu | 建议勾选 | 右键文件夹时可以用 PyCharm 打开 |
| Create associations for .py | 建议勾选 | 双击 .py 文件时默认用 PyCharm 打开 |
| Download and install 32-bit launcher | 通常不需要 | 只有明确使用 32 位工具链时再考虑 |

选项名称可能随 PyCharm 版本略有变化。不要把 Add launchers directory to the PATH 当成 Add Python to PATH；前者是 PyCharm 的启动命令，后者才是 Python 安装器的环境变量配置。

macOS 使用 .dmg 安装时，一般是把 PyCharm 拖入 Applications，不会出现同样的 Windows 附加任务页面。首次启动时允许访问项目目录即可，Python 解释器在后面的项目设置中选择。

### 5.2 新建项目时创建虚拟环境

打开 PyCharm，新建项目时在 Python Interpreter 区域选择项目虚拟环境。推荐让 PyCharm 在项目目录中创建 .venv，并选择已经安装好的 Python 3.14 解释器作为 Base interpreter。

这样创建出来的项目会把代码和依赖放在清晰的位置：

~~~text
my-python-project/
├── .venv/
└── main.py
~~~

### 5.3 为已有项目选择解释器

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

### 5.4 用 PyCharm 运行和调试

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
| 修改 PATH 后当前终端没变化 | 关闭并重新打开终端和 PyCharm；已经运行的程序不会自动读取新变量 |
| 配置 PYTHONPATH 后 import 变乱 | 删除不必要的 PYTHONPATH，改用项目 .venv 和正确的包结构 |
| PyCharm 没有可选解释器 | 先在终端确认 Python 可用，再通过 Add Interpreter 添加本地解释器 |
| 多个 Python 版本互相混淆 | Windows 使用 py list，macOS 使用 which python3，然后为每个项目单独创建 .venv |

## 7. 环境验收清单

完成后可以逐项确认：

- [ ] Windows 或 macOS 终端能够显示 Python 版本；
- [ ] Windows 使用 where python，或 macOS 使用 type -a python3，确认实际解释器路径；
- [ ] 新开终端后 PATH 仍然有效，没有覆盖原有 PATH；
- [ ] 当前项目存在 .venv；
- [ ] python -m pip list 显示的是项目环境中的包；
- [ ] PyCharm 使用项目内的 .venv 解释器；
- [ ] hello.py 能运行，也能在断点处暂停；
- [ ] 没有为普通项目随意设置 PYTHONPATH；
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
