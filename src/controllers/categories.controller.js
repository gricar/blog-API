const categories = require('../services/categories.service');

const create = async (req, res, next) => {
  const newCategory = await categories.create(req.body);

  if (newCategory.error) return next(newCategory.error);

  return res.status(201).json(newCategory);
};

module.exports = {
  create,
};
