const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient()
redisClient.on('error', err => {
  console.error(err)
})

// 测试
redisClient.set('myname', 'zhangsan', redis.print) // redis.print 会等 set 完之后打印出来是不是操作 OK Reply: OK
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('val:::: ', val)

  // 退出
  redisClient.quit()
})