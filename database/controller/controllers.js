const model = require('../models/model.js');

const login = (req, res) => {
  const { username, password } = req.body;
  // 查找用户名是否存在
  model.User.findOne({ username: username }, (err, user) => {
    if (err) throw err;

    if (!user) {
      // 如果用户名不存在，返回错误信息
      return res.status(401).json({ message: 'Your username does not exist' });
    }

    // 使用实例方法 comparePassword 验证用户密码
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        // 如果密码匹配，返回用户信息
        res.status(200).send('login successful!');
      } else {
        // 如果密码不匹配，返回错误信息
        res.status(401).send({ message: 'Your password is not correct' });
      }
    });
  });
};

module.exports = {login};
