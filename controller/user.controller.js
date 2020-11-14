const model = require('../model/user.model');

const handleWriteUser = (req, res) => {
	console.log(req.body);
	const user = req.body;

	model
		.writeUser(user)
		.then(() => res.send({ msg: 'Successfully wrote user into database' }))
		.catch(err =>
			res
				.status(500)
				.send({ msg: `An error occured while writing User: ${err}` })
		);
};

const handleGetUsers = (req, res) => {
	model
		.getUser()
		.then(data =>
			res.send({ msg: 'Successfully fetched users from database', data })
		)
		.catch(err =>
			res
				.status(500)
				.send({ msg: `An error occured while writing User: ${err}` })
		);
};

const handleGetUserById = (req, res) => {
	const id = req.params.id;

	model
		.getUserById(id)
		.then(data =>
			res.send({ msg: 'Successfully fetched users from database', data })
		)
		.catch(err =>
			res
				.status(500)
				.send({ msg: `An error occured while getting User: ${err}` })
		);
};

const handleUpdateUserById = (req, res) => {
	const id = req.params.id;
	const payload = req.body;

	model
		.updateUserById(id, payload)
		.then(data =>
			res.send({
				status: 'success',
				msg: `User with id ${id} has been updated successfully`,
				data,
			})
		)
		.catch(err =>
			res.send({
				status: 'error',
				msg: 'User could not be updated',
				err,
			})
		);
};

const handleDeleteUserById = (req, res) => {
	const id = req.params.id;

	model
		.deleteUserById(id)
		.then(() =>
			res.send({
				status: 'success',
				msg: `User with id ${id} has been deleted successfully`,
			})
		)
		.catch(err =>
			res.status(500).send({
				status: 'error',
				msg: 'User could not be deleted',
				err,
			})
		);
};

module.exports = {
	handleWriteUser,
	handleGetUsers,
	handleGetUserById,
	handleUpdateUserById,
	handleDeleteUserById,
};
