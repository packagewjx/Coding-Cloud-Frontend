本篇文档持续更新，随时关注一下commit。

# 本库的使用方法

## 开发流程

1. 首先使用`git branch`命令创建一个新的分支，然后切换到该分支，开发你现在的功能。这个功能，可以是一个单独的页面，或者只是某个React模块。但是要保证分支不要包含太多你的修改，要及时合并到主分支，让其他人也看到修改。
2. 需要合并的时候，**不要使用`git merge`命令**。必须打开github，创建一个新的Pull Request（简称PR，[这里](https://help.github.com/articles/about-pull-requests/)看如何使用Pull Request），经过我的检查和测试过后，如果有问题，我会给出修改的建议，其他人也可以checkout这个分支，查看有没有问题。然后回去修改，提交，没问题了，我会合并到主分支中。

## 文件规范

- 文件头部加入下面的注释

```
/**
 Create Date: 1/23/18
 @author 这里写自己的名字
 Description: 这里简要说明文件的用途
 */
```

- 上面一条最简单的做法是在IDEA里面设置文件模板，进入File-Settings-Editor-File and Code Templates设置菜单。右边的Includes内，修改File Header为上面的内容。右边的Files添加一个`JSX File`，Extension记得写jsx，加入如下内容，然后保存，以后新建jsx文件的时候，会直接设置好初始的内容。

```
#parse("File Header.java")

import React from 'react';

class ${NAME} extends React.Component {
    render() {
        return (
            /* Insert your Component Here */
        );
    }
}

export default ${NAME};
```


- components文件夹下的文件和文件夹名字都按照模板本来的首字母大写格式，如`Common`、`SingleView`
- jsx格式的文件存放组件的布局属性以及一些简单的UI逻辑等的定义，组件的一些比较复杂的逻辑应该放在同名的run.js文件中，组件文件调用其中的函数来实现组件的逻辑。假如组件名为`Header`，那么对应的布局文件为`Header.jsx`，组件逻辑文件为`Header.run.js`。
- 其余参考这个[代码规范](http://alloyteam.github.io/CodeGuide/)


# 后端API参考

查看[这个文档](./API Reference.md)查询。

# 上手react

学习react之前，首先去了解ECMAScript6的[箭头函数](http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)，[类定义语法](http://es6.ruanyifeng.com/#docs/class)，[let赋值语句](http://es6.ruanyifeng.com/#docs/let#let-%E5%91%BD%E4%BB%A4)，[const关键字](http://es6.ruanyifeng.com/#docs/let#const-%E5%91%BD%E4%BB%A4)等等，这些是基础Javascript没有的。

官网有这篇[快速上手教程（英文）](https://reactjs.org/tutorial/tutorial.html)和[中文版教程](https://doc.react-china.org/tutorial/tutorial.html)。前端开发需要用到npm，还是推荐用linux做开发，少很多麻烦。

因为是国外的东西，众所周知，GFW的存在，搞的国外的什么库都非常的慢。淘宝有npm的源[（单击进入）](https://npm.taobao.org/)可以使用，安装依赖就快很多。

# 翻墙

[谷歌云搭建教程](https://www.youtube.com/watch?v=xrbviAfagrU)。需要提前准备一张信用卡，可以使用[全球付](https://www.globalcash.hk/)。需要事先充值300人民币，但是可以取出来，需要几块钱手续费，这已经比买一年外国VPS要便宜的多，最低大概要5刀每个月。

如果使用linux，推荐安装一个叫做[proxychains](https://github.com/rofl0r/proxychains-ng)的工具，可以让命令的所有网络请求都经过Socks5代理。ShadowsocksR挂代理以后，在本地端口又作Socks5代理，proxychains可以挂这个本地的Socks5代理。这样可以不设置国内源，用代理下国外的东西。

# Openshift

- 官方文档的[网址](https://docs.openshift.org/latest/welcome/index.html)。
- RestAPI的[文档网址](https://docs.openshift.org/latest/rest_api/index.html)：左边目录下有很多文档，主要在`/api/v1`下。

## Openshift Web Console登陆流程

Openshift登陆使用了Oauth2.0协议认证，分下面步骤进行：

1. 如果进入首页，会先让我们重定向到`/console`页面
2. 进入console页面之后，脚本会请求Oauth认证，网址是`/oauth/authorize`，带上Oauth的几个参数。因为没有认证过，会失败，返回302，重定向到`/login`的登录页面。
3. 请求`/login`页面，参数带上`then`，内容为Oauth请求的重定向地址。
4. 用户在登录页输入用户名和密码。登陆成功后，拿到了用户的code，带着这个code请求刚才的那个oauth地址，这是自动进行的，因为刚才的请求返回码是302，浏览器会自动重定向。
5. 然后就可以进入主页了。主页会自动在后台请求token。


# Angle模板使用及项目开发方法

## 下载链接

[下载链接](https://pan.baidu.com/s/1nxqVPJN) 密码: 8hzj

内容：
- reactjs：angle的react的完整示例
- reactjs-seed：angle项目起始目录
- documentation：文档，包含构建的说明

## 建议（摘自Angle文档）

- 不要从零开始写代码，用模板中已经存在的一些组件，改一改看下他是怎么工作的，然后用到我们这里。
- 对照页面，查看源代码，寻找代码的思想和示例代码。
- 学习使用Chrome的开发者工具去寻找bug，快捷键是F12。
  - 开发者工具中，打开Source标签，能看到你的代码哪里有错误，带红色波浪线的。
  - 代码执行出错，也会在Source中显示出错的位置。
  - 可以断点调试，跟IDE功能差不多，在Source下面。

## 上手前还需要学习

下面的东西时开发页面时候用到的基本的库，按需使用。**加粗必学。**

- [**react-bootstrap**](https://react-bootstrap.github.io/getting-started/introduction)：Bootstrap样式库，本来用官方的javascript脚本实现，这个库用react重新实现一遍。需提前了解[Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/)库。这是Bootstrap V3，当前版本已经到V4了，不过react-bootstrap用的是V3
- [**react-transition-group**](https://reactcommunity.org/react-transition-group/)：一些进入和退出的动画组件。
- [**jQuery**](https://api.jquery.com/)：React专注于[DOM](https://en.wikipedia.org/wiki/Document_Object_Model)的操控，没有获取后台数据的相应API，因此使用jQuery的相关API来做REST客户端，获取数据。另外也需要用jQuery来获取组件内部的数据等等。jQuery是一个把JavaScript的许多功能的语法简单化的库。
- [react-router](https://reacttraining.com/react-router/core/guides/quick-start)：如果需要页面内的路由，可以学习使用这个react-router库。
- [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap)：整合react-router和react-bootstrap，让router组件有bootstrap的样式。

## 主目录结构

请看[这个文档](File Structure.md)

## 构建

一般在网页应用发布之前，需要把所有源代码文件构建一遍，一般是因为

- 如[SASS](http://sass-lang.com/)，[LESS](http://lesscss.org/)或者[Typescript](https://www.typescriptlang.org/)等等的前端库或者语言，实质是语法糖，需要编译成标准的HTML、CSS、Javascript才可以使用。
- 文件数目太多，比如app文件夹里，会导致页面加载很慢，因为HTTP请求是一个文件一个请求，暂时还没有一次请求多个文件的（HTTP/2可能会有）。需要一个将所有文件合并为几个文件的过程。
- 为了进一步加快读取速度，编译好的几个文件，会去除里面对运行没有影响的空白符号，换行符等特殊符号，去除注释，这是最小化文件的过程，[在线最小化网站](https://www.minifier.org/)。

模板的构建，只需要用`npm run build`就行了。具体看文档。

## 前端组件的介绍

### 路由

前端页面是有些是单页应用，也就是，页面的跳转只会给页面的一部分进行加载，而不是传统的单击超链接就跳到另一个页面。传统方法下，记录用户去过哪些页面，返回前进的功能实现很简单，一般依托浏览器的历史页面栈，我们不需要保存。但是，单页应用不同，要保存这些历史信息，就用到路由。

每到达网页的某个地方，也就是单击某个元素跳转到的某个地方，都对应路由的一个状态，和浏览器的路径。我们这里用到[react-router](https://github.com/ReactTraining/react-router)作路由，可以看看模板中的代码，结合文档学学使用。

### 页面元素

Angle模板中的Element页面有许多的页面元素，可以看看来决定什么时候用什么元素，先浏览一遍看看有什么组件，可以在后面开发时候使用。

### 表单组件

Angle有带许多种表单组件，表单验证（Validation），表单流程（Wizard），文件上传（Upload），还有个xE
ditable组件，可以做到原地编辑，也就是看到一些东西，本来就是只有显示的，没有输入框什么的，但是当单击那些文字的时候，在那里显示输入框，可以直接修改那个文字了。另外还有裁剪页面的组件（Cropper）。

### 图表组件

看看，能用就用。

### 表格组件

一般这里的表格组件，集合了单选多选，数据搜索，筛选，排序，分页，数据获取的功能，我们不再需要自己写表格，然后一步步加入这些功能，直接用就是。

## 约定使用组件

|组件种类|class名或组件名|
|-|-|
|等待动画（Spinner）|Ball Clip Rotate Mul|
|数据表格|Datatable   |

## 获取后台数据

我给大家做了一个封装好一些功能的[RestClient](../app/components/Util/RestClient.js)，包装了最基础的`$.ajax()`函数为`RestClient.http()`函数，参数为一个requst对象，最常用的几个参数是url、data、datatype、success、error、complete、method等等，更多选项看该文件。

同时提供了4个简写的方法，分别对应四个HTTP方法，`get`,`post`,`put`,`delete`。

我这个这是简单的包装，多来[这里](http://api.jquery.com/category/ajax/)看看ajax函数的详细文档。

## 如何开发一个页面

React教程教过我们，开发一个页面，首先开发页面里面的组件。组件可以单独放到一个文件中，也可以放在页面的文件中，这主要看你是否需要重复利用这个组件，推荐放文件中，除了一些细小的组件以外，有利于维护。

组件的编写，首先是写出一个静态的组件，也就是先有布局和显示的东西，不获取后台的数据，先自己填充一些模拟的数据进去，然后制作这个组件。

静态组件做好以后，就可以根据后台返回的数据，编写将后台数据转换为你的组件展示时候使用的数据格式。直接使用Web Console来获取后台的数据，你需要什么数据，就进入你开发的页面对应的Web Console的页面，打开开发者工具的Network标签页，寻找获取你的需要的数据的那一条请求，找到返回值，根据那个返回值写你的转换函数就行。可以使用上面的筛选功能，Rest请求一般在XHR。

举个例子，我现在正在开发用户的主页，能看到模板库和用户的所有项目。我开发显示模板的组件，我先写好大致的布局，有标题，有部署模板、部署镜像什么的超链接，还有代表模板的一个个图标和文字。做好静态的显示组件后，为了获取模板的实际数据，打开开发者工具，在那么多的请求里面找到一条请求，叫tempaltes的，网址是`/apis/template.openshift.io/v1/namespaces/openshift/templates`的，我就知道是我需要的数据获取API了。点进去看响应，看到Json就能写出相应的转换函数。

# 编程规范

建议先看完[阿里巴巴的Java编码规范](https://github.com/alibaba/p3c/raw/master/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C%EF%BC%88%E7%BA%AA%E5%BF%B5%E7%89%88%EF%BC%89.pdf)，不要觉得为什么这么麻烦，这么多规定，你会发现以后调式维护的时候，会感谢学过这些规范的。里面的内容不必全部看，目前看编程规约和安全规约即可。以后要全部看，终生受益。

前端的编码规范看[这里](http://alloyteam.github.io/CodeGuide/)，这是腾讯的前端编码规范。

软件开发有一点很重要，就是遵循最佳实践，很多前辈已经总结出了打代码的一些经验，如果你们不想重复前人的错误，或者加班加点赶工，就试着先改掉自己的不好的编程习惯。你可以先学习这些，再来打代码。

# Git

重要事情说三遍，**Git不是网盘！Git不是网盘！Git不是网盘！**

Git是一个**版本管理系统**，它的主要功能是管理代码的历史，查看版本的演进，并且可以多人协作完成功能的添加，代码的修改维护等等的管理工作。

用通俗的话来讲，Git有这几个比较容易理解的功能：

- 查看哪些行有增加和删除的，修改的行就是删去旧行，增加了新行
- 查看版本的更新历史，什么时候、谁更新了什么，修改了什么、添加了什么功能，都能看得到。
- 分支的管理，Git有一条主（master）分支，代表着这个软件的主要版本的代码，所有的修改，最终都会汇集到主分支上，要么通过在主分支修改并提交（多人协作时不推荐这种做法），要么**通过在主分支的某一个点上，建立一个分支**（推荐做法），根据那个点上的代码内容，进行所需修改，然后，通过合并（merge）功能，把分支合并到主分支，从而将新的更改提交到主分支。
- 分成远程仓库和本地仓库，提交到（push）远程仓库之后，所有人都能够下载这些更改。

如果不太懂，先看这个[系统的教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

**很多版本管理软件（Subversion等）其实都差不多，有些思想是通用的**

肯定会有一些问题，我先解答

- **我要合并我的分支到主分支里面了，但是提示代码冲突怎么办？**

这涉及冲突解决的问题。代码冲突也会发生在提交的时候。Git在代码冲突的时候，会提醒你哪个文件发生了冲突，打开那个文件，会看到Git在里面做了一些记号，一部分是主分支当前的内容，一部分是自己的内容，印象中是这样的。

    <<<<< HEAD
    主分支代码
    =======
    你的代码
    >>>>> 分支的sha256码

这时候，你需要对照两个修改，然后把最终的修改改出来，删去多余的记号，再重新merge或者commit就行了。

- **我在开发另一条分支的代码的时候，主分支也有了几次提交，我的分支的基点落后主分支了，怎么办？**

其实，有两种处理方式

第一是，可以继续开发，合并时候，处理可能会遇到的冲突。

第二，也是**推荐**的做法是，**先rebase，再进行开发**。[rebase](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)就是重新设立基点的意思，这个命令是git最复杂的命令之一。它可以把你的分支的基点（就是主分支和你的分支错开的地方，你新建分支时候的点），移到需要的点那，一般是最新的更改那里。具体看教程。这里不细说。

另外，rebase有一个交互式rebase的选项，可以做更多的东西，包括将多次提交合并到一起，更改提交的顺序（上上次提交和上一次提交的顺序掉转过来）等等的选项。具体看`git rebase -i`的[教程](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)。

- **不小心做了一个可怕的更改，提交了，怎么撤销？**

具体可看git reset和reflog（应对无法reset的更改）的教程。

#### Git最佳实践

- [这里说了一部分](http://blog.csdn.net/happydeer/article/details/17679369)
- [这里另一部分](http://m.finalshares.com/read-7224)
- [设置一些alias（命令别称）](https://github.com/GitAlias/gitalias)，效率大增

**当你学完Git的所有功能之后，可以试着在Intellij的Git插件试着使用了，更快更好用。** 但是我要强调，*命令行工具只是提升效率之用，不应该成为入门的选择，用惯命令行，才能够完全理解这个软件是如何使用的。*

多上去github，看下别人成熟的开源项目的代码库，就知道应该怎么用git了。

# 乱七八糟

- IDE推荐用Webstorm，或者Intellij IDEA。IDEA集成了Webstorm的功能。Jetbrains的IDE可以[申请学生免费](https://www.jetbrains.com/student/)，只要有[华南理工大学的邮箱](http://premail.scut.edu.cn/)就行了。
- 有个工具推荐下，叫做[Postman](https://www.getpostman.com/)，可以很方便的执行API请求，保存一些历史的请求等等。不知道获取后台数据的过程如何，可以先用这个来看，看看返回的结果什么的，再想格式化等的东西。
