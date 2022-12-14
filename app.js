const querystring = require('querystring');
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// session 信息
const SESSION_DATA = {}

// 设置 cookie 过期时间
const setCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 *1000)
  return d.toGMTString()
}

// 处理 POST data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
      // console.log('postData--------------: ', postData);
    })
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return
      }
      resolve(JSON.parse(postData));
    })
  });
  return promise;
}

const serverHandle = (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');
  console.log('exec')
  // 获取 path
  const url = req.url;
  req.path = url.split('?')[0];

  // 处理 query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) { return }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })

  // // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析 session （使用redis）
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中的 session 值
    set(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    // 处理 post data
    return getPostData(req)
  })
  .then(postData => {
    req.body = postData;
    // 处理 user 路由
    const userRusult = handleUserRouter(req, res);
    if (userRusult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`) // httpOnly 只允许服务端修改 cookie
      }
      userRusult.then(userData => {
        res.end(JSON.stringify(userData));
      })
      return;
    }
    
    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`) // httpOnly 只允许服务端修改 cookie
      }
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      })
      return;
    }

    // 未命中路由返回 404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  })
}

module.exports = serverHandle;