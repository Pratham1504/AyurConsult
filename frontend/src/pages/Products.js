import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContextProv';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { cart, addToCart, updateQuantity } = useCart(); // Using cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products'); // Adjust URL if necessary
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the search term (by name or description)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get product quantity from the cart for a specific product
    const getProductQuantity = (_productId) => {
        const cartItem = cart.find(item => item._id === _productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-3 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => {
                    const quantity = getProductQuantity(product._id); // Get the current quantity for this product

                    return (
                        <div key={product._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
                            <img src={product.image} alt={product.name} className="mb-4 w-full h-40 object-cover rounded" />
                            
                            {/* Product Title */}
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2> {/* Reduced text size */}
                            
                            {/* Product Description */}
                            <p className="text-gray-500 mb-2 text-sm">{product.description}</p> {/* Smaller description */}
                            
                            {/* Product Ingredients */}
                            <p className="text-gray-700 mb-4 text-sm">
                                <strong>Ingredients:</strong> {product.ingredients.join(', ')}
                            </p>

                            <div className="mt-auto">
                                {/* Product Price */}
                                <p className="text-lg font-bold mb-4">Price: ₹{product.price}</p>

                                {/* If product is added, show quantity control, else show Add to Cart button */}
                                {quantity > 0 ? (
                                    <div className="flex items-center justify-between mt-2">
                                        <button
                                            onClick={() => updateQuantity(product._id, -1)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-l-md transition duration-300 hover:bg-blue-600 text-sm">
                                            -
                                        </button>
                                        <span className="px-3 py-1 text-lg">{quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(product._id, 1)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-r-md transition duration-300 hover:bg-blue-600 text-sm">
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-600 w-full text-center text-sm mt-2">
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
