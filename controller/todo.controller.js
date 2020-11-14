const model = require("../model/low.model");

const handleWriteTodo = (req, res) => {
  const payload = req.body;

  model.writeTodo(payload)
    .then()
    .catch(err => res.status(500).send({ msg: `An error occured while writing todo: ${err}` }))
}

const handleGetTodos = (req, res) => {
  model.getTodo()
    .then(data => res.send({ msg: 'Successfully fetched todos from database', data }))
    .catch(err => res.status(500).send({ msg: `An error occured while writing todo: ${err}` }))
}

const handleGetTodoById = (req, res) => {
  const id = req.params.id;

  model.getTodoById(id)
    .then(data => res.send({ msg: 'Successfully fetched todo from database', data }))
    .catch(err => res.status(500).send({ msg: `An error occured while writing todo: ${err}` }))

}

module.exports = { handleWriteTodo, handleGetTodos, handleGetTodoById }