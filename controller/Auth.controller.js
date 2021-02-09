const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');

const AuthController = {
  async handleSignupUser(req, res) {
    // Check if body is non - empty
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).send({
        status: 'client-error',
        msg: 'The request did not contain a body.',
      });
      // If body is non empty, extract variables and attempt to create a user
    } else {
      try {
        const id = uuidv4();
        const { username, password, email } = req.body;
        const registered = moment();
        const lastLogin = moment();

        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);

        // const exists = await UserSchema.findOne({ username });

        // console.log(exists);

        // if (exists) {
        //   return res.status(400).send({
        //     status: 'client-error',
        //     msg: 'The username is already taken, please choose another',
        //   });
        // }

        // Create the new DB entries
        const auth = new Auth({
          username,
          password: hash,
        });

        const user = new User({
          id,
          username,
          password,
          email,
          registered,
          lastLogin,
        });

        const newAuth = await auth.save();
        const newUser = await user.save();

        res.status(200).send(newUser);
        // Create
      } catch (e) {
        throw e;
        res.status(500).send(e.message);
      }
    }
  },

  handleAuthenticateUser(req, res) {},

  handleLoginUser(req, res) {},
};

module.exports = AuthController;
