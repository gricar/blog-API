const express = require('express');

const user = require('../controllers/user.controller');
const validateNewUser = require('../middlewares/validateNewUser');

const userRoute = express.Router();

userRoute.post('/', validateNewUser, user.create);

module.exports = userRoute;
