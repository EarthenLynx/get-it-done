const jwt = require('jsonwebtoken');
const {
  missingAuthHeaders,
  notAuthorizedResource,
} = require('../store/httpResponses').clientError;

const verifyUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send(missingAuthHeaders);
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.API_SECRET, {}, (err, session) => {
    if (err) {
      return res.status(401).send(notAuthorizedResource);
    }
    req.session = session
    next();
  });
};

module.exports = verifyUser;
