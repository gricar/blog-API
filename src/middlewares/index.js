const auth = require('./auth');
const error = require('./error');
const validateLogin = require('./validateLogin');
const validateNewCategory = require('./validateNewCategory');
const validateNewPost = require('./validateNewPost');
const validateNewUser = require('./validateNewUser');
const validatePostEdit = require('./validatePostEdit');

module.exports = {
  auth,
  error,
  validateLogin,
  validateNewCategory,
  validateNewPost,
  validateNewUser,
  validatePostEdit,
};