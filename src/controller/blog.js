const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
  // 因为 author 和 keyword 是否有值不确定，防止 sql 语句报错，所以需要加 where 1=1
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc;`
  console.log('sql: ', sql)
  // 返回 promise
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const createBlog = (blogData = {}) => {
  const { author, createTime = Date.now() } = blogData
  const content = xss(blogData.content)
  const title = xss(blogData.title)
  const sql = `insert into blogs(title, content, createTime, author) values('${title}','${content}',${createTime},'${author}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  return exec(sql).then(updateData => {
    console.log('updateData:::::: ', updateData)
    return updateData.affectedRows > 0
  })
}

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(deleteData => {
    console.log('deleteData:::::: ', deleteData)
    return deleteData.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog
}