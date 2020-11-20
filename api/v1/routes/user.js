const router = require('express').Router();
const {
	handleWriteUser,
	handleGetUsers,
	handleGetUserById,
	handleUpdateUserById,
	handleDeleteUserById,
} = require('../../../controller/user.controller');

router.get('/', (req, res) => {
	return handleGetUsers(req, res);
});
router.post('/', (req, res) => {
	return handleWriteUser(req, res);
});

router.get('/:id', (req, res) => {
	return handleGetUserById(req, res);
});
router.put('/:id', (req, res) => {
	return handleUpdateUserById(req, res);
});
router.delete('/:id', (req, res) => {
	return handleDeleteUserById(req, res);
});

module.exports = router;
