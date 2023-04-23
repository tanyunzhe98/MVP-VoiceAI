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
          res.status(200).send(user);
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
    res.status(201).send(user);
  } catch (err) {
    // 如果保存失败，返回错误信息
    if (err.code === 11000) {
      res.status(401).send('Username already exists' );
    } else {res.status(500).send('An error occurred while saving user');}
  }
};

const addtopic = async (req, res) => {
  //console.log('nameowner',req.body);
  const { name, owner } = req.body;

  try {
  // 创建新 topic
  const topic = new model.Topic({ name, owner });
  // 保存新 topic
  await topic.save();

  // 将新 topic 添加到 owner 的 topics 中
  const user = await model.User.findByIdAndUpdate(owner, { $push: { topics: topic._id } });

  // 如果保存成功，返回 topic 信息
  res.status(201).send(topic);

  } catch (err) {
  // 如果保存失败，返回错误信息
  res.status(500).send('An error occurred while saving topic');
  }
  };

const gettopics = async (req, res) => {
  const { user_id: id } = req.params;
  console.log('id',id);
    try {
      // 查询所有话题
      const topics = await model.Topic.find({ owner: id });
      // 如果查询成功，返回所有话题
      res.status(200).send(topics);
    } catch (err) {
      // 如果查询失败，返回错误信息
      res.status(500).send('An error occurred while getting topics');
    }
  };

const updatetopic = async (req, res) => {
  // console.log('req.params',req.params);
  // console.log('req.body',req.body);
  const { topic_id: oldname } = req.params;
  const { name: newname } = req.body;
  try {
  // 更新 topic 名称
  //const topic = await model.Topic.findByIdAndUpdate(id, { name }, { new: true });
  const topic = await model.Topic.findOneAndUpdate({ name: oldname }, { name: newname }, { new: true });

  // 如果更新成功，返回 topic 信息
  res.status(200).send(topic);

} catch (err) {
  // 如果更新失败，返回错误信息
  res.status(500).send('An error occurred while updating topic');
  }
  };

const deletetopic = async (req, res) => {
  const { topic_id: id } = req.params;

  try {
  // 删除 topic
  await model.Topic.findByIdAndDelete(id);

  // 将 topic 从 owner 的 topics 中移除
  const topic = await model.Topic.findById(id);
  const user = await model.User.findByIdAndUpdate(topic.owner, { $pull: { topics: topic._id } });

// 如果删除成功，返回空响应
  res.status(204).send();
  } catch (err) {
  // 如果删除失败，返回错误信息
  res.status(500).send('An error occurred while deleting topic');
  }
};

module.exports = {login, register, gettopics, addtopic, updatetopic, deletetopic};
