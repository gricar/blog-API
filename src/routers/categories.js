const express = require('express');

const categories = require('../controllers/categories.controller');
const { auth, validateNewCategory } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', auth, validateNewCategory, categories.create);
categoriesRoute.get('/', auth, categories.getAll);

module.exports = categoriesRoute;
