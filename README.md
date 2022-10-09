## 1. webServer
A project that uses Node as a Webserver

## 2. 关于分支
项目开发使用三种方式，首先使用 node 原生方法开发，后面使用 express 和 koa2 进行重构。

- dev 使用 node 原生方法开发
- dev-express 借助 express 框架开发
- dev-koa2 借助 koa2 框架开发

## 3. 接口设计

| 描述              | 接口              | 方法 | url 参数         | 备注                      |
|-------------      |----------------   |-----|----------------  |------------------------  |
| 获取博客列表       | /api/blog/list    | get | author, keyword  | 参数为空，则不进行查询过滤  |
| 获取一篇博客的内容  | /api/blog/detail  | get | id              |           -               |
| 新增一篇博客       | /api/blog/create  | get | -                | post 新增的信息           |
| 更新一篇博客       | /api/blog/update  | get | id               | postData 中有更新的内容    |
| 删除一篇博客       | /api/blog/delete  | get | id               |           -               |
| 登录              | /api/user/login   | get | -                | postData 中有用户名和密码  |