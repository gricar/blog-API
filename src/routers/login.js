const express = require('express');

const login = require('../controllers/login.controller');
const validateLogin = require('../middlewares/validateLogin');

const loginRoute = express.Router();

loginRoute.post('/login', validateLogin, login);

module.exports = loginRoute;
