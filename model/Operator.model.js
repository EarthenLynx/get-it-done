const mongoose = require('mongoose');

const Operator = new mongoose.Schema({
  operatorId: { type: String, required: true, unique: true },
  operatorName: { type: String, required: true },
  operatorMail: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Operator', Operator);
