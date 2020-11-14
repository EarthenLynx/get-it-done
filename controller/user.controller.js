const model = require("../model/low.model");

const handleWriteUser = (req, res) => {
  const payload = req.body;

  model.writeUser(payload)
    .then()
    .catch(err => res.status(500).send({ msg: `An error occured while writing User: ${err}` }))
}

const handleGetUsers = (req, res) => {
  model.getUser()
    .then(data => res.send({ msg: 'Successfully fetched users from database', data }))
    .catch(err => res.status(500).send({ msg: `An error occured while writing User: ${err}` }))
}

const handleGetUserById = (req, res) => {
  const id = req.params.id;

  model.getUserById(id)
    .then(data => res.send({ msg: 'Successfully fetched users from database', data }))
    .catch(err => res.status(500).send({ msg: `An error occured while writing User: ${err}` }))

}

module.exports = { handleWriteUser, handleGetUsers, handleGetUserById }