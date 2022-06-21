const express = require('express');

const categories = require('../controllers/categories.controller');
const { auth, validateNewCategory } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', auth, validateNewCategory, categories.create);

module.exports = categoriesRoute;
