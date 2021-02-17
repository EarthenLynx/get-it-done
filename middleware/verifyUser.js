const jwt = require('jsonwebtoken');
const {
  missingAuthHeaders,
  notAuthorizedResource,
} = require('../store/httpMessages').clientError;

const authorizeThisUser = (req, res, next) => {
  const { userId: userIdUrl } = req.params;
  const { id: userIdSession } = req.session;

  if (userIdSession.toString() !== userIdUrl.toString()) {
    console.log(
      `User ${userIdSession} tried to access data for user ${userIdUrl} on route ${req.originalUrl}`
    );
    return res.status(401).send(notAuthorizedResource);
  } else {
    next();
  }
};

const authorizeRole = (req, res, next, rolename) => {
  if (!req.headers.authorization) {
    return res.status(401).send(missingAuthHeaders);
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.API_SECRET, {}, (err, session) => {
    if (err || !session.roles.includes(rolename)) {
      return res.status(401).send(notAuthorizedResource);
    }
    req.session = session;
    next();
  });
};

const verifyGuest = (req, res, next) => {
  authorizeRole(req, res, next, 'guest');
};

const verifyUser = (req, res, next) => {
  authorizeRole(req, res, next, 'user');
};

const verifyAdmin = (req, res, next) => {
  authorizeRole(req, res, next, 'admin');
};

module.exports = { authorizeThisUser, verifyGuest, verifyUser, verifyAdmin };
