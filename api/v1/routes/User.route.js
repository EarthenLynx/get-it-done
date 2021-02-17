const router = require('express').Router();
const UserController = require('../../../controller/User.controller');
const {
  verifyUser,
  verifyGuest,
  authorizeThisUser,
} = require('../../../middleware/verifyUser');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');

router.get('/', verifyGuest, (req, res) => {
  UserController.handleGetUsers(req, res);
});

router.get('/:userId', verifyGuest, authorizeThisUser, (req, res) => {
  UserController.handleGetUserByUserId(req, res);
});

router.put('/:userId', verifyGuest, authorizeThisUser, noEmptyPayload, (req, res) => {
  UserController.handleUpdateUserByUserId(req, res);
});

router.delete('/:userId', verifyGuest, authorizeThisUser, (req, res) => {
  UserController.handleDeleteUserByUserId(req, res);
});

module.exports = router;
