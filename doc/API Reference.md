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

目前只有资源管理的6个方法，暂无其他新加入的方法。

## 多租户网络管理API

**暂时仍未调用成功，可以先不管**

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|-|
|/pod-network/join-project?to={to}&selector={selector}   |GET   |to:加入到的项目名<br>selector:标签筛选器，筛选有什么标签为什么值的项目   |无   |将selector选出来的项目的网络加入到to项目中，使得那些网络能够与to的网络互通   |布尔值   |
|/pod-network/join-project?to={to}&projects={projects}   |GET   |to:加入到的项目名<br>projects:项目名，用`,`隔开   |无   |将指定的项目的网络加入到to项目中，使得那些网络能够与to的网络互通   |布尔值   |
|/pod-network/isolate-project?selector={selector}   |GET   |selector:标签筛选器，筛选有什么标签为什么值的项目   |无   |将selector筛选出来的网络与其他非全局互通网络的项目分隔开，使得这个网络被隔离开，只有有全局网络的项目可访问   |布尔值   |
|/pod-network/isolate-project?projects={projects}   |GET   |projects:项目名，用`,`隔开   |无   |将指定的项目与其他非全局互通网络的项目分隔开，使得这个网络被隔离开，只有有全局网络的项目可访问   |布尔值   |
|/pod-network/make-project-global?selector={selector}   |GET   |selector:标签筛选器，筛选有什么标签为什么值的项目   |无   |将selector筛选出来的项目设为可访问所有项目网络的全局网络项目   |布尔值   |
|/pod-network/make-project-global?projects={projects}   |GET   |projects:项目名，用`,`隔开   |无   |将指定的项目设为可访问所有项目网络的全局网络项目   |布尔值   |


## S2I流程API

|API地址|HTTP方法|参数描述|HTTP请求主体|描述|返回值|
|-|-|-|-|-|-|
|/s2i/build|POST|无|对象，里面字段有(加粗为必须项)：<br>**assembleScript**<br>**runScript**<br>**imageName**<br>builderImageName<br>dockerFileScript<br>testRunScript<br>saveArtifactScript<br>usageScript<br>详细说明请看S2I的流程介绍|使用脚本执行S2I构建流程|布尔值|
