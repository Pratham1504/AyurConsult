// src/components/BlogDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BlogDetail = () => {
    const { id } = useParams(); // Get the blog ID from the URL
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

    const blog = blogs.find((b) => b._id === id); // Find the blog by ID

    if (!blog) {
        return <div className="text-red-500">Blog not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700 mb-4">{blog.description}</p>
            {blog.youtubeLink && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Watch Video:</h2>
                    <iframe
                        width="100%"
                        height="315"
                        src={blog.youtubeLink.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            {blog.productLink && (
                <a href={blog.productLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Product</a>
            )}
        </div>
    );
};

export default BlogDetail;
