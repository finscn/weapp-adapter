# weapp-adapter
weapp-adapter of Wechat Tiny Game in ES6

----

微信小游戏官方提供了一个`weapp-adapter`的示例文件.
(关于什么是 weapp-adapter 详见: https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/base/adapter.html )

本项目则是一个改良的`weapp-adapter`, 基于ES6.

----
## 改良内容

* 修改 HTMLImageElement / HTMLCanvasElement / HTMLVideoElement 的实现。可通过 instanceof 检测
* 导出 TouchEvent, 并解除循环依赖
* 添加 MoustEvent (开发工具里需要)
* XMLHttpRequest 继承 EventTarget
* 添加 document.createElementNS
* 为 canvas 添加 EventTarget特性 与 style
* 为 canvas 添加 clientWidth/clientHeight
* 针对 Pixi.js、Three.js、Phaser 等流行框架做适配 (WIP)


----
## 使用方法

将`src`下的文件放入小游戏项目中(例如 放入 js/libs/weapp-adapter 目录内)

在需要使用`weapp-adapter`的文件内使用下列代码引入即可.

```
import './js/libs/weapp-adapter/index.js'
```

----

#### 注意:

* 按ES6语法, 理论上可以使用 `import './js/libs/weapp-adapter/`
(不加index.js), 但是实际真机测试发现有些时候不行.
* 本项目没有提供 webpack 编译脚本, 建议直接引用源代码。然后让微信小游戏引擎自己进行编译、压缩、转换。这样其实代码包体积比自行编译还要小一些。

