const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { ok } = require('../store/httpResponses').success;
const {
  userExists,
  missingRequestBody,
  authNotFound,
} = require('../store/httpResponses').clientError;
const { internalError } = require('../store/httpResponses').serverError;

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
      const { username, password, email } = req.body;

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);

      const exists = await User.findOne({ username });

      if (exists) {
        return res.status(400).send(userExists);
      }

      // Create the new DB entries and save them
      const auth = new Auth({
        username,
        password: hash,
      });

      const user = new User({
        id: uuidv4(),
        username,
        password,
        email,
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
      const { username, password } = req.body;

      // Try to find a user in database
      const exists = await Auth.findOne({ username });
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
      const jwtName = process.env.AUTH_TOKEN_NAME;
      const jwtSignature = process.env.AUTH_SECRET;
      const jwtOptions = {
        audience: process.env.API_VERSION,
        issuer: req.hostname,
        expiresIn: '1m',
      };

      jwt.sign(jwtPayload, jwtSignature, jwtOptions, (err, token) => {
        if (err) throw err;
        console.log(token);
        const headers = { 'x-api-token': token };

        return res.status(200).set(headers).send(ok);
      });
    } catch (e) {}
  },

  handleLoginUser(req, res) {},
};

module.exports = AuthController;
