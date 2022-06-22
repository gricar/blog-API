const blogPosts = require('../services/blogPosts.service');
const { findByEmail } = require('../services/user.service');

const create = async (req, res, next) => {
  const { id } = await findByEmail(req.user.userEmail);

  const newBlogPost = await blogPosts.create(req.body, id);

  if (newBlogPost.error) return next(newBlogPost.error);

  return res.status(201).json(newBlogPost);
};

const getAll = async (req, res) => {
  const allPosts = await blogPosts.getAll();

  return res.status(200).json(allPosts);
};

const findById = async (req, res, next) => {
  const post = await blogPosts.getById(req.params.id);

  if (post.error) return next(post.error);

  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  findById,
};
