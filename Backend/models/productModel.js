const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Herbs', 'Supplements', 'Oils', 'Cosmetics', 'Other'], // Example categories
  },
  ingredients: {
    type: [String],
    required: true
  },
  usage: {
    type: String,
    required: true
  },
  image: {
    type: String, // Array of image URLs
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
