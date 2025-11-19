import { MongoClient } from 'mongodb';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);

async function setupDatabase() {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    
    // Clear existing collections
    await db.collection('products').deleteMany({});
    await db.collection('cart').deleteMany({});
    
    // Real products from dummyjson (beauty products that your frontend shows)
    const products = [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        brand: 'Essence',
        category: 'beauty',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
        images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp']
      },
      {
        id: 2,
        title: 'Eyeshadow Palette with Mirror',
        description: 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.',
        price: 19.99,
        discountPercentage: 18.19,
        rating: 2.86,
        stock: 34,
        brand: 'Glamour Beauty',
        category: 'beauty',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
        images: ['https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp']
      },
      {
        id: 3,
        title: 'Powder Canister',
        description: 'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
        price: 14.99,
        discountPercentage: 9.84,
        rating: 4.64,
        stock: 89,
        brand: 'Velvet Touch',
        category: 'beauty',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
        images: ['https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp']
      },
      {
        id: 4,
        title: 'Red Lipstick',
        description: 'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 91,
        brand: 'Chic Cosmetics',
        category: 'beauty',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp',
        images: ['https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp']
      },
      {
        id: 5,
        title: 'Red Nail Polish',
        description: 'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
        price: 8.99,
        discountPercentage: 11.44,
        rating: 4.32,
        stock: 79,
        brand: 'Nail Couture',
        category: 'beauty',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp',
        images: ['https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp']
      }
    ];
    
    const productResult = await db.collection('products').insertMany(products);
    console.log(`Inserted ${productResult.insertedCount} products`);
    
    // Create indexes
    await db.collection('products').createIndex({ id: 1 });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('cart').createIndex({ productId: 1 });
    
    console.log('Database setup completed with real beauty products!');
    
  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    await client.close();
  }
}

setupDatabase();
