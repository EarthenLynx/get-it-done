const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { ok } = require('../store/httpMessages').success;
const {
  userExists,
  missingRequestBody,
  missingAuthHeaders,
  authNotFound,
  notAuthorizedAction,
} = require('../store/httpMessages').clientError;
const { internalError } = require('../store/httpMessages').serverError;

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');

const AuthController = {
  async handleSignupUser(req, res) {
    // Check if body is non - empty
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return res.status(400).send(missingRequestBody);
      // If body is non empty, extract variables and attempt to create a user
    }
    try {
      const { userName, password, userMail } = req.body;

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);

      const exists = await User.findOne({ userName });

      if (exists) {
        return res.status(400).send(userExists);
      }

      // Create the new DB entries and save them
      const auth = new Auth({
        userName,
        password: hash,
      });

      const user = new User({
        id: uuidv4(),
        userName,
        password,
        userMail,
        roles: ['guest'],
        registered: moment(),
        lastLogin: moment(),
      });

      const newAuth = await auth.save();
      const newUser = await user.save();

      res.status(200).send(newUser);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  },

  async handleAuthenticateUser(req, res) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return res.status(400).send(missingRequestBody);
    }

    try {
      const { userName, password } = req.body;

      // Try to find a user in database
      const exists = await Auth.findOne({ userName });
      if (!exists) {
        return res.status(404).send(authNotFound);
      }

      // Compare passwords
      const hash = bcrypt.compareSync(password, exists.password);
      if (!hash) {
        return res.status(404).send(authNotFound);
      }

      // Start the authorization process
      const authKey = uuidv4();
      const authValue = uuidv4();

      // Set the auth key within the process
      process.env[authKey] = authValue;

      // Create the JWT config and content
      const jwtPayload = { authKey, authValue };
      const jwtOptions = {
        audience: userName,
        issuer: req.hostname,
        expiresIn: '1m',
      };

      jwt.sign(
        jwtPayload,
        process.env.AUTH_SECRET,
        jwtOptions,
        (err, token) => {
          if (err) throw err;
          const headers = { 'x-auth-token': token };

          return res.status(200).set(headers).send(ok);
        }
      );
    } catch (e) {}
  },

  async handleLoginUser(req, res) {
    if (!req.headers['x-auth-token']) {
      return res.status(401).send(missingAuthHeaders);
    }
    try {
      const token = req.headers['x-auth-token'];
      jwt.verify(token, process.env.AUTH_SECRET, async (err, authPayload) => {
        if (err) {
          return res.status(403).send(notAuthorizedAction);
        } else {
          const { authKey, authValue } = authPayload;
          // Check if process variable has been set during authentication
          if (!process.env[authKey] === authValue) {
            delete process.env[authKey];
            return res.status(403).send(notAuthorizedAction);
            // If authentication is successful, perform login
          } else {
            delete process.env[authKey];
            const userName = authPayload.aud;
            const user = await User.findOneAndUpdate(
              { userName },
              { lastLogin: moment() }
            );
            // Build up payload and send back to client
            const userPayload = {
              roles: user.roles,
              id: user.id,
              userName: user.userName,
              userMail: user.userMail,
              lastLogin: user.lastLogin,
            };
            const jwtOptions = {
              expiresIn: '2h',
            };
            jwt.sign(
              userPayload,
              process.env.API_SECRET,
              jwtOptions,
              (err, userToken) => {
                if (err) throw err;
                const headers = { 'x-api-token': userToken };
                return res.status(200).set(headers).send({...ok, user: userPayload});
              }
            );
          }
        }
      });
    } catch (e) {
      return res.status(500).send(internalError);
    }
  },
};

module.exports = AuthController;
