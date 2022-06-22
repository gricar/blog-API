const express = require('express');

const blogPosts = require('../controllers/blogPosts.controller');
const { validateNewPost } = require('../middlewares');

const blogPostsRoute = express.Router();

blogPostsRoute.post('/', validateNewPost, blogPosts.create);

module.exports = blogPostsRoute;
