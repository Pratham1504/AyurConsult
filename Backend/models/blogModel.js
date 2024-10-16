const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 3000, // Limit description to 3000 characters
    },
    youtubeLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v); // Validate YouTube link format
            },
            message: props => `${props.value} is not a valid YouTube URL!`,
        },
    },
    productLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/).+/.test(v); // Validate general URL format
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
