// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
mongoose.connect('mongodb://localhost:27017/fruits'
);

app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
    try {
        await Product.deleteMany(); // Clear existing data

        const products = [
            {
                name: 'Apple', category: 'Freshfruit',
                description: 'Fresh and crispy',
                price: 150,
                image:
                    'https://media.geeksforgeeks.org/wp-content/uploads/20240104142542/apple.jpg',
                desc: 'Fresh and crispy'
            },
            {
                name: 'Banana',
                category: 'Freshfruit',
                description: 'Rich in potassium',
                price: 75,
                image:
                    'https://media.geeksforgeeks.org/wp-content/uploads/20240104142554/banana.jpg'
            },
            {
                name: 'Orange',
                category: 'Freshfruit',
                description: 'Packed with vitamin C',
                price: 200,
                image:
                    'https://media.geeksforgeeks.org/wp-content/uploads/20240104142641/orange.jpg'
            },


            {
                name: 'Grapes',
                category: 'Freshfruit',
                description: 'Sweet and juicy',
                price: 250,
                image:
                    'https://media.geeksforgeeks.org/wp-content/uploads/20240104142629/grapes.jpg'
            },
            {
                name: 'Strawberry',
                category: 'Freshfruit',
                description: 'Delicious red berries',
                price: 300,
                image:
                    'https://media.geeksforgeeks.org/wp-content/uploads/20240104142657/strawberry.jpg'
            },



            {
                name: "Pineapple",
                category: "Freshfruit",
                description: "Tropical and juicy",
                price: 220,
                image: "https://image.pollinations.ai/prompt/pineapple%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=101"
            },
            {
                name: "Watermelon",
                category: "Freshfruit",
                description: "Refreshing summer treat",
                price: 180,
                image: "https://image.pollinations.ai/prompt/watermelon%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=102"
            },
            {
                name: "Papaya",
                category: "Freshfruit",
                description: "Sweet tropical flesh",
                price: 160,
                image: "https://image.pollinations.ai/prompt/papaya%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=103"
            },
            {
                name: "Mango",
                category: "Freshfruit",
                description: "Juicy golden delight",
                price: 300,
                image: "https://image.pollinations.ai/prompt/mango%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=104"
            },
            {
                name: "Guava",
                category: "Freshfruit",
                description: "Fragrant and sweet",
                price: 140,
                image: "https://image.pollinations.ai/prompt/guava%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=105"
            },
            {
                name: "Pomegranate",
                category: "Freshfruit",
                description: "Juicy ruby seeds",
                price: 260,
                image: "https://image.pollinations.ai/prompt/pomegranate%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=106"
            },
            {
                name: "Kiwi",
                category: "Freshfruit",
                description: "Tangy green inside",
                price: 280,
                image: "https://image.pollinations.ai/prompt/kiwi%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=107"
            },
            {
                name: "Peach",
                category: "Freshfruit",
                description: "Soft and juicy",
                price: 240,
                image: "https://image.pollinations.ai/prompt/peach%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=108"
            },
            {
                name: "Plum",
                category: "Freshfruit",
                description: "Sweet and tart",
                price: 200,
                image: "https://image.pollinations.ai/prompt/plum%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=109"
            },
            {
                name: "Pear",
                category: "Freshfruit",
                description: "Crisp and sweet",
                price: 190,
                image: "https://image.pollinations.ai/prompt/pear%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=110"
            },
            {
                name: "Lychee",
                category: "Freshfruit",
                description: "Delicate floral sweetness",
                price: 350,
                image: "https://image.pollinations.ai/prompt/lychee%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=111"
            },
            {
                name: "Dragon Fruit",
                category: "Freshfruit",
                description: "Vibrant exotic taste",
                price: 400,
                image: "https://image.pollinations.ai/prompt/dragon%20fruit%20fresh,photorealistic,studio%20lighting?width=512&height=512&seed=112"
            },
            {
                name: "Starfruit",
                category: "Freshfruit",
                description: "Tropical star shape",
                price: 300,
                image: "https://image.pollinations.ai/prompt/starfruit%20fresh%20carambola,photorealistic,studio%20lighting?width=512&height=512&seed=113"
            },
            {
                name: "Raspberry",
                category: "Freshfruit",
                description: "Tangy red clusters",
                price: 500,
                image: "https://image.pollinations.ai/prompt/raspberry%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=114"
            },
            {
                name: "Blackberry",
                category: "Freshfruit",
                description: "Juicy dark berries",
                price: 480,
                image: "https://image.pollinations.ai/prompt/blackberry%20fresh%20fruit,photorealistic,studio%20lighting?width=512&height=512&seed=115"
            },




            {
                name: "Dates",
                category: "Dried Fruits",
                description: "Sweet chewy energy",
                price: 350,
                image: "https://image.pollinations.ai/prompt/medjool%20dates,photorealistic,studio%20lighting?width=512&height=512&seed=10"
            },
            {
                name: "Dried Apricots",
                category: "Dried Fruits",
                description: "Tangy orange snack",
                price: 500,
                image: "https://image.pollinations.ai/prompt/dried%20apricots,photorealistic,studio%20lighting?width=512&height=512&seed=11"
            },
            {
                name: "Dried Figs",
                category: "Dried Fruits",
                description: "Soft sweet seedy",
                price: 600,
                image: "https://image.pollinations.ai/prompt/dried%20figs,photorealistic,studio%20lighting?width=512&height=512&seed=12"
            },
            {
                name: "Raisins",
                category: "Dried Fruits",
                description: "Classic dried grapes",
                price: 250,
                image: "https://image.pollinations.ai/prompt/golden%20raisins,photorealistic,studio%20lighting?width=512&height=512&seed=13"
            },
            {
                name: "Dried Cranberries",
                category: "Dried Fruits",
                description: "Tart and sweet",
                price: 450,
                image: "https://image.pollinations.ai/prompt/dried%20cranberries,photorealistic,studio%20lighting?width=512&height=512&seed=14"
            },
            {
                name: "Dried Blueberries",
                category: "Dried Fruits",
                description: "Chewy antioxidant snack",
                price: 700,
                image: "https://image.pollinations.ai/prompt/dried%20blueberries,photorealistic,studio%20lighting?width=512&height=512&seed=15"
            },
            {
                name: "Prunes",
                category: "Dried Fruits",
                description: "Dark and rich",
                price: 400,
                image: "https://image.pollinations.ai/prompt/prunes%20dried%20plums,photorealistic,studio%20lighting?width=512&height=512&seed=16"
            },
            {
                name: "Dried Mango",
                category: "Dried Fruits",
                description: "Tropical sweet slices",
                price: 550,
                image: "https://image.pollinations.ai/prompt/dried%20mango%20slices,photorealistic,studio%20lighting?width=512&height=512&seed=17"
            },
            {
                name: "Dried Pineapple",
                category: "Dried Fruits",
                description: "Tangy tropical rings",
                price: 520,
                image: "https://image.pollinations.ai/prompt/dried%20pineapple%20rings,photorealistic,studio%20lighting?width=512&height=512&seed=18"
            },
            {
                name: "Dried Kiwi",
                category: "Dried Fruits",
                description: "Exotic tart slices",
                price: 650,
                image: "https://image.pollinations.ai/prompt/dried%20kiwi%20slices,photorealistic,studio%20lighting?width=512&height=512&seed=19"
            },
            {
                name: "Goji Berries",
                category: "Dried Fruits",
                description: "Sweet tart superfood",
                price: 800,
                image: "https://image.pollinations.ai/prompt/goji%20berries,photorealistic,studio%20lighting?width=512&height=512&seed=20"
            },
            {
                name: "Dried Mulberries",
                category: "Dried Fruits",
                description: "Naturally sweet chewy",
                price: 750,
                image: "https://image.pollinations.ai/prompt/dried%20mulberries,photorealistic,studio%20lighting?width=512&height=512&seed=21"
            },
            {
                name: "Black Raisins",
                category: "Dried Fruits",
                description: "Juicy seedless rich",
                price: 280,
                image: "https://image.pollinations.ai/prompt/black%20raisins,photorealistic,studio%20lighting?width=512&height=512&seed=26"
            },
            {
                name: "Dried Strawberries",
                category: "Dried Fruits",
                description: "Sweet tangy snack",
                price: 600,
                image: "https://image.pollinations.ai/prompt/dried%20strawberries,photorealistic,studio%20lighting?width=512&height=512&seed=27"
            },
            {
                name: "Dried Cherries",
                category: "Dried Fruits",
                description: "Tart chewy bites",
                price: 720,
                image: "https://image.pollinations.ai/prompt/dried%20cherries,photorealistic,studio%20lighting?width=512&height=512&seed=28"
            },
            {
                name: "Dried Banana Chips",
                category: "Dried Fruits",
                description: "Crispy sweet slices",
                price: 320,
                image: "https://image.pollinations.ai/prompt/dried%20banana%20chips,photorealistic,studio%20lighting?width=512&height=512&seed=29"
            },
            {
                name: "Anjeer Roll",
                category: "Dried Fruits",
                description: "Rolled fig sweet",
                price: 780,
                image: "https://image.pollinations.ai/prompt/anjeer%20roll%20dried%20fig%20sweet,photorealistic,studio%20lighting?width=512&height=512&seed=30"
            },
            {
                name: "Dried Coconut Slices",
                category: "Dried Fruits",
                description: "Crunchy tropical treat",
                price: 400,
                image: "https://image.pollinations.ai/prompt/dried%20coconut%20slices,photorealistic,studio%20lighting?width=512&height=512&seed=31"
            },
            {
                name: "Dried Papaya",
                category: "Dried Fruits",
                description: "Sweet tropical chunks",
                price: 430,
                image: "https://image.pollinations.ai/prompt/dried%20papaya,photorealistic,studio%20lighting?width=512&height=512&seed=32"
            },
            {
                name: "Dried Apples",
                category: "Dried Fruits",
                description: "Mild sweet rings",
                price: 450,
                image: "https://image.pollinations.ai/prompt/dried%20apple%20rings,photorealistic,studio%20lighting?width=512&height=512&seed=33"
            },
            {
                name: "Dried Pears",
                category: "Dried Fruits",
                description: "Soft sweet slices",
                price: 500,
                image: "https://image.pollinations.ai/prompt/dried%20pears,photorealistic,studio%20lighting?width=512&height=512&seed=34"
            },
            {
                name: "Dried Plums",
                category: "Dried Fruits",
                description: "Sweet tart snack",
                price: 470,
                image: "https://image.pollinations.ai/prompt/dried%20plums,photorealistic,studio%20lighting?width=512&height=512&seed=35"
            },
            {
                name: "Dried Oranges",
                category: "Dried Fruits",
                description: "Zesty dried slices",
                price: 520,
                image: "https://image.pollinations.ai/prompt/dried%20orange%20slices,photorealistic,studio%20lighting?width=512&height=512&seed=36"
            },
            {
                name: "Mixed Tropical Dried Fruits",
                category: "Dried Fruits",
                description: "Flavorful fruit mix",
                price: 850,
                image: "https://image.pollinations.ai/prompt/mixed%20tropical%20dried%20fruits,photorealistic,studio%20lighting?width=512&height=512&seed=37"
            },
            {
                name: "Dryfruit Laddu",
                category: "Dried Fruits",
                description: "Traditional energy balls",
                price: 750,
                image: "https://image.pollinations.ai/prompt/dry%20fruit%20laddu%20indian%20sweet,photorealistic,studio%20lighting?width=512&height=512&seed=38"
            }





        ];

        await Product.insertMany(products);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const allProducts = await Product.find();

        // Send the entire products array as JSON response
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT}`
    );
});