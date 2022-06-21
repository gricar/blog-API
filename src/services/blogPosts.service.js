const Sequelize = require('sequelize');
const config = require('../database/config/config');

const { BlogPost, PostCategory } = require('../database/models');
const { findById } = require('./categories.service');

const sequelize = new Sequelize(config.development);

const categoryDoesntExists = { error: { statusCode: 400, message: '"categoryIds" not found' } };

const allCategoriesExist = async (categoryIds) => {
  const categories = await Promise.all(categoryIds.map((id) => findById(id)));

  return categories.every((category) => category);
};

const create = async ({ title, content, categoryIds }, userId) => {
  const allExists = await allCategoriesExist(categoryIds);
  if (!allExists) return categoryDoesntExists;

  const t = await sequelize.transaction();

  try {
    const post = await BlogPost.create(
      { title, content, userId },
      { transaction: t },
      );

    await Promise.all(categoryIds.map((categoryId) => PostCategory.create(
      { postId: post.dataValues.id, categoryId },
      { transaction: t },
      )));
    
    await t.commit();

    return post;
  } catch (err) {
    await t.rollback();
    console.log(err.message);
  }
};

module.exports = {
  create,
};