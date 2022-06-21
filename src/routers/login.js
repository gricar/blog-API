const express = require('express');

const login = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, login);

module.exports = loginRoute;
