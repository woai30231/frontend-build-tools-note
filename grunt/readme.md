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


### 内容待续…………