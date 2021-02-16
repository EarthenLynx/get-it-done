const mongoose = require('mongoose');

const List = new mongoose.Schema(
  {
    listId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  }
);

module.exports = mongoose.model('List', List);
