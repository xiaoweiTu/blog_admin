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

![admin_home](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/admin_home.jpg)

![tag_list](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/tag_list.jpg)

![tag_edit](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/tag_edit.jpg)

![article_list](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/article_list.jpg)

![admin_article_edit](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/admin_article_edit.jpg)

![editor_choose](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/editor_choose.jpg)


## 首页

![home](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/home.jpg)

![article_details](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/article_details.jpg)

![article_likes](https://github.com/xiaoweiTu/blog_admin/blob/master/public/images/article_likes.jpg)

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
