const router = require('express').Router();
const AuthController = require('../../../controller/Auth.controller');

router.post('/authenticate', (req, res) => {
  return AuthController.handleAuthenticateUser(req, res);
});

router.post('/login', (req, res) => {
  return AuthController.handleLoginUser(req, res);
});

router.post('/signup', (req, res) => {
  return AuthController.handleSignupUser(req, res);
});

module.exports = router;
