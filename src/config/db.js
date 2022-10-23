const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: 3306,
    database: 'blog_system'
  }
  // redis
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
  }
}
if (env === 'production') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: 3306,
    database: 'blog_system'
  }
  // redis
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}