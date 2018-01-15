# 本库的使用方法

## 开发流程

1. 首先使用`git branch`命令创建一个新的分支，然后切换到该分支，开发你现在的功能。这个功能，可以是一个单独的页面，或者只是某个React模块。但是要保证分支不要包含太多你的修改，要及时合并到主分支，让其他人也看到修改。
2. 需要合并的时候，**不要使用`git merge`命令**。必须打开github，创建一个新的Pull Request（简称PR，[这里](https://help.github.com/articles/about-pull-requests/)看如何使用Pull Request），经过我的检查和测试过后，如果有问题，我会给出修改的建议，其他人也可以checkout这个分支，查看有没有问题。然后回去修改，提交，没问题了，我会合并到主分支中。

# 上手react

学习react之前，首先去了解ECMAScript6的[箭头函数](http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)，[类定义语法](http://es6.ruanyifeng.com/#docs/class)，[let赋值语句](http://es6.ruanyifeng.com/#docs/let#let-%E5%91%BD%E4%BB%A4)，[const关键字](http://es6.ruanyifeng.com/#docs/let#const-%E5%91%BD%E4%BB%A4)等等，这些是基础Javascript没有的。

官网有这篇[快速上手教程（英文）](https://reactjs.org/tutorial/tutorial.html)和[中文版教程](https://doc.react-china.org/tutorial/tutorial.html)。前端开发需要用到npm，还是推荐用linux做开发，少很多麻烦。

因为是国外的东西，众所周知，GFW的存在，搞的国外的什么库都非常的慢。淘宝有npm的源[（单击进入）](https://npm.taobao.org/)可以使用，安装依赖就快很多。

# 翻墙

[谷歌云搭建教程](https://www.youtube.com/watch?v=xrbviAfagrU)。需要提前准备一张信用卡，可以使用[全球付](https://www.globalcash.hk/)。需要事先充值300人民币，但是可以取出来，需要几块钱手续费，这已经比买一年外国VPS要便宜的多，最低大概要5刀每个月。

如果使用linux，推荐安装一个叫做[proxychains](https://github.com/rofl0r/proxychains-ng)的工具，可以让命令的所有网络请求都经过Socks5代理。ShadowsocksR挂代理以后，在本地端口又作Socks5代理，proxychains可以挂这个本地的Socks5代理。这样，也可以不设置国内源，用代理下国外的东西。

# Angle模板

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

## 主目录结构

    +---app                     #放项目源代码文件
    |   +---components
    |   |   +---Blog
    |   |   +---Charts
    |   |   +---Common
    |   |   +---Dashboard
    |   |   +---Ecommerce
    |   |   +---Elements
    |   |   +---Extras
    |   |   +---Forms
    |   |   +---Forum
    |   |   +---Layout
    |   |   +---Maps
    |   |   +---Pages
    |   |   +---Tables
    |   |   +---Widgets
    |   |   +---App.jsx
    |   |   +---index.html
    |   |   +---Vendor.jsx
    |   +---fonts
    |   +---img
    |   +---server
    |   |   +---i18n
    |   +---styles
    |       +---app
    |       +---bootstrap
    |       +---themes
    +---bower_components
    +---node_modules
    +---dist                     #放编译好的文件

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

# 乱七八糟

- IDE推荐用Webstorm，或者Intellij IDEA。IDEA集成了Webstorm的功能。Jetbrains的IDE可以申请[学生免费](https://www.jetbrains.com/student/)，只要有[华南理工大学的邮箱](http://premail.scut.edu.cn/)就行了。
- Chrome有个工具推荐下，叫做[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=zh-CN)，可以很方便的执行API请求，保存一些历史的请求等等。需要fanqiang。

# 管理后端REST API参考

RESTAPI有一些东西需要了解的，[去看看](https://www.zhihu.com/question/28557115)。

下面说的api，不一定定型，可能会修改。

## 资源管理基础API

下方的接口，资源API都有，前方加上resourceKind，使用时换成具体的资源种类，如`/user/addByName?name=test`。

另外，有一个参数为project，指定该操作所在的项目，(加入`&project={projectName}`在后面)，这个参数是可选的，设置好project之后，可以不传递这个参数。下面不再说这个参数。

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|
|/addByName?name={name}|PUT|name：资源的名字|空|添加一项资源，初始内容为空，名字为name|新的user对象，属性为空|
|/|PUT|无|资源对象完整定义|添加一项资源，资源的各个属性由发送过来的资源对象定义来定义|新的user对象，属性为传送来的对象的属性，另外有一些元数据插入|
|/{name}|POST|name：资源的名字|资源对象完整定义|修改资源对象，原对象（由name唯一指代）的属性修改成发送来的资源对象定义的属性|更新的user对象，属性为传送来的对象的属性，另外有一些元数据被更新|
|/{name}|GET|name：资源的名字|空|获取一个名为name的资源对象|名字为name的资源对象|
|/|GET|project：项目名|空|若project存在，则获取该project的所有资源对象，若不存在或为`all`，则获取所有项目的资源对象|资源对象列表|
|/{name}|DELETE|name：资源的名字|空|删除一个资源对象|布尔值，true为删除成功，false为失败|

## 额外API

### 角色管理API

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|-|
|/role/{name}?username={username}|PUT|username:用户名<br/>name:角色名|无|给用户名为username的用户添加一个名为role的角色|布尔值，true为添加成功，false为失败|
|/role/{name}?groupName={groupName}|PUT|groupName:用户名<br/>name:角色名|无|给名为groupName的组添加一个名为role的角色|布尔值，true为添加成功，false为失败|
|/role/{name}/user/{username}|DELETE|username:用户名<br/>name:角色名|无|删除用户名为username的用户的名为name的角色|布尔值，true为添加成功，false为失败|
|/role/{name}/group/{groupName}|DELETE|groupName:用户名<br/>name:角色名|无|删除名为username的用户的名为name的角色|布尔值，true为添加成功，false为失败|
|/role/all/user/{username}   |DELETE   |username:用户名   |无   |删除用户名为username的所有角色   |布尔值，true为添加成功，false为失败|
|/role/all/group/{groupName}   |DELETE   |groupName:组名   |无   |删除名为groupName的组的所有角色   |布尔值，true为添加成功，false为失败|

### 组管理API

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|-|
|/group/{name}/user   |GET   |name:组名   |无   |获取一个组的所有用户   |组用户的列表   |
|/group/{name}/user?username={username}   |PUT   |name:组名<br>username:用户名   |无   |添加成员username到组name中   |布尔值   |
|/group/{name}/user/{username}   |DELETE   |name:组名<br>username:用户名   |无   |从name组中删除成员username   |布尔值   |

### 模板管理API

now working...

## 多租户网络管理API

**暂时仍未调用成功，可以先不管**

## S2I流程API

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|
|/s2i/build|POST   |无   |对象，里面字段有(加粗为必须项)：<br>**assembleScript**<br>**runScript**<br> **imageName**<br>builderImageName<br>dockerFileScript<br>testRunScript<br>saveArtifactScript<br>usageScript<br>详细说明请看S2I的流程介绍 |使用脚本执行S2I构建流程   |布尔值|
