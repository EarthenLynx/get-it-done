const { missingRequestBody } = require('../store/httpResponses').clientError;

const noEmptyPayload = (req, res, next) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return res.status(400).send(missingRequestBody);
  } else {
    next();
  }
};

module.exports = { noEmptyPayload };
