const model = require('../models/model.js');

const login = (req, res) => {
  const authHeader = req.headers.authorization;
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  //console.log(username);
  model.User.findOne({ username: username })
    .then(user => {
      if (!user) {
        // 如果用户名不存在，返回错误信息
        res.status(401).send('Your username does not exist' );
      }
      // 使用实例方法 comparePassword 验证用户密码
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          // 如果密码匹配，返回用户信息
          res.status(200).send('login successful!');
        } else {
          // 如果密码不匹配，返回错误信息
          res.status(401).send('Your password is not correct');
        }
      });
    })
    .catch(err => {
      throw err;
    });
};


const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 创建新用户
    const user = new model.User({ username, password });

    // 保存新用户
    await user.save();

    // 如果保存成功，返回用户信息
    res.status(201).send('User created successfully');
  } catch (err) {
    // 如果保存失败，返回错误信息
    if (err.code === 11000) {
      res.status(401).send('Username already exists' );
    } else {res.status(500).send('An error occurred while saving user');}
  }
};


module.exports = {login, register};
