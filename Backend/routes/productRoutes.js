const express = require('express');
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// POST /products - Create a new product
router.post('/', createProduct);

// GET /products/:id - Get a single product by ID
router.get('/:id', getProduct);

// GET /products - Get all products
router.get('/', getAllProducts);

// PUT /products/:id - Update a product by ID
router.put('/:id', updateProduct);

// DELETE /products/:id - Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;