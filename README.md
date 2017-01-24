# es6_module

例子使用指南：

1. clone 该项目到本地
2. npm install
3. webpack
4. 用http-server 这样的静态文件服务器或者 python 自带的server跑起来
5. 打开127.0.0.1:8080或者你指定的端口，看看Drone模块和 LowPoly模块效果

## 附件（基于angular-cli 两天的开发结果）
本仓库挂载了不断更新的 WorkTile 仿制版本. **基于Angular2.x** 和自制样式。
访问在线版 [DEMO](http://123.206.201.245:3000/)，主要技术点：

- angular-cli的使用，angular项目框架的快速搭建
- 模板和组件的编写，单页面程序的模块化开发
- 单页面程序的router 基本使用
- 基于angular service 的前端数据缓存

### ES6转码打包

由于大部分浏览器还没有支持ES6 模块，所以可采用**Babel 转
码** 来把我们的代码转化为es5.
> 然后用 **Webpack 打包**所有js文件 为一个bundle ，也可以采用**SystemJS**的依赖管理方案，**实现浏览器端的模块加载**。

由于之前在Angular的 实践过程中采用的是 SystemJS，所以这次把两种方法都讨论演示下。需要说明的是，这两种浏览器端加载es6模块的方法都需要**Babel**的支持，根据具体情况可选用 Webpack 或SystemJS。

#### 模块编写过程
 
比如我们现在有 **drone 和 bullet** 两个类，drone 可以通过fire() 方法创建bullet 实例，并且通过一个全局的 RenderBullet 方法计算bullet 轨迹。

就这么简单的需求，因为drone 和bullet 在我们的游戏应用中是 基础类，所以单独写成模块。**常数变量**至于const.js 中。
```
// drone.js
import Const from './const';
import Bullet from './bullet';

/**
 * Drone class with control method.
 */
export default class Drone {
    constructor(opts) {
        this.id;
        this.speed = opts.speed ? opts.speed: 0.01;
        this.direction = opts.direction ? opts.direction: 0;
        this.name = opts.name ? opts.name: this.randomName();
        this.life = Const.DroneParam.LIFE;
        this.bullets = [];
        this.firing = false;
        this.point = {
            type: 'Point',
            coordinates: [121, 31]
        }
        this.bulletNum = 2;
    }
    // .... 省略飞控代码。。  
  
    fire () {
        // if not firing, start firing for specific duration.
        if (!this.firing) {
            for (let i = 0; i < this.bulletNum; i ++) {
                this.bullets.push(new Bullet(this));
            }
            this.firing = true;
            setTimeout(() => this.firing = false, Cost.DroneParam.FIRINGTIME);
        }
    }
}
```
下面简单看下**bullet.js **的结构：
```
/**
 * Bullet based on Drone instance
 */
export default class Bullet {
    // opts should contain the Drone's direction and geometry
    constructor(opts) {
        this.id;
        this.direciton = opts.direction ? opts.direction: 0;
        this.spoint = {
            type: 'Point',
            coordinates: [0, 0]
        };
        // DeepCopy the drone coords to bullet.
        this.spoint.coordinates[0] = opts.point.coordinates[0];
        this.spoint.coordinates[1] = opts.point.coordinates[1];
    }
}
```
常量模块，包含静态属性，无需实例化直接调用：
```
export default class Const {
}

// Static Props outside of class definition
Const.DroneParam = {
    MAXSPEED: 3.999,
    FIRINGTIME: 800,
    LIFE: 10,
    // Firing range.. 0.2 rad in LngLat
    RANGE: 0.2 
};
```
至此，这就完成了几个基础模块的编写，**注意：** 现在drone.js, bullet.js const.js 这几个模块都在项目的src文件夹下，基于Babel 和 Webpack 转码打包需要如下过程：

#### Babel 和Webpack 安装配置

* 首先npm **安装Babel 和 Webpack** 库：
> npm install babel-cli babel-core babel-loader webpack babel-preset-latest --save-dev

* 第二，配置 .babelrc 。在项目根目录下创建 **.babelrc**，前面有一个点啊，别说没玩过linux。。配置文件都这熊样，内容跟官网一样。
```
{ "presets": ["latest"] }
```
* 第三，配置 **webpack.config.js**如下.

```
module.exports = {
    entry: {
        index: [
            "./src/app.js"
            ]
    },
    output: {
        path: "./dist/",
        filename: "bundle.js",
        // app.js 中导出的模块都在Alex 这个Root 命名空间下
        library: 'Alex',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
        {
            // 用babel 作为 js loader，打包前转码为es5，没有中间文件
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
};

```
说明一下，entry.index 指向的 ./src/app.js 是应用的入口文件，也就是说，drone， bullet 等等模块是写好了，但是还需要一个Root 模块来**导出所有模块（API模式）或者启动应用（APP模式）**。 当然**上述两个模式是我胡诌的**，但是经过实践确实证明这两种模式对应模块化的不同需求。

* 假如你的 **业务逻辑代码** 都需要 采用es6 来模块化编写（往往是**大型应用**），那么你的**app.js 应该包含业务代码**（APP模式） 
* 假如你的 模块**只是作为 API **供外部代码调用，比如 [f3earth](https://github.com/f3earth/f3earth) 这样的采用es6 编写的 API,那么你的app.js 应该只包含**模块导出**的过程（API模式）

比如我的app.js 长这样：
```
import Drone from './drone';
// 引入自行封装的Canvas，渲染游戏场景
import Canvas from './chart/canvas';

export {
        Drone,
        Canvas
} 
```
这里将所有子模块再次导出为一个根模块，对应webpack.config.js 中配置的名为 **Alex 的根模块**。在业务代码中通过 Alex.Drone, Alex.Canvas 来调用不同的类。
至此，就完成了打包前的工作，在根目录下 cmd中 通过webpack命令开始打包。完成之后，在 dist 目录下产生 bundle.js，那么这个文件包含了我们刚才所编写的所有模块，可供业务代码调用。

如果想详细了解 Babel，可以直接参考其[官网栗子](http://babeljs.io/docs/setup/)，各种babel 的用法（npm script，或者在webpack中作为loader）
如果想了解更多关于webpack，可以参考我看过比较简明易懂的 [webpack 入门](http://www.w2bc.com/Article/50764) 这篇文章