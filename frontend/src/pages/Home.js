import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from 'axios';
import improveImmunityImg from "../Images/Improve-Immunity.webp";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products'); // Adjust API URL if necessary
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err);
            }
        };

        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/blogs'); // Adjust API URL if necessary
                setBlogs(response.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError(err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchProducts(), fetchBlogs()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % blogs.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + blogs.length) % blogs.length);
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error fetching data: {error.message}</div>;

    return (
        <div className="scrollable-home">

            {/* Benefits of Ayurveda Section */}
            <section className="bg-green-100 py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-6">Benefits of Ayurveda</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="benefit-card">
                        <img
                            src="https://via.placeholder.com/300x200?text=Natural+Healing"
                            alt="Natural Healing"
                            className="mx-auto mb-4 rounded-md shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-700">Natural Healing</h3>
                        <p className="text-gray-600">Ayurveda focuses on holistic, natural treatments using herbs and oils.</p>
                    </div>
                    <div className="benefit-card">
                        <img
                            src={improveImmunityImg}
                            alt="Improves Immunity"
                            className="mx-auto mb-4 rounded-md shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-700">Improves Immunity</h3>
                        <p className="text-gray-600">It strengthens the body's immune system to fight off diseases.</p>
                    </div>
                    <div className="benefit-card">
                        <img
                            src="https://via.placeholder.com/300x200?text=Balance+Body+Mind"
                            alt="Balance Body and Mind"
                            className="mx-auto mb-4 rounded-md shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-700">Balances Body and Mind</h3>
                        <p className="text-gray-600">Ayurveda helps in maintaining a balanced body, mind, and spirit.</p>
                    </div>
                </div>
            </section>
            
            {/* Blog Topics Section */}
            <section className="bg-gray-100 py-12 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-green-600">Blogs</h2>
                    <Link to="/blogs" className="text-lg text-green-500 hover:text-green-700">Show All</Link>
                </div>

                {/* Blog Slider with Left and Right Navigation */}
                {blogs.length > 0 && (
                    <div className="relative flex items-center justify-center">
                        {/* Left Navigation Button */}
                        <button
                            onClick={handlePrevSlide}
                            className="absolute left-0 bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 z-10"
                        >
                            &lt;
                        </button>

                        {/* Blog Content Box */}
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full lg:w-1/2 md:w-4/5 mx-auto">
                            {/* Blog content */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {blogs[currentSlide].title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(blogs[currentSlide].createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Blog Description */}
                            <p className="text-center text-gray-600 px-10 mb-4">
                                {blogs[currentSlide].description.substring(0, 100)}...
                            </p>

                            {/* Read More Button */}
                            <div className="text-center">
                                <Link
                                    to={`/blogs/${blogs[currentSlide]._id}`}
                                    className="text-sm text-black hover:text-gray-700"
                                >
                                    Read More >>
                                </Link>
                            </div>
                        </div>

                        {/* Right Navigation Button */}
                        <button
                            onClick={handleNextSlide}
                            className="absolute right-0 bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 z-10"
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </section>

            {/* Product Previews Section */}
            <section className="bg-white py-12 px-6">
                <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product) => (
                        <div key={product.id} className="product-card p-4 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                                <p className="text-lg font-bold text-black">₹{product.price}</p>
                            </div>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <Link
                                to={`/product/${product.id}`}
                                className="absolute bottom-2 right-2 text-sm text-black hover:text-gray-700"
                            >
                                View Details >>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/products" className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600">
                        Show More Products
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
