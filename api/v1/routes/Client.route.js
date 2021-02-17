const router = require('express').Router();
const ClientController = require('../../../controller/Client.controller');
const { verifyUser, verifyGuest } = require('../../../middleware/verifyUser');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');

router.get('/', verifyGuest, (req, res) => {
  ClientController.handleGetClients(req, res);
});

router.post('/', verifyGuest, noEmptyPayload, (req, res) => {
  ClientController.handleCreateClient(req, res);
});

router.put('/:clientId', verifyGuest, noEmptyPayload, (req, res) => {
  ClientController.handleUpdateClientByClientId(req, res);
});

router.delete('/:clientId', verifyGuest, (req, res) => {
  ClientController.handleDeleteClientByClientId(req, res);
});

module.exports = router;
