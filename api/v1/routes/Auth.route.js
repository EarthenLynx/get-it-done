const router = require('express').Router();
const AuthController = require('../../../controller/Auth.controller');

router.get('/authenticate', (req, res) => {
  return AuthController.handleAuthenticateUser(req, res);
});

router.get('/login', (req, res) => {
  return AuthController.handleLoginUser(req, res);
});

router.post('/signup', (req, res) => {
  return AuthController.handleSignupUser(req, res);
});

module.exports = router;
