const { v4: uuidv4 } = require('uuid');
const { updated, deleted } = require('../store/httpMessages').success;
const { itemNotFound } = require('../store/httpMessages').clientError;
const { internalError } = require('../store/httpMessages').serverError;

const Operator = require('../model/Operator.model');

const OperatorController = {
  async handleGetOperators(req, res) {
    try {
      const { q } = req.query;

      // if q is defined, do a regex search. Else, return all elements
      const operatorItems = q
        ? await Operator.find({
            $or: [
              { operatorName: { $regex: q, $options: 'i' } },
              { operatorMail: { $regex: q, $options: 'i' } },
            ],
          })
        : await Operator.find();
      res.status(200).send(operatorItems);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleCreateOperator(req, res) {
    try {
      const operatorId = uuidv4();
      const { operatorName, operatorMail } = req.body;
      const newOperator = await Operator.create({
        operatorId,
        operatorName,
        operatorMail,
      });
      res.status(201).send(newOperator);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleUpdateOperatorByOperatorId(req, res) {
    try {
      const { operatorId } = req.params;
      const { operatorName, operatorMail } = req.body;

      // Check if entry with operatorId exists
      const found = await Operator.findOne({ operatorId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, update the item
      await Operator.updateOne({ operatorId }, { operatorName, operatorMail });
      res.status(200).send(updated);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleDeleteOperatorByOperatorId(req, res) {
    try {
      const { operatorId } = req.params;

      // Check if entry with operatorId exists
      const found = await Operator.findOne({ operatorId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, delete the item
      await Operator.deleteOne({ operatorId });
      res.status(200).send(deleted);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },
};

module.exports = OperatorController;
