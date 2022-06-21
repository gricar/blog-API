const blogPosts = require('../services/blogPosts.service');
const { findByEmail } = require('../services/user.service');

const create = async (req, res, next) => {
  const { id } = await findByEmail(req.user.userEmail);

  const newBlogPost = await blogPosts.create(req.body, id);

  if (newBlogPost.error) return next(newBlogPost.error);

  return res.status(201).json(newBlogPost);
};

module.exports = {
  create,
};
