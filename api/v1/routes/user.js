/**
 *@openapi
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the User.
 *            example: '879127udh12f23'
 *          username:
 *            type: string
 *            description: Name of the user
 *            example: 'John Doe'
 *          city:
 *            type: string
 *            description: What city does the user live in?
 *            example: 'Chicago'
 *          street:
 *            type: string
 *            description: What street does the user live in?
 *            example: '5th Av.'
 *          housenum:
 *            type: string
 *            description: What house number does the user live in?
 *            example: '25'
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation. Will be automatially added when user is created
 *            example: '2020-11-14T11:51:48.402Z'
 *      UserException:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *            description: The description of the error status.
 *            example: 'not-found'
 *          msg:
 *            type: string
 *            description: The message that is linked to this error
 *            example: 'The user you are looking for could not be found'
 *      UserExceptionError:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *            description: The description of the error status.
 *            example: 'error'
 *          msg:
 *            type: string
 *            description: The message that is linked to this error
 *            example: 'An unexpected error occured: (err)'
 */

const router = require('express').Router();
const {
	handleWriteUser,
	handleGetUsers,
	handleGetUserById,
} = require('../../../controller/user.controller');

/**
 *@openapi
 *  /user:
 *    get:
 *      summary: Returns a list of all users from the database
 *      tags: [Users]
 *      produces:
 *       - application/json
 *      responses:
 *        200:
 *          description: Returns the users saved in the DB as an array
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *        404:
 *          description: Returns an object describing the not-found exception that occured
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserException'
 *        500:
 *          description: Returns an object describing the unexpected server error that occured
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserExceptionError'
 *    post:
 *      summary: Creates a new user and writes it to the database
 *      tags: [Users]
 *      consumes:
 *      	- application/json
 *      produces:
 *      	- application/json
 *      requestBody:
 *        description: Do a post request towards the database
 *        required: true,
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: OK
 *        500:
 *          description: Bad request. Not all necessary params have been provided
 */

router.get('/', (req, res) => handleGetUsers(req, res));
router.post('/', (req, res) => handleWriteUser(req, res));

/**
 *@openapi
 *  /user/{id}:
 *    get:
 *      summary: Returns a user by its id
 *      tags: [Users]
 *      consumes:
 *      	- application/json
 *      produces:
 *      	- application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Unique ID of the user
 *      responses:
 *        200:
 *          description: Users
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 */
router.get('/:id', (req, res) => handleGetUserById(req, res));

module.exports = router;
