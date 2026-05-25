import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const retailSeedData = [
  { 
    name: "Apple", 
    category: "Fruit", 
    description: "Fresh and crispy", 
    price: 150,
    offerPrice: 130, 
    isStatic: true, // Crucial
    image:
      "https://i.pinimg.com/736x/94/d3/f4/94d3f46699dc2b61a46632bcc31146aa.jpg"
    
  },
  { 
    name: "Banana", 
    category: "Fruit", 
    description: "Rich in potassium", 
    price: 94,
    offerPrice: 75, 
    isStatic: true,
    image:
      "https://i.pinimg.com/736x/19/a9/67/19a967af9075e9fba56eab1ba1e9abf4.jpg"
    
  },
  { 
    name: "Orange", 
    category: "Fruit", 
    description: "Packed with vitamin C", 
    price: 200, 
    isStatic: true,
    image:
      "https://i.pinimg.com/control1/736x/7a/aa/a5/7aaaa545e00e8a434850e80b8910dd94.jpg"
    
  },
  { 
    name: "Grapes", 
    category: "Fruit", 
    description: "Sweet and juicy", 
    price: 250, 
    isStatic: true,
    image: 
      "https://i.pinimg.com/control1/1200x/24/8d/d8/248dd846884751aed1dcecc51234f358.jpg"
    
  },
  { 
    name: "Strawberry", 
    category: "Fruit", 
    description: "Delicious red berries", 
    price: 300, 
    isStatic: true,
    image:
      "https://i.pinimg.com/736x/0c/0c/47/0c0c479d9d5c84afe7bfc1e9cbd12dc0.jpg"
    
  },
  { 
    name: "Carrot", 
    category: "Vegetable", 
    description: "Healthy and crunchy", 
    price: 100, 
    isStatic: true,
    image: 
      "https://i.pinimg.com/1200x/53/4f/45/534f4541178aad156f1a1be0c452d244.jpg"
    
  },
  { 
    name: "Broccoli", 
    category: "Vegetable", 
    description: "Nutrient-rich greens", 
    price: 175, 
    isStatic: true,
    image: 
      "https://i.pinimg.com/736x/e7/c1/ee/e7c1eecf5854ddd0f61ef85fc82ac3c5.jpg"
    
  },
  { 
    name: "Lettuce", 
    category: "Vegetable", 
    description: "Crisp and fresh", 
    price: 120, 
    isStatic: true,
    image:
      "https://i.pinimg.com/control1/736x/dc/72/78/dc7278cf94dddf908ff5c1320a413ac9.jpg"
  
  },
  { 
    name: "Tomato", 
    category: "Vegetable", 
    description: "Versatile and flavorful", 
    price: 180, 
    isStatic: true,
    image: 
      "https://i.pinimg.com/1200x/93/d2/8a/93d28aa33819d61bb3dc3cfd729d5a6e.jpg"
  },
  { 
    name: "Cucumber", 
    category: "Vegetable", 
    description: "Cool and hydrating", 
    price: 130, 
    isStatic: true,
    image: 
      "https://i.pinimg.com/1200x/3f/19/11/3f1911124a0f75010bba79b50d7f9bba.jpg"

  }
];

export const seedDatabase = async () => {
  try {
    // 1. Wipe out any duplicate database entries matching our hardcoded flag condition
    const deleteResult = await Product.deleteMany({ isStatic: true });
    console.log(`🗑️ Successfully deleted ${deleteResult.deletedCount} old static items.`);

    // 2. Insert clean copies back into your collection
    await Product.insertMany(retailSeedData);
    console.log('🌱 Database seeded with fresh copies of static retail items!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};