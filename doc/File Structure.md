# 文件结构说明

以下目录及结构均在app文件夹下，简要说明文件夹存放的内容和文件的内容。

- components：放置我们的React Components
  - Layout：整体布局文件放置位置
    - Base.jsx：最基本页面布局，装载Header、Sidebar等其他页面元素。
    - BasePage.jsx
    - ContentWrapper.jsx：页面主要内容的包装组件，也就是自定义内容的根组件。
    - Header.jsx：顶部栏
    - Footer.jsx：底部栏
    - Offsidebar.jsx：右边侧边栏，
    - Sidebar.jsx：左边侧边栏，主要有用户简要信息（头像用户名等），导航栏菜单。
  - Common：项目内的公共组件和一些定义文件
  - HomePage：用户首页的所有组件放置的文件夹，对应Openshift的选择项目或者部署模板的页面文件。
  - ProjectPage：项目页面组件放置文件夹
    - Application：
    - Builds：
    - Monitoring：
    - Overview：
    - Resources：
    - Storage：
  - SingleView：示例，单页面示例
  - SubMenu：示例，子菜单示例
- fonts：字体存放目录
- img：图片存放目录
- server：放置一些模拟服务器生成结果的json文件的目录
  - -18n：internationalization，也就是多语言翻译文件。
- styles：样式文件存放目录
- App.jsx：主程序，负责装载我们的主页面，装载路由、主题、翻译等。
- Vendor.jsx：其他第三方库的引入文件
- index.html：主页文件，里面id为app的div区域是我们这个app放置的位置。
