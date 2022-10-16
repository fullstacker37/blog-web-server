const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/responseModel');

const handleBlogRouter = async (req, res) => {
  const method = req.method;
  const id = req.query.id;
  console.log({method, path: req.path})
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const detailData = getDetail(id);
    // return new SuccessModel(detailData);
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/create') {
    console.log('body============ ', req.body)
    req.body.author = 'zhangsan' // 待开发登录时在改成真实的数据
    const result = createBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    return result.then(data => {
      if (data) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const author = 'zhangsan' // 待开发登录时在改成真实的数据
    const result = deleteBlog(id, author);
    return result.then(data => {
      if (data) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除博客失败');
      }
    })
  }
}

module.exports = handleBlogRouter;