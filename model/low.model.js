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
	writeTodo(todo) {
		db.defaults({ users: [{}], todos: [{}] }).write();
		return new Promise((resolve, reject) => {
			todo.id = uuidv4();
			todo.createdAt = moment();
			if (!todo.finished) todo.finished = false;

			db.get('todos').push(todo).write();
			resolve();
		});
	},

	writeUser(user) {
		db.defaults({ users: [], todos: [] }).write();
		return new Promise((resolve, reject) => {
			user.id = uuidv4();
			user.createdAt = moment();
			if (!user.username || !user.city || !user.street || !user.housenum) {
				reject('Please provide all mandatory information');

				// If all fields are filled, continue
			} else {
				db.get('users').push(user).write();
				resolve();
			}
		});
	},

	getTodo() {
		return new Promise((resolve, reject) => {
			resolve(db.get('todos').value());
		});
	},

	getTodoById(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('Please provide an ID');
			} else {
				resolve(db.get('todos').filter({ id: id }).value());
			}
		});
	},

	getUser() {
		return new Promise((resolve, reject) => {
			resolve(db.get('users').value());
		});
	},
	getUserById(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('Please provide an ID');
			} else {
				console.log(id);
				resolve(db.get('users').find({ id: id }).value());
			}
		});
	},
};

module.exports = lowModel;
