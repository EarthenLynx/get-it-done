const mongoose = require("mongoose");

const User = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  userMail: {type: String, required: true, unique: true},
  roles: { type: Array, required: true },
  registered: { type: Date },
  lastLogin: { type: Date }
});

module.exports = mongoose.model('User', User);