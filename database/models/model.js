const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  }],
});

// 加密用户密码
UserSchema.pre('save', function (next) {
  const user = this;

  // 只在密码有修改或新建用户时执行
  if (!user.isModified('password')) return next();

  // 生成盐值并使用盐值加密密码
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// 验证用户密码
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
});

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
const Topic = mongoose.model('Topic', TopicSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { User, Topic, Message };
