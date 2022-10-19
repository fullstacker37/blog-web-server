const { loginFn } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/responseModel');

// 设置 cookie 过期时间
const setCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 *1000)
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginFn(username, password);
    return result.then(data => {
      if (data.username) {
        // 操作 cookie
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${setCookieExpires()}`) // httpOnly 只允许服务端修改 cookie
        return new SuccessModel();
      }
      return new ErrorModel('登录失败');
    })
  }

  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return new SuccessModel()
    }
    return new ErrorModel('尚未登录')
  }
}

module.exports = handleUserRouter;