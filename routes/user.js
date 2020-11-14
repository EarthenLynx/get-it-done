/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         required:
 *           - username
 *           - city
 *           - street
 *           - housenum
 *         properties:
 *           id:
 *             type: integer
 *             description: The auto-generated id of the User.
 *           username:
 *             type: string
 *             description: Name of the user
 *           city:
 *             type: string
 *             description: What city does the user live in?
 *           street:
 *             type: string
 *             description: What street does the user live in?
 *           housenum:
 *             type: string
 *             description: What house number does the user live in?
 *           createdAt:
 *             type: string
 *             format: date
 *             description: The date of the record creation. Will be automatially added when user is created
 */

/**
 * @swagger
 *   tags:
 *     name: Users
 *     description: API endpoint to handle user data
 */




const router = require("express").Router();
const { handleWriteUser, handleGetUsers, handleGetUserById } = require("../controller/user.controller");

/**
 * @swagger
 *   /user:
 *     get:
 *       summary: Returns a list of all users
 *       tags: [Users]
 *       consumes:
 *        - application/json
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: Returns the users saved in the DB as an array
 *           schema:
 *             type: array
 *             $ref: '#/components/schemas/User'
 *
 *     post:
 *       summary: Creates a new user and writes it to the database
 *       tags: [Users]
 *       consumes:
 *        - application/json
 *       produces:
 *        - application/json
 *       parameters:
 *        - name: user
 *          required: true
 *          description: User that is to be created
 *          in: body
 *          schema:
 *            $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Bad request. Not all necessary params have been provided
 */

router.get('/', (req, res) => handleGetUsers(req, res));
router.post('/', (req, res) => handleWriteUser(req, res));


/**
 * @swagger
 *   /user/:id:
 *     get:
 *       summary: Returns a user by its id
 *       tags: [Users]
 *       consumes:
 *        - application/json
 *       produces:
 *        - application/json
 *       parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Unique ID of the user
 *       responses:
 *         200:
 *           description: Users
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 */
router.get('/:id', (req, res) => handleGetUserById(req, res));

module.exports = router;