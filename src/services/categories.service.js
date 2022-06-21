const { Category } = require('../database/models');

const categoryAlreadyExists = { error: { statusCode: 409, message: 'Category already exists' } };

const create = async ({ name }) => {
  const categoryRegistered = await Category.findOne({ where: { name } });

  if (categoryRegistered) {
    return categoryAlreadyExists;
  }

  return Category.create({ name });
};

module.exports = {
  create,
};