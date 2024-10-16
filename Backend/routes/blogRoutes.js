const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Define routes
router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
