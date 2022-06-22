const express = require('express');

const blogPosts = require('../controllers/blogPosts.controller');
const { auth, validateNewPost } = require('../middlewares');

const blogPostsRoute = express.Router();

blogPostsRoute.use([auth]);
blogPostsRoute.post('/', validateNewPost, blogPosts.create);
blogPostsRoute.get('/', blogPosts.getAll);

module.exports = blogPostsRoute;
