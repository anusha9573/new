const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',  blogController.createBlog); // Create a new blog post

router.get('/', blogController.getBlogs); // Get all blog posts
router.get('/:id', blogController.getBlogById); // Get details of a specific blog post
router.put('/:id', authMiddleware, blogController.updateBlog); // Update details of a specific blog post
router.delete('/:id', authMiddleware, blogController.deleteBlog); // Delete a specific blog post

module.exports = router;
