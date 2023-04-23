const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/VoiceAI');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

module.exports = store;
