const env = process.env.NODE_ENV

let MYSQL_CONFIG

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: 3306,
    database: 'blog_system'
  }
}
if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: 3306,
    database: 'blog_system'
  }
}

module.exports = {
  MYSQL_CONFIG
}