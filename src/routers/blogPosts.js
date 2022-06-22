const express = require('express');

const blogPosts = require('../controllers/blogPosts.controller');
const { auth, validateNewPost } = require('../middlewares');

const blogPostsRoute = express.Router();

blogPostsRoute.post('/', auth, validateNewPost, blogPosts.create);
blogPostsRoute.get('/', auth, blogPosts.getAll);
blogPostsRoute.get('/:id', auth, blogPosts.findById);

module.exports = blogPostsRoute;
