# dxprober.js
舞萌 DX 查分器数据导入插件
### 需求
- 支持 MitM 的代理软件（`Quantumult X`、`Loon`、`Surge`等）
- iOS 设备（主要是因为 Android 下没找到类似软件）
### 使用方法
使用 MitM 功能将公众号“我的记录”页中 `<head>` 标签替换为如下代码即可
```html
<head>
<script>var u = "USERNAME"; var p = "PASSWORD";</script>
<script src="https://github.com/realZnS/dxprober.js/raw/main/dxprober.js"></script>
```
