const mongoose = require('mongoose');
const Blog = require('./models/blogModel'); // Adjust the path if necessary

const dbURI = 'mongodb+srv://Ayurveda:Ayurveda123@ayurveda.d7oq5.mongodb.net/?retryWrites=true&w=majority&appName=Ayurveda'; // Replace with your MongoDB connection string

const seedBlogs = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');

        // Dummy blog data
        const blogs = [
            {
                title: 'The Healing Power of Herbs',
                description: 'Herbs have been used for thousands of years in Ayurvedic medicine...',
                youtubeLink: 'https://www.youtube.com/watch?v=example1',
                productLink: 'https://yourclinic.com/products/herbal-remedies',
            },
            {
                title: 'Ayurvedic Practices for Daily Wellness',
                description: 'Incorporating Ayurvedic practices into your daily routine can enhance your overall well-being...',
                youtubeLink: 'https://www.youtube.com/watch?v=example2',
                productLink: 'https://yourclinic.com/products/wellness-kits',
            },
            {
                title: 'Understanding Doshas in Ayurveda',
                description: 'Learn about the three doshas—Vata, Pitta, and Kapha—and how they affect your health...',
                youtubeLink: 'https://www.youtube.com/watch?v=example3',
                productLink: 'https://yourclinic.com/products/dosha-assessment',
            },
        ];

        // Insert the dummy data into the database
        await Blog.insertMany(blogs);
        console.log('Dummy blog data seeded successfully');
    } catch (error) {
        console.error('Error seeding blog data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Call the seed function
seedBlogs();

