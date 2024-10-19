import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'; // To format 'time ago'
import twitterIcon from '../Images/Icons/X.webp';
import whatsappIcon from '../Images/Icons/Whatsapp-logo.webp';
import instagramIcon from '../Images/Icons/Instagram.webp';

const BlogDetail = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [product, setProduct] = useState(null); // For storing product data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]); // For storing comments
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [commentText, setCommentText] = useState('');

    // Fetch blog and product details
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/blogs/${id}`); // Fetch blog by ID
                setBlog(response.data);
                setComments(response.data.comments); // Fetch existing comments
                if (response.data.productId) {
                    const productResponse = await axios.get(`http://localhost:4000/api/products/${response.data.productId}`);
                    setProduct(productResponse.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Handle like button click
    const handleLike = async () => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/blogs/${id}/like`);
            setBlog(response.data); // Update blog data with new like count
        } catch (err) {
            setError(err);
        }
    };

    // Handle dislike button click
    const handleDislike = async () => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/blogs/${id}/dislike`);
            setBlog(response.data); // Update blog data with new dislike count
        } catch (err) {
            setError(err);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || !commentText) {
            alert("Please fill out all fields");
            return;
        }

        try {
            const newComment = { name, age, text: commentText };

            // Post the new comment to the server
            const response = await axios.post(`http://localhost:4000/api/blogs/${id}/comment`, newComment);
            console.log('Comment posted successfully:', response.data);
            setComments((prevComments) => [...prevComments, response.data.comment]);


            // Clear form fields after submission
            setName('');
            setAge('');
            setCommentText('');
        } catch (err) {
            // Handle the error
            setError(err);
            console.error('Error submitting comment:', err);
        }
    };


    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error fetching blog: {error.message}</div>;

    if (!blog) {
        return <div className="text-red-500">Blog not found</div>;
    }

    return (
        <section className="bg-white py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Adjust column ratio to 2:1 */}

                {/* Left Column: Blog Info (Take up 2/3 of the width) */}
                <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            {blog.topic}
                        </span>
                        <span className="text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span> {/* Show created date */}
                    </div>
                    <p className="text-gray-600 mb-4">{blog.description}</p>

                    {/* Like & Dislike Buttons */}
                    <div className="flex items-center space-x-4 mb-4">
                        <button
                            onClick={handleLike}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            👍 {blog.likes} Like
                        </button>
                        <button
                            onClick={handleDislike}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            👎 {blog.dislikes} Dislike
                        </button>
                    </div>

                    {/* Share Section */}
                    <div className="flex space-x-4 mt-6">
                        <span className="font-semibold">Share this blog:</span>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <img src={twitterIcon} alt="Share on Twitter" className="w-6 h-6 mr-1" />
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)}%0A${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <img src={whatsappIcon} alt="Share on WhatsApp" className="w-6 h-6 mr-1" />
                        </a>
                        <a
                            href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <img src={instagramIcon} alt="Share on Instagram" className="w-6 h-6 mr-1" />
                        </a>
                    </div>



                    {/* Display Comments */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-gray-800">{comment.name}</p>
                                        <span className="text-sm text-gray-500">{moment(comment.createdAt).fromNow()}</span>
                                    </div>
                                    <p className="text-xs text-gray-600">Age: {comment.age}</p>
                                    <p className="text-sm text-gray-500 mt-2">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    {/* Comment Form */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
                        <form onSubmit={handleCommentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Age <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Your age"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Comment <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Write your comment here..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Comment
                            </button>
                        </form>
                    </div>

                </div>

                {/* Right Column: Video and Product Info (Take up 1/3 of the width) */}
                <div>
                    {/* YouTube Video */}
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

                    {/* Product Details */}
                    {product && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md mt-4">
                            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                            <p className="text-green-600 font-bold text-xl">Price: ${product.price}</p>
                            <Link to={`/products/${product._id}`} className="text-green-600 hover:underline">
                                View Product Details
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;
