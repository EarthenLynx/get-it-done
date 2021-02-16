const router = require('express').Router();
const ListController = require('../../../controller/List.controller');
const { verifyUser, verifyGuest } = require('../../../middleware/verifyUser');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');

router.get('/', verifyGuest, (req, res) => {
  ListController.handleGetLists(req, res);
});

router.post('/', verifyGuest, noEmptyPayload, (req, res) => {
  ListController.handleCreateList(req, res);
});

router.put('/:listId', verifyGuest, noEmptyPayload, (req, res) => {
  ListController.handleUpdateListByListId(req, res);
});

router.delete('/:listId', verifyGuest, (req, res) => {
  ListController.handleDeleteListByListId(req, res);
});

module.exports = router;
