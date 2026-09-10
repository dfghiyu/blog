---
title: AtCoder ABC421 A：Misdelivery
description: 用数组下标和字符串比较，判断包裹是否送到了正确的房间。
date: 2026-09-10
category: 学习
tag:
  - ACM
  - C++
  - Python
  - 字符串
author: 韩子阳
---

# AtCoder ABC421 A：Misdelivery

题目链接：[ABC421 A - Misdelivery](https://atcoder.jp/contests/abc421/tasks/abc421_a)

## 题意

AtCoder 公寓有 `N` 个房间，第 `i` 个房间住着名字为 `S_i` 的人。

现在有一个寄给 `X` 号房间、收件人名字为 `Y` 的包裹，需要判断收件人和房间是否匹配：

- 如果 `X` 号房间住户的名字是 `Y`，输出 `Yes`；
- 否则输出 `No`。

## 解题思路

房间编号从 `1` 开始，而 C++ 和 Python 的数组下标从 `0` 开始，所以 `X` 号房间对应的数组元素是 `S[X - 1]`。

直接比较 `S[X - 1]` 和 `Y` 即可，不需要遍历所有房间。即使不同房间住着同名的人，也只需要检查目标房间。

## C++ 实现

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<string> S(N);
    for (int i = 0; i < N; ++i) {
        cin >> S[i];
    }

    int X;
    string Y;
    cin >> X >> Y;

    cout << (S[X - 1] == Y ? "Yes" : "No") << '\n';
    return 0;
}
```

## Python 实现

```python
n = int(input())
names = [input().strip() for _ in range(n)]
x, y = input().split()

print("Yes" if names[int(x) - 1] == y else "No")
```

Python 版本中的 `int(x) - 1` 和 C++ 版本中的 `X - 1` 一样，都是把题目中的房间编号转换成数组下标。

## 复杂度分析

读取住户姓名需要 `O(N)` 的时间和 `O(N)` 的空间；比较目标房间只需要 `O(1)` 的时间。

如果把输入过程也算进去，整体复杂度为：

- 时间复杂度：`O(N)`
- 空间复杂度：`O(N)`

## 易错点

### 1. 忘记把房间编号减一

题目中的 `X` 是从 `1` 开始的房间编号，数组中的下标从 `0` 开始访问，因此必须使用 `X - 1`。

### 2. 不需要查找同名的人

题目只问 `X` 号房间的住户，不能因为其他房间也有同名的人就判定为正确。

### 3. 输出大小写要完全一致

答案必须输出 `Yes` 或 `No`，不能写成 `YES`、`yes` 或其他形式。

## 小结

这道题主要练习输入处理、数组下标转换和字符串比较。实现本身很直接，但“题目编号从 1 开始、程序下标从 0 开始”是这类题里最常见的细节。
