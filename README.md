# es6_module

例子使用指南：

1. clone 该项目到本地
2. npm install
3. webpack
4. 用http-server 这样的静态文件服务器或者 python 自带的server跑起来
5. 打开127.0.0.1:8080或者你指定的端口，看看Drone模块和 LowPoly模块效果

## 最近更新：largeSelect 组件
最近完成了一个小组件开发，基于这么个需求：

> 在Chrome和Firefox中原生的select 下拉菜单实现机制不同，Chrome在select添加options的时候就进行渲染（此时UI会处于卡顿状态），Firefox在select下拉的时候才会临时渲染。如果在下拉菜单中有几千上万条记录的时候Chrome会在加载页面时卡顿，Firefox会在下拉时卡顿。

So，为了获得良好的用户体验和Pollyfill浏览器之间的行为差异，需要重写一个select组件，包含以下功能：

- 对options分页，滑动到底部自动翻页
- 提供option内容检索
- 可绑定至块级DOM元素
- 控制滚动翻页的响应频率（debounce）

使用方法（How to use）：
```
for(var j = 0; j< 25600; j ++) {
    testObjs.push({
        'name': "test" + j,
    });
}

var select = new swl.lgSelect({
    options: testObjs,
    title: "Select AO", 
    containerId: "container", // domID 
    pagesize: 50,
});

```
[在线体验 DEMO for large select](https://alex2wong.github.io/es6_module/src/lgselect/)

## 更新，multicanvas 组件
基于多个canvas模拟对焦的组件，受PS多图层启发。
首先你需要把一个场景分割为不同景深的部分，就像assets 文件夹中的multicanvas*.png，之后就可以通过这个组件直接模拟前后景深的变化
```
var mcanv = new MultiCanvas({
    'images': 'assets/MultiCanvas_',
    'imageSuffix': [4,3,2,1],
    'imageType': 'png',
    'focusRange': range,
    'focusLabel': label,
});
// MultiCanvas 类配置所需参数:
// images: String 图片资源的地址前缀
// imageSuffix: Array 图片资源的后缀
// imageType: String 默认png
// focusRange: HtmlElement input[type='range']控件
// focusLabel: HtmlElement label控件用于显示当前的对焦图层。
```
![效果图](https://github.com/alex2wong/es6_module/blob/master/assets/ss.jpg?raw=true)

[DEMO地址](https://alex2wong.github.io/es6_module/focus.html)

## 基于Angular2.x 的WorkTile 仿制
本仓库挂载了不断更新的 WorkTile 仿制版本. **基于Angular2.x** 和自制样式。
访问在线版 [DEMO](http://111.231.11.20:3000/)，所使用的主要技术：

- angular-cli的使用，angular项目框架的快速搭建
- 模板和组件的编写，单页面程序的模块化开发
- 单页面程序的router 基本使用
- 基于angular service 的前端数据缓存
- 基于Flex的自适应页面布局

