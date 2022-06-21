const express = require('express');

const user = require('../controllers/user.controller');
const { auth, validateNewUser } = require('../middlewares');

const userRoute = express.Router();

userRoute.post('/', validateNewUser, user.create);
userRoute.get('/', auth, user.getAll);
userRoute.get('/:id', auth, user.findById);

module.exports = userRoute;
