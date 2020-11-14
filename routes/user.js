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
 *             username: John Doe
 *             city: Chicago
 *             street: 5th Av.
 *             housenum: 25
 *             createdAt: 2020-08-01T13:12:44
 */

/**
 * @swagger
 *   tags:
 *     name: Users
 *     description: API to return the users
 */




const router = require("express").Router();

/**
 * @swagger
 *   /user:
 *     get:
 *       summary: Returns a list of all users
 *       tags: [Users]
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: todos
 *           schema:
 *             type: array
 */

router.get('/', (req, res) => {
  res.send({ msg: "Successfully hit the user route" })
});


/**
 * @swagger
 *   /user/:id:
 *     get:
 *       summary: Returns a user by its id
 *       tags: [Users]
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *           description: todos
 *           schema:
 *             type: array
 */
router.get('/:id', (req, res) => {
  res.send({ msg: "Successfully hit the user id route" })
});

module.exports = router;