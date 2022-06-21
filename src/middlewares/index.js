const auth = require('./auth');
const error = require('./error');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');

module.exports = {
  auth,
  error,
  validateLogin,
  validateNewUser,
};