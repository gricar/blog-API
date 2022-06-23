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

const getBySearchTerm = async (req, res) => {
  const { q: searchTerm } = req.query;

  const filteredPosts = await blogPosts.getFilteredPosts(searchTerm);

  return res.status(200).json(filteredPosts);

  /* another alternative to filter posts
  const allPosts = await blogPosts.getAll();

  const filteredPosts = allPosts
    .filter(({ title, content }) => title.includes(searchTerm) || content.includes(searchTerm));

  return res.status(200).json(filteredPosts); */
};

const findById = async (req, res, next) => {
  const post = await blogPosts.getById(req.params.id);

  if (post.error) return next(post.error);

  return res.status(200).json(post);
};

const update = async (req, res, next) => {
  const postUpdated = await blogPosts.update(req.params.id, req.body);

  if (postUpdated.error) return next(postUpdated.error);

  return res.status(200).json(postUpdated);
};

const remove = async (req, res) => {
  await blogPosts.remove(req.params.id);

  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getBySearchTerm,
  findById,
  update,
  remove,
};
