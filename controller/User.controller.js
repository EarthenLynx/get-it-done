const { updated, deleted } = require('../store/httpMessages').success;
const { itemNotFound } = require('../store/httpMessages').clientError;
const { internalError } = require('../store/httpMessages').serverError;

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');

const UserController = {
  async handleGetUsers(req, res) {
    try {
      const { q } = req.query;

      const userItems = q
        ? await User.find({
            $or: [
              { userName: { $regex: q, $options: 'i' } },
              { userMail: { $regex: q, $options: 'i' } },
            ],
          })
        : await User.find();
      res.status(200).send(userItems);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleGetUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      const userItem = await User.findOne({ id: userId });
      if (!userItem) {
        return res.status(404).send(itemNotFound);
      }

      return res.status(200).send(userItem);
    } catch (e) {
      console.log(e);
      return res.status(500).send(internalError);
    }
  },

  async handleUpdateUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      const { userName, userMail } = req.body;

      // Check if entry with listId exists
      const found = await User.findOne({ id: userId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, update the authentication and user entry
      await Auth.updateOne({ id: userId }, { userName: userMail });
      await User.updateOne({ id: userId }, { userName, userMail });
      res.status(200).send(updated);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleDeleteUserByUserId(req, res) {
    try {
      const { userId } = req.params;

      // Check if entry with userId exists
      const found = await User.findOne({ id: userId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, delete the item
      await Auth.deleteOne({ id: userId });
      await User.deleteOne({ id: userId });
      res.status(200).send(deleted);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },
};

module.exports = UserController;
