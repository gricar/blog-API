const express = require('express');

const blogPosts = require('../controllers/blogPosts.controller');
const { auth, validateNewPost } = require('../middlewares');

const blogPostsRoute = express.Router();

blogPostsRoute.post('/', auth, validateNewPost, blogPosts.create);

module.exports = blogPostsRoute;
