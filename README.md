# weapp-adapter
weapp-adapter of Wechat Tiny Game in ES6

----

微信小游戏官方提供了一个`weapp-adapter`的示例文件.
(关于什么是 weapp-adapter 详见: https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/base/adapter.html )

本项目则是一个改良的`weapp-adapter`, 基于ES6.

----
## 改良内容

* 修改 HTMLImageElement / HTMLCanvasElement / HTMLVideoElement 的实现。可通过 instanceof 检测
* 导出全局 TouchEvent, 并解除循环依赖
* 添加全局 伪MoustEvent (开发工具里需要)
* 添加全局 伪WebGLRenderingContext
* XMLHttpRequest 继承 EventTarget
* 添加 document.createElementNS
* 为 canvas 添加 EventTarget特性 与 style
* 为 canvas 添加 clientWidth/clientHeight
* 针对 PixiJS、ThreeJS、Phaser 等流行框架做适配 (WIP)

----

## 微信小游戏引擎 已知问题
（只列出比较严重的、且难以通过hack手段解决的问题）

* Android下的WebGL不支持`OES_vertex_array_object `扩展，但是执行`gl.getExtension("OES_vertex_array_object")`时返回的却不是`null/undefined`，而是一个非空的对象。导致引擎在判读能否使用OESVao时产生错误。
* Android下的WebGL不支持`stencil` ( `gl.getContextAttributes().stencil === 0` )。这导致 PixiJS 无法正常使用WebGL模式。虽然通过一些比较丑陋的hack，可以让程序运行，但是涉及到 Filter、Mask、Graphics 的功能无法正常使用。在使用ThreeJS的一些高级功能也无法正常使用。
* 获取 WebGLRenderContext的信息（antialias、preserveDrawingBuffer、stencil）时，本应该是`布尔类型`，返回的却是数值 1/0, 而不是 true/false （例如 ）。导致使用严格判断（ === ）时，出现错误。
* 无法正确取得WebGL的版本。导致使用 ThreeJS时，Android下直接报错（Cannot read '1' of null），iOS下取得的版本号有错。


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

