const Blog = require('../models/blogModel');

// Create a new blog post
const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: 'Error creating blog post', error });
    }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error });
    }
};

// Update a blog post
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: 'Error updating blog post', error });
    }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog post', error });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
