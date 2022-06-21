const categories = require('../services/categories.service');

const create = async (req, res, next) => {
  const newCategory = await categories.create(req.body);

  if (newCategory.error) return next(newCategory.error);

  return res.status(201).json(newCategory);
};

const getAll = async (req, res) => {
  const allCategories = await categories.getAll();

  return res.status(200).json(allCategories);
};

module.exports = {
  create,
  getAll,
};
