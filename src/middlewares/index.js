const auth = require('./auth');
const error = require('./error');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validateNewCategory = require('./validateNewCategory');

module.exports = {
  auth,
  error,
  validateLogin,
  validateNewUser,
  validateNewCategory,
};