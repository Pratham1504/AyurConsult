const mongoose = require('mongoose');
const Product = require('./models/productModel'); // Assuming the model is in models folder

// Connect to MongoDB
mongoose.connect('mongodb+srv://Ayurveda:Ayurveda123@ayurveda.d7oq5.mongodb.net/?retryWrites=true&w=majority&appName=Ayurveda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    seedProducts();
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Seed products function
const seedProducts = async () => {
    try {
    // Remove existing products
    await Product.deleteMany({});
    console.log('Existing products removed');

    const products = [
        {
            name: 'Ashwagandha Tablets',
            description: 'Ashwagandha helps in managing stress and boosting energy.',
            price: 299,
            MRP: 350,
            company: 'Baidyanath',
            size: '60 Tablets',
            ingredients: ['Ashwagandha', 'Ginger Root', 'Black Pepper'],
            usage: 'Take 1 tablet twice a day after meals.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Rohit', email: 'rohit@gmail.com', rating: 5, review: 'Great for stress relief.' }
            ]
        },
        {
            name: 'Triphala Churna',
            description: 'A natural digestive aid and detoxifier.',
            price: 180,
            MRP: 210,
            company: 'Patanjali',
            size: '100g',
            ingredients: ['Amla', 'Haritaki', 'Bibhitaki'],
            usage: 'Mix 1 tsp in warm water before bed.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Suman', email: 'suman@gmail.com', rating: 4, review: 'Very effective for digestion.' }
            ]
        },
        {
            name: 'Chyawanprash',
            description: 'Immunity booster packed with antioxidants.',
            price: 350,
            MRP: 400,
            company: 'Dabur',
            size: '500g',
            ingredients: ['Amla', 'Ashwagandha', 'Honey'],
            usage: 'Take 1 tsp daily with warm milk or water.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Neha', email: 'neha@gmail.com', rating: 5, review: 'Boosts immunity well.' }
            ]
        },
        {
            name: 'Brahmi Capsules',
            description: 'Supports memory and cognitive function.',
            price: 220,
            MRP: 270,
            company: 'Zandu',
            size: '30 Capsules',
            ingredients: ['Brahmi', 'Shankhpushpi'],
            usage: 'Take 1 capsule after meals daily.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Rajesh', email: 'rajesh@gmail.com', rating: 4, review: 'Helps with focus and clarity.' }
            ]
        },
        {
            name: 'Amla Juice',
            description: 'Rich in Vitamin C, promotes healthy skin and hair.',
            price: 150,
            MRP: 180,
            company: 'Patanjali',
            size: '1 Liter',
            ingredients: ['Amla'],
            usage: 'Take 30 ml diluted in water daily.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Anjali', email: 'anjali@gmail.com', rating: 5, review: 'Improves skin texture.' }
            ]
        },
        {
            name: 'Neem Capsules',
            description: 'Purifies blood and promotes healthy skin.',
            price: 130,
            MRP: 160,
            company: 'Organic India',
            size: '60 Capsules',
            ingredients: ['Neem'],
            usage: 'Take 1 capsule after meals daily.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Sunil', email: 'sunil@gmail.com', rating: 4, review: 'Good for skin issues.' }
            ]
        },
        {
            name: 'Kesar Chandan Face Pack',
            description: 'Natural face pack for glowing skin.',
            price: 99,
            MRP: 120,
            company: 'Vicco',
            size: '50g',
            ingredients: ['Saffron', 'Sandalwood'],
            usage: 'Apply on face for 15 minutes, wash with lukewarm water.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Priya', email: 'priya@gmail.com', rating: 5, review: 'Amazing glow after use!' }
            ]
        },
        {
            name: 'Ayush Kwath',
            description: 'Herbal formula for boosting immunity.',
            price: 199,
            MRP: 250,
            company: 'Kerala Ayurveda',
            size: '100g',
            ingredients: ['Tulsi', 'Dalchini', 'Sunthi', 'Kali Mirch'],
            usage: 'Mix 1 tsp in hot water and drink twice a day.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Vikas', email: 'vikas@gmail.com', rating: 4, review: 'Effective for colds and flu.' }
            ]
        },
        {
            name: 'Shilajit Capsules',
            description: 'Boosts stamina and supports overall health.',
            price: 499,
            MRP: 600,
            company: 'Himalaya',
            size: '30 Capsules',
            ingredients: ['Shilajit'],
            usage: 'Take 1 capsule after meals daily.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Deepak', email: 'deepak@gmail.com', rating: 5, review: 'Great for stamina and energy.' }
            ]
        },
        {
            name: 'Turmeric Powder',
            description: 'Natural anti-inflammatory and antioxidant.',
            price: 120,
            MRP: 150,
            company: 'Organic India',
            size: '100g',
            ingredients: ['Turmeric'],
            usage: 'Add 1 tsp to milk or dishes for added benefits.',
            image: 'https://via.placeholder.com/150',
            ratings: [
                { name: 'Manisha', email: 'manisha@gmail.com', rating: 5, review: 'High-quality turmeric.' }
            ]
        }
    ];

    
        await Product.insertMany(products);
        console.log('Products have been seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding products:', err);
        mongoose.connection.close();
    }
};
