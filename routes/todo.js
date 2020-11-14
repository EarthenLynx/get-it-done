/**
 * @swagger
 *   components:
 *     schemas:
 *       Todo:
 *         type: object
 *         required:
 *           - text
 *         properties:
 *           id:
 *             type: integer
 *             description: The auto-generated id of the task.
 *           title:
 *             type: string
 *             description: What is the task's title?
 *           text:
 *             type: string
 *             description: What is the goal of the task?
 *           finished:
 *             type: boolean
 *             description: Is the task done or not?
 *           createdAt:
 *             type: string
 *             format: date
 *             description: The date of the record creation.
 *         example:
 *            title: Household
 *            text: Wash the dishes and clean the laundry
 *            finished: false
 *            createdAt: 2020-08-01T13:12:44
 */

/**
 * @swagger
 *   tags:
 *     name: Todos
 *     description: API to return the Todos
 */

const router = require("express").Router();
const { handleWriteTodo, handleGetTodos, handleGetTodoById } = require("../controller/todo.controller")

/**
 * @swagger
 *   /todo:
 *     get:
 *       description: Returns a list of all todos
 *       tags: [Todos]
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: Array of todos that have been returned by db query
 *           schema:
 *             type: array
 *     post:
 *      description: Writes a single todo object into the database.
 *      tags: [Todos]
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: Status message to indicate todo has been written to db
 *          schema:
 *            type: object
 */

router.get('/', (req, res) => handleGetTodos(req, res));
router.post('/', (req, res) => handleWriteTodo(req, res))

/**
 * @swagger
 *   /todo/:id:
 *     get:
 *       description: Returns a todo by its id
 *       tags: [Todos]
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: todos
 *           schema:
 *             type: object
 */

router.get('/:id', (req, res) => handleGetTodoById(req, res));

module.exports = router;