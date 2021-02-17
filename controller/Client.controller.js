const { v4: uuidv4 } = require('uuid');
const { updated, deleted } = require('../store/httpMessages').success;
const { itemNotFound } = require('../store/httpMessages').clientError;
const { internalError } = require('../store/httpMessages').serverError;

const Client = require('../model/Client.model');

const ClientController = {
  async handleGetClients(req, res) {
    try {
      const { q } = req.query;

      // if q is defined, do a regex search. Else, return all elements
      const clientItems = q
        ? await Client.find({
            $or: [
              { clientName: { $regex: q, $options: 'i' } },
              { clientMail: { $regex: q, $options: 'i' } },
            ],
          })
        : await Client.find();
      res.status(200).send(clientItems);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleCreateClient(req, res) {
    try {
      const clientId = uuidv4();
      const { clientName, clientMail } = req.body;
      const newClient = await Client.create({
        clientId,
        clientName,
        clientMail,
      });
      res.status(201).send(newClient);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleUpdateClientByClientId(req, res) {
    try {
      const { clientId } = req.params;
      const { clientName, clientMail } = req.body;

      // Check if entry with clientId exists
      const found = await Client.findOne({ clientId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, update the item
      await Client.updateOne({ clientId }, { clientName, clientMail });
      res.status(200).send(updated);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleDeleteClientByClientId(req, res) {
    try {
      const { clientId } = req.params;

      // Check if entry with clientId exists
      const found = await Client.findOne({ clientId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, delete the item
      await Client.deleteOne({ clientId });
      res.status(200).send(deleted);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },
};

module.exports = ClientController;
