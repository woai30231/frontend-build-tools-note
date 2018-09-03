####　前言

为了很好的理解接下来要说明的webpack，我大概说一下webpack到底是个什么东西以及在前端开发过程中为什么会产生webpack等类似的这种工具！因为只有这样，你才能更清楚的去知道一个东西是干嘛的！

* 为什么会产生webpack工具

总之一句话，需求决定了它的产生！在很久很久以前，前端开发过程中，js还只是一种简单用来实现前台用户交互逻辑的一种语言，我们可能在html只会写一些简单的js语句，js外部文件也是相当的简单。到今天，js已经发展成为一种统领前端领域的语言，用js实现的逻辑越来越复杂，一个页面中要引用的js文件也是超级的多，各个js文件相互之间可能还存在依赖关系，比如，b.js依赖a.js，a.js又可能依赖c.js，所以为了防止一些错误，我们在前台引用的时候就要保证引用的顺序了，当然了，如果一个html文件中引用的js文件很少，比如引用了3到4个js文件，那么你可以手动地去管理引用顺序从而保证它们之间的依赖关系不会出错，如果很多呢？比如引用了几十个js文件呢？想想都会头痛，更别说你去管理依赖了！当然这里大概说下，之前的一些实现js模块化、管理依赖及解决命名冲突的方式，主要有这几种：CMD规范、AMD规范及es6模块！

> CMD主要用于服务器端，代表就是nodejs，如：

```javascript
    //a.js
    module.exports = 'a';

    //b.js
    var a = require('./a.js');
    console.log(a);//output a
```

> AMD用于浏览器端，代表就是requirejs，如：

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="https://cdn.bootcss.com/require.js/2.3.3/require.js" data-main="./c.js"></script>
    </head>
    <body>
        
    </body>
    </html>
```

```javascript
    //c.js  使用模块
    require(['./d.js'],function(d){
        console.log(d);//output 'd'
    });

    //d.js --定义模块
    define(function(){
        return 'd'
    });
```

> 前后端通吃的es6模块，只是存在兼容问题，需要通过相关工具转换成es5。如：

```javascript
    //e.js
    const e = 'e';
    export default {e};


    //f.js
    import e from './e.js';
    console.log(e.e);//output 'e';
```



除此之外，我们在前端开发过程中还有一个需求就是，合并文件，为什么要合并呢？我想至少有两个原因使得你需要去合并文件，1）、减少对服务器的请求，使得你的服务器不会因为短期内大量的请求而导致瘫痪，比如你的一个页面中引用了100个js文件，那么不考虑其它的文件请求的情况下，同时间100个人去请求同一个html文件，你的服务器就会处理在同一时间就会响应（100 * 101）即10100次请求，你的服务器要是不行的话，可能已经瘫痪了，当然了，服务器没这么简单哈，可能会使用负载均衡、代理服务器等等措施来预防这些情况发生，这里只是打个比方而已呀；2）、使得前台用户界面响应更快，说一下原因：你合并所有的文件，那么浏览器与服务器之间只会存在较少的请求-响应过程，从而更快的拿到文件，继而使得你在前台页面一下子就看到了响应，会给你感觉浏览器响应很快的感觉。反之，如果你不合并文件，浏览器和服务器之间就会发生大量的请求-响应过程，其中每次请求-响应过程都会需要建立连接（3次握手）、发送请求、响应请求、关闭连接等等过程，这些过程大量叠加起来，就会使得你的浏览器里用户界面变得很慢响应了，从而影响用户体验！如果还不理解这个过程，给你打个比方吧：

> 有两个队伍分别100人需要从一个地方跑到另一个地方刚好运100份材料回来，每个人一次只能运一份材料，两个地方之间的道路只能容纳20个同时并排行走，第一个队伍采取的是100个人同时去运，于是形成了5排，每排20个人同时去运材料；第二个队伍，采用的是一个一个的运，等运材料的人回来了，第二个人才开始出发运材料。很明显第一个队伍能更早的完成任务，从这个比喻里面我们也可以看到，合并请求能够更好的利用运输赛道，而且运送材料的过程是连续的，从而会很快的得到响应，当然了并不是说这样做没有代价的，因为一个人一下子吃了很多东西，会噎着自己，耗损过多的系统资源；而分开请求，因为每次运送都不会太多，虽然每次单独的运输时间会相对来说更快一点，但是叠加起来就会起来很慢，而且没有充分利用赛道，说得更形象一点就是没有充分利用资源。**这里还要注明一点：真正的情况下，没我们想得这么简单哈，这里只是说一下合并请求的充分性，某些情况下，要根据实际情况而定！**

所以两个比较明显的需求促成了webpack等等类似的工具的产生：1）、合并资源、压缩资源；2）、管理各个资源的依赖关系、解决命名冲突等等问题！


* 那么说了半天webpack是个什么工具呢？

简单说，webpack是个打包工具，把你所有的资源（不只是js文件哦，其它资源，如css文件，webpack也会把它当作模块对待）打包成一个文件，而且自动帮你管理模块间的依赖关系。当然了webpack又不能简单的定义成一个打包工具，因为它可以借助相关插件实现grunt/gulp等工具的功能、同时借助相关loader实现相关资源向js转换的功能以及编译es6到es5等！所以我的总结就是：webpack是一个具有构建功能的模块打包工具！


#### 说明

因为网上有太多的文章介绍怎么使用webpack了，所以我在这里就不向重复造轮子了，原因有两个：1 别人已经写得够好了，所以我不想重复写，可能我写得不够完善，反而让你对webpack更敬而远之；2 我觉得学习一个东西你更多是需要实际使用它，所以写得看得再多，实际意义不大，所以我只会在这里结合实际使用场景介绍一下webpack比较特出有意义的功能或api！另外其中表达的大部分思想是借鉴或者直接摘自webpack官网教程！

**注：这里的webpack版本是4.0+，请知悉！阅读的时候，请注意以下亮点说明！**

* 下面代码部分，带-号的表示从对应文件前一个版本对比去掉的代码，带+号表示新增的代码！！！

* 文档彼此之间存在一定的联系关系，譬如：后一篇文档可能在前一篇的文档基础上进行演示的，如果在查看的过程中，发现某处文档有连续性问题，请回头从前一篇文档看起！！！

[webpack 安装教程](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/001.md)

[快速开始](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/002.md)

[webpack静态文件管理](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/003.md)

[webpack输出管理](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/004.md)

[webpack Development 配置](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/005.md)

[webpack 热替换](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/006.md)

[webpack tree shaking 代码剔除](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/007.md)

[webpack 生产环境](https://github.com/woai30231/frontend-build-tools-note/blob/master/webpack/guide-artical/008.md)

[webpack tree shaking(去掉没实际用的模块方法和属性)功能](https://github.com/woai30231)

[webpack Code splitting 代码分割 提取公共代码](https://github.com/woai30231)

## 相关配置过程说明及api介绍如下

# 这部分内容未完待续……


## 相关链接

* **[webpack中文指南](http://zhaoda.net/webpack-handbook/)**

* **[webpack入门，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)**

* **[webpack入门，看这篇就够了--英文文档](http://www.pro-react.com/materials/appendixA/)**

* **[一篇较全面教你怎么使用webpack的英文文档](http://www.pro-react.com/materials/appendixA/)**

#### 内容待续…………
