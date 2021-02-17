const mongoose = require('mongoose');

const Client = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientMail: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Client', Client);
