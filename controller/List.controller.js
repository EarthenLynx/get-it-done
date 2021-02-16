const { v4: uuidv4 } = require('uuid');
const { ok } = require('../store/httpResponses').success;
const { itemNotFound } = require('../store/httpResponses').clientError;
const { internalError } = require('../store/httpResponses').serverError;

const List = require('../model/List.model');

const ListController = {
  async handleGetLists(_, res) {
    try {
      const listItems = await List.find();
      res.status(200).send(listItems);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleCreateList(req, res) {
    try {
      const listId = uuidv4();
      const { title, description } = req.body;
      const newList = await List.create({ listId, title, description });
      res.send(newList);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleUpdateListByListId(req, res) {
    try {
      const { listId } = req.params;
      const { title, description } = req.body;

      // Check if entry with listId exists
      const found = await List.findOne({ listId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, update the item
      await List.updateOne({ listId }, { title, description });
      res.status(200).send(ok);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleDeleteListByListId(req, res) {
    try {
      const { listId } = req.params;

      // Check if entry with listId exists
      const found = await List.findOne({ listId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, delete the item
      await List.deleteOne({ listId });
      res.status(204).send(ok);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },
};

module.exports = ListController;
