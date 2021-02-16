const router = require('express').Router();
const OperatorController = require('../../../controller/Operator.controller');
const { verifyUser, verifyGuest } = require('../../../middleware/verifyUser');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');

router.get('/', verifyGuest, (req, res) => {
  OperatorController.handleGetOperators(req, res);
});

router.post('/', verifyGuest, noEmptyPayload, (req, res) => {
  OperatorController.handleCreateOperator(req, res);
});

router.put('/:operatorId', verifyGuest, noEmptyPayload, (req, res) => {
  OperatorController.handleUpdateOperatorByOperatorId(req, res);
});

router.delete('/:operatorId', verifyGuest, (req, res) => {
  OperatorController.handleDeleteOperatorByOperatorId(req, res);
});

module.exports = router;
