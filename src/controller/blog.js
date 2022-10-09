const getList = (author, keyword) => {
  // 先返回假数据（格式正确）
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1627891829698,
      author: '张三'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1627891980126,
      author: '李四'
    },
    {
      id: 3,
      title: '标题3',
      content: '内容3',
      createTime: 1627894414694,
      author: '王五'
    }
  ]
}

const getDetail = id => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    createTime: 1627891829698,
    author: '张三'
  }
}

const createBlog = (blogData = {}) => {

  return {
    id: 4 // 新增 blog 后插入到数据库的 id
  }
}

const updateBlog = (id, blogData = {}) => {
  return true;
}

const deleteBlog = id => {
  return true;
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog
}