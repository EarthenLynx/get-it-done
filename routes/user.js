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
 *             description: The date of the record creation.
 *           example:
 *             title: Household
 *             text: Wash the dishes and clean the laundry
 *             finished: false
 *             createdAt: 2020-08-01T13:12:44
 */

/**
 * @swagger
 *   tags:
 *     name: Users
 *     description: API to return the users
 */

/**
 * @swagger
 *   /user:
 *     get:
 *       summary: Returns a single user
 *       tags: [Users]
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: todos
 *           schema:
 *             type: array
 */

const router = require("express").Router();

router.get('/', (req, res) => console.log("hit user route"));

module.exports = router;