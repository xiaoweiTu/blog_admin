# blog_admin

> 一个个人博客的基础后台兼前台模板

# 后台API

[fast_blog_api](https://github.com/xiaoweiTu/fast_blog_api)

## 安装使用

```bash
# 克隆项目
git clone https://github.com/xiaoweiTu/blog_admin.git

# 进入项目目录
cd blog_admin

# 安装依赖
npm install

# 配置API地址
在对应环境的.env文件中配置

API域名
VUE_APP_BASE_API = ''

// 上传图片地址 一般是 VUE_APP_BASE_API+/web/upload
VUE_APP_BASE_API_UPLOAD = ''

# 开发模式启动
npm run dev
```
# 页面截图

## 后台

![img](http://qiniu.txwei.cn/admin_home)

![img](http://qiniu.txwei.cn/home_table)

![tag_list](http://qiniu.txwei.cn/tag_list)

![tags_edit](http://qiniu.txwei.cn/tags_edit)

![article_list](http://qiniu.txwei.cn/article_list)

![article_edit](http://qiniu.txwei.cn/article_edit)

![editor_choose](http://qiniu.txwei.cn/editor_choose)

## 首页

![home](http://qiniu.txwei.cn/home)

![article_likes](http://qiniu.txwei.cn/article_likes)

将会启动在 http://localhost:8080

## 打包

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## Advanced

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


## License

[MIT](https://github.com/xiaoweiTu/blog_admin/blob/master/LICENSE) license.

Copyright (c) 2017-present xiaoweiTu
