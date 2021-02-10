const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { userExists, missingRequestBody } = require('../store/httpResponses').clientError;
const { internalError } = require('../store/httpResponses').serverError;

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');

const AuthController = {
  async handleSignupUser(req, res) {
    // Check if body is non - empty
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).send(missingRequestBody);
      // If body is non empty, extract variables and attempt to create a user
    } else {
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
    }
  },

  handleAuthenticateUser(req, res) {},

  handleLoginUser(req, res) {},
};

module.exports = AuthController;
