const path = require('path');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

// Initialize the DB adapter
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const userAdapter = new FileSync(path.join(__dirname, '../store/db.json'));
const db = low(userAdapter);

// TODO Replace this file with the actual model of your API
const lowModel = {
	writeUser(user) {
		db.defaults({ users: [] }).write();
		return new Promise((resolve, reject) => {
			user.id = uuidv4();
			user.createdAt = moment();
			if (!user.username || !user.city || !user.street || !user.housenum) {
				reject('Please provide all mandatory information');

				// If all fields are filled, continue
			} else {
				db.get('users').push(user).write();
				resolve(db.get('users').find({ id: user.id }));
			}
		});
	},

	getUser() {
		return new Promise(resolve => {
			resolve(db.get('users').value());
		});
	},

	getUserById(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('No id was provided');
			} else {
				resolve(db.get('users').find({ id: id }).value());
			}
		});
	},

	updateUserById(id, payload) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('No id was provided');
			} else if (
				!payload.username &&
				!payload.city &&
				!payload.street &&
				!payload.housenum
			) {
				reject('There are no values to be updated');
			} else {
				db.get('users').find({ id: id }).assign(payload).write();
				resolve(db.get('users').find({ id: id }).value());
			}
		});
	},

	deleteUserById(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('No id was provided');
			} else {
				db.get('users').delete({ id: id }).write();
				resolve();
			}
		});
	},
};

module.exports = lowModel;
