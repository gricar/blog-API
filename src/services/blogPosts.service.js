const Sequelize = require('sequelize');
const config = require('../database/config/config');

const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { findById } = require('./categories.service');

const sequelize = new Sequelize(config.development);

const categoryDoesntExists = { error: { statusCode: 400, message: '"categoryIds" not found' } };
const postDoesntExists = { error: { statusCode: 404, message: 'Post does not exist' } };
const unauthorizedUser = { error: { statusCode: 401, message: 'Unauthorized user' } };

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

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return allPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return postDoesntExists;

  return post;
};

const validateToUpdate = async (postId, userId) => {
  const postExist = await getById(postId);

  if (postExist.error) return postDoesntExists;

  // check if is the editor user is who create the post 
  if (postExist.userId !== userId) return unauthorizedUser;

  return postExist;
};

const update = async (postId, { title, content }) => {
  await BlogPost.update(
      { title, content },
      { where: { id: postId } },
    );
  
  return getById(postId);
};

module.exports = {
  create,
  getAll,
  getById,
  validateToUpdate,
  update,
};