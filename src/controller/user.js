const loginFn = (username, password) => {
  // 先使用假数据
  if (username === 'admin' && password === 'admin') {
    return true;
  }
  return false;
}
module.exports = {
  loginFn
}