const router = require('express').Router();
const UserController = require('../../../controller/User.controller');
const { verifyUser, verifyGuest } = require('../../../middleware/verifyUser');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');

router.get('/', verifyGuest, (req, res) => {
  UserController.handleGetUsers(req, res);
});

router.get('/:userId', verifyGuest, (req, res) => {
  UserController.handleGetUserByUserId(req, res);
});

router.put('/:userId', verifyGuest, noEmptyPayload, (req, res) => {
  UserController.handleUpdateUserByUserId(req, res);
});

router.delete('/:userId', verifyGuest, (req, res) => {
  UserController.handleDeleteUserByUserId(req, res);
});

module.exports = router;
