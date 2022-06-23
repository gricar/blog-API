const express = require('express');

const blogPosts = require('../controllers/blogPosts.controller');
const { auth, validateNewPost, validatePostEdit, validatePostOwner } = require('../middlewares');

const blogPostsRoute = express.Router();

blogPostsRoute.post('/', auth, validateNewPost, blogPosts.create);
blogPostsRoute.get('/', auth, blogPosts.getAll);
blogPostsRoute.get('/search', auth, blogPosts.getBySearchTerm);
blogPostsRoute.get('/:id', auth, blogPosts.findById);
blogPostsRoute.put('/:id', auth, validatePostEdit, validatePostOwner, blogPosts.update);
blogPostsRoute.delete('/:id', auth, validatePostOwner, blogPosts.remove);

module.exports = blogPostsRoute;
