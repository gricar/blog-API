const express = require('express');

const categories = require('../controllers/categories.controller');
const { validateNewCategory } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', validateNewCategory, categories.create);
categoriesRoute.get('/', categories.getAll);

module.exports = categoriesRoute;
