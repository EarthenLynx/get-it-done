const { missingRequestBody } = require('../store/httpMessages').clientError;

const noEmptyPayload = (req, res, next) => {
  if (
    Object.keys(req.body).length === 0 &&
    req.body.constructor === Object &&
    Object.keys(req.body).every((key) => req.body[key])
  ) {
    return res.status(400).send(missingRequestBody);
  } else {
    next();
  }
};

module.exports = { noEmptyPayload };
