// src/components/BlogList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/blogs'); // Adjust URL if necessary
                setBlogs(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error fetching blogs: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">Ayurvedic Clinic Blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <Link key={blog._id} to={`/blogs/${blog._id}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-4">{blog.description.substring(0, 100)}...</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
