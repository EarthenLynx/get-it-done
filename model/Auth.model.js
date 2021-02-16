const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Auth', Auth);
