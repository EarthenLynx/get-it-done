/**
 * @swagger
 *
 *  components:
 *    schemas:
 *      Todo:
 *        type: object
 *        required:
 *          - text
 *          - finished
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the task.
 *          title:
 *            type: string
 *            description: What is the task's title?
 *          text:
 *            type: string
 *            description: What is the goal of the task?
 *          finished:
 *            type: boolean
 *            description: Is the task done or not?
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           title: Household
 *           text: Wash the dishes and clean the laundry
 *           finished: false
 *           createdAt: 2020-08-01T13:12:44
 */


/**
* @swagger
* /:
*   get:
*     description: Returns todos
*     produces:
*      - application/json
*     responses:
*       200:
*         description: todos
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Todo'
 */
const router = require("express").Router();

router.get('/', (req, res) => console.log("hit todo route"));

module.exports = router;