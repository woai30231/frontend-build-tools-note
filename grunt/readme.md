## 前言

* 一直在想怎么写这篇介绍文档！后面我发现，官网写得就挺好的，于是这篇文档就采用官网的流程步骤介绍！分为四个部分————1、开始；2、Gruntfile.js配置；3、grunt documentation；4、总结。

###　开始

 这个部分介绍怎么用grunt管理项目之前的准备工作！因为我目前用的系统是windows系统，所以下面要说的内容都是以windows系统为基础说明的！当然了，我们需要用到命令行工具，你可以安装一个shell环境，我用的是git bash！好，让我们开始吧！

 首先我们需要安装nodejs，去node官网下载msi文件，双击安装即可！并且保证nodejs版本尽量新吧，因为为了保证功能稳定！安装成功之后，需要用到的相关命令如下：

 ```bash
 	npm update -g npm //更新npm
 	node -v //查看当前node版本号
 	npm -v //查看当前npm版本号
 ```

 我们grunt构建工具是基于nodejs的，所以我们将来跑任务什么的都是在node上跑！为了能在命令行使用命令来跑我们的grunt任务，我们需要安装grunt的命令行工具grunt-cli到全局中去，采用如下命令：

 ```bash
 	npm install -g grunt-cli
 ```

 其实grunt-cli原理很简单，来看下官网对它原理的介绍，如下：

![](https://github.com/woai30231/frontend-build-tools-note/blob/master/image/grunt_1.png)

说白了，grunt-cli的作用就是能匹配当前目录的grunt，然后在执行相应在Gruntfile.js配置的任务！

好了，假设我们现在已经在全局安装好grunt-cli之后，然后需要在一个已经存在的项目上来跑我们的任务，那我们只需要三步：

- 1、进入项目根目录下；

- 2、执行npm install ，这个命令的主要作用就是安装package.json里面包含的插件依赖，会把相关插件安装到当前目录下的node_modules下；

- 3、然后运行grunt 跑相关任务就可以了。

但我们是自己开始一个项目的时候，我们就现需要搭建项目包结构了，通常我们需要在项目根目录下建立两个文件package.json和Gruntfile文件，package.json的作用主要是包含描述当前项目信息的一些元数据，这些数据对于你将来把这个项目公开或者与团队其它人开发合作很好帮助，因为它列出了开发相关的依赖包，包括grunt等！Gruntfile指的是Gruntfile.js或者Gruntfile.coffee文件，它的作用描述我们构建项目需要跑的任务（task）以及下载相关grunt插件等！

要生成package.json主要有三种方式：

- 1、如果你是在别人的基础上改内容，那么从别人哪里得到原始数据的时候就有package.json这个文件的；

- 2、使用npm init（可带 -y 默认配置信息），然后由系统询问的方式完成package.json的配置；

- 3、使用最简单直接的方法，手写这个文件，格式大概如下：

```json
	{
		"name":"test",
		"version":"0.0.1",
		"description":"",
		"devDependencies":{

		}
	}

```

当我们配置好package.json之后，我们就需要把相关依赖包添加到依赖列表去，命令如下：

```bash
	npm install <modulename> --save-dev
```

这样就可以把相关插件添加到依赖中，比如安装grunt，则命令如下（安装其它插件类似）：

```bash
 npm install grunt --save-dev
```

好了，有关package.json的原理就是如此了，我们再来看一下，如何配置我们的Gruntfile.js！首先通过查看官网知道Gruntfile大概包括四个部分：

- 1、一个容器函数；

- 2、任务配置；

- 3、下载插件和注册任务；

- 4、自定义任务。

我们直接来看一个最简单的Gruntfile.js的模板吧！代码如下：

```javascript
 "use strict";

 //这个就是暴露出去的容器函数，它主要包住了gruntfile的所有代码，记住一点我们写的grunt有关的插件，模板都是这个模式
 module.exports = function(grunt){
 	//任务配置
 	grunt.initConfig({
 		//这里uglify已经是任务了，
 		uglify:{
 			options:{
 				banner:'/* <%= grunt.template.today('yyyy-mm-dd') %>*/\n'
 			},
 			build:{
 				src:'./js/demo.js',
 				dest:'./dest/demo.min.js'
 			}
 		}
 	}); 

 	//下载插件，因为这个插件提供了uglify任务
 	grunt.loadNpmTasks('grunt-contrib-uglify');

 	//注册任务
 	//这里需要说明一下，我们不用这一步，直接使用命令grunt uglify也可以跑这个任务，
 	//这样做的目的，主要在我们需要一个命令跑很多任务的时候，或者任务名字比较长的时候，采用别名使用
 	grunt.registerTask('default',['uglify']);
 };
```

上面的配置就能实现把当前js下的demo.js压缩到当前dest目录下demo.min.js中！

这里说明几点，列出如下：

- 1、与grunt有关的文件，它们都可以采用如下的模板：

```javascript
	'use strict';
	module.exports = function(grunt){
		//your code goes here!
	};
```
官网说明如下：

![](https://github.com/woai30231/frontend-build-tools-note/blob/master/image/grunt_2.png)

- 2、相关的任务配置写在grunt.initConfig函数参数中，当然了，因为gruntfile.js是有效的js文件，所以你能够的写的代码不仅限于json，任何有效的js代码都可以写，必要的话，你应该使用js代码来动态配置你的任务！

- 3、相关任务是由对应的grunt插件提供的，这些插件，我们需要把对应插件安装到package.json的依赖中，然后通过一个简单的代码，引入该插件：

```javascript
	grunt.loadNpmTasks('grunt-contrib-uglify');
```
这样就能成功开放相关任务了。使用grunt --help命令可以查看当前项目的注册的任务清单！


- 4、当我们注册某个自定义任务的时候，牵连到的任务，个数不论多少，都应该包含在意数组中，如：

```javascript
	grunt.registerTask('default',['clean','uglify']);
```
当然了，我们也可以自定义插件配置任务，这里不讨论！

开始部分到这里就算介绍完成！

### Gruntfile.js配置



### 内容待续…………