const { Category } = require('../database/models');

const categoryAlreadyExists = { error: { statusCode: 409, message: 'Category already exists' } };

const findById = async (id) => Category.findByPk(id);

const create = async ({ name }) => {
  const categoryRegistered = await Category.findOne({ where: { name } });

  if (categoryRegistered) {
    return categoryAlreadyExists;
  }

  return Category.create({ name });
};

const getAll = () => Category.findAll();

module.exports = {
  create,
  findById,
  getAll,
};