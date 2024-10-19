// const mongoose = require('mongoose');
// const Blog = require('./models/blogModel'); // Adjust the path if necessary

// const dbURI = 'mongodb+srv://Ayurveda:Ayurveda123@ayurveda.d7oq5.mongodb.net/?retryWrites=true&w=majority&appName=Ayurveda'; // Replace with your MongoDB connection string

// const seedBlogs = async () => {
//     try {
//         await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('MongoDB connected successfully');

//         // Dummy blog data
//         const blogs = [
//             {
//                 title: 'The Healing Power of Herbs',
//                 description: 'Herbs have been used for thousands of years in Ayurvedic medicine...',
//                 youtubeLink: 'https://www.youtube.com/watch?v=example1',
//                 productLink: 'https://yourclinic.com/products/herbal-remedies',
//             },
//             {
//                 title: 'Ayurvedic Practices for Daily Wellness',
//                 description: 'Incorporating Ayurvedic practices into your daily routine can enhance your overall well-being...',
//                 youtubeLink: 'https://www.youtube.com/watch?v=example2',
//                 productLink: 'https://yourclinic.com/products/wellness-kits',
//             },
//             {
//                 title: 'Understanding Doshas in Ayurveda',
//                 description: 'Learn about the three doshas—Vata, Pitta, and Kapha—and how they affect your health...',
//                 youtubeLink: 'https://www.youtube.com/watch?v=example3',
//                 productLink: 'https://yourclinic.com/products/dosha-assessment',
//             },
//         ];

//         // Insert the dummy data into the database
//         await Blog.insertMany(blogs);
//         console.log('Dummy blog data seeded successfully');
//     } catch (error) {
//         console.error('Error seeding blog data:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// // Call the seed function
// seedBlogs();

// deleteAllBlogs.js (for temporary use)

const mongoose = require('mongoose');
const Blog = require('./models/blogModel'); // Adjust the path as necessary
const Product = require('./models/productModel'); // Assuming you have the Product model

mongoose.connect('mongodb+srv://Ayurveda:Ayurveda123@ayurveda.d7oq5.mongodb.net/?retryWrites=true&w=majority&appName=Ayurveda', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
        seedBlogs();
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
    
    // Function to seed blogs
    const seedBlogs = async () => {
        try {
            // Fetch some existing products to use their IDs in the blog
            const products = await Product.find().limit(2); // Assuming you have products, grab two for demo
            
            if (products.length === 0) {
                console.log("No products found. Please seed the products collection first.");
                return;
            }
    
            const product1 = products[0]._id;
            const product2 = products[1]._id;
    
            // Dummy blog data
            const blogData = [
                {
                    title: "Unlock the Power of Ayurveda: A Deep Dive",
                    description: `Ayurveda is not just a system of medicine but a way of life that has been practiced for over 5,000 years. This blog will explore the fundamental principles of Ayurveda, focusing on its holistic approach to health. 
                    Unlike modern medicine, which often focuses on treating symptoms, Ayurveda aims to balance the mind, body, and spirit. By doing so, it addresses the root causes of health issues, leading to long-term wellness. We'll look into the benefits of Ayurvedic herbs, detoxification processes like Panchakarma, and how Ayurveda can improve overall well-being. 
                    Learn more about daily routines, or "Dinacharya," which include practices such as oil pulling, tongue scraping, and yoga to maintain health and prevent disease.Ayurveda is not just a system of medicine but a way of life that has been practiced for over 5,000 years. This blog will explore the fundamental principles of Ayurveda, focusing on its holistic approach to health. 
                    Unlike modern medicine, which often focuses on treating symptoms, Ayurveda aims to balance the mind, body, and spirit. By doing so, it addresses the root causes of health issues, leading to long-term wellness. We'll look into the benefits of Ayurvedic herbs, detoxification processes like Panchakarma, and how Ayurveda can improve overall well-being. 
                    Learn more about daily routines, or "Dinacharya,"`,
                    topic: "Ayurveda Overview",
                    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    productId: product1, // Reference to Product 1
                    likes: 45,
                    dislikes: 3,
                },
                {
                    title: "The Secrets of Ayurvedic Detoxification",
                    description: `Ayurvedic detoxification, or Panchakarma, is one of the most effective ways to remove toxins from your body. In this blog, we will delve into the methods used in Ayurveda for detox, focusing on Panchakarma techniques. Panchakarma consists of five main therapies: Vamana (emesis), Virechana (purgation), Basti (enema), Nasya (nasal administration), and Raktamokshana (bloodletting). 
                    The blog will also guide you on how to prepare for a Panchakarma treatment, including specific dietary changes and herbal supplements. Ayurvedic detox can help with weight loss, increase energy, and improve mental clarity. We'll explore the role of specific Ayurvedic herbs such as Triphala and how they assist in detoxification.Ayurveda is not just a system of medicine but a way of life that has been practiced for over 5,000 years. This blog will explore the fundamental principles of Ayurveda, focusing on its holistic approach to health. 
                    Unlike modern medicine, which often focuses on treating symptoms, Ayurveda aims to balance the mind, body, and spirit. By doing so, it addresses the root causes of health issues, leading to long-term wellness. We'll look into the benefits of Ayurvedic herbs, detoxification processes like Panchakarma, and how Ayurveda can improve overall well-being. 
                    Learn more about daily routines, or "Dinacharya,"`,
                    topic: "Detoxification",
                    youtubeLink: "https://www.youtube.com/watch?v=example",
                    productId: product2, // Reference to Product 2
                    likes: 60,
                    dislikes: 4,
                },
                {
                    title: "Herbal Remedies for Stress and Anxiety",
                    description: `Stress is an inevitable part of modern life, but Ayurveda offers numerous remedies to reduce stress and anxiety. This blog will cover various Ayurvedic herbs that act as adaptogens, helping your body adapt to stress. We'll look at Ashwagandha, Brahmi, and Jatamansi — powerful herbs known for their calming effects on the mind and body.
                    In addition to herbal remedies, we will discuss lifestyle practices recommended in Ayurveda, such as meditation and Pranayama (breathing exercises). You'll also learn about the role of diet in managing stress, with a focus on Sattvic foods that promote mental clarity and peace.`,
                    topic: "Stress Relief",
                    youtubeLink: "https://youtu.be/3iEDMps5P-I?si=dWEoAFKoRCaEFz3u",
                    productId: product1, // Reference Product 1 again
                    likes: 75,
                    dislikes: 2,
                }
            ];
    
            // Clear the blogs collection before seeding
            await Blog.deleteMany();
            
            // Insert the dummy blogs
            const result = await Blog.insertMany(blogData);
            console.log('Blogs seeded:', result);
            
            mongoose.connection.close();
        } catch (error) {
            console.error('Error seeding blogs:', error);
            mongoose.connection.close();
        }
    };
    
    