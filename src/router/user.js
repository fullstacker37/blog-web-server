const { loginFn } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/responseModel');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginFn(username, password);
    console.log(username, password, result);
    if (result) {
      return new SuccessModel();
    }
    return new ErrorModel('登录失败');
  }
}

module.exports = handleUserRouter;