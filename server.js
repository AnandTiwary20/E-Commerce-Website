import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
let db;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('ecommerce');
    console.log('Connected to MongoDB');
    
    // Create indexes
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    await db.collection('cart').createIndex({ productId: 1 });
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectToMongo();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// API Routes

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const { title, price, description, category, brand, stock } = req.body;
    
    // Input validation
    if (!title || !price || !description || !category || !brand) {
      return res.status(400).json({ 
        success: false,
        error: "Missing required fields: title, price, description, category, and brand are required" 
      });
    }

    // Price and stock validation
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ 
        success: false,
        error: "Price must be a positive number" 
      });
    }

    if (stock !== undefined && (isNaN(stock) || !Number.isInteger(Number(stock)) || stock < 0)) {
      return res.status(400).json({ 
        success: false,
        error: "Stock must be a non-negative integer" 
      });
    }

    // Create product data object
    const productData = {
      title: title.trim(),
      price: parseFloat(price),
      description: description.trim(),
      category: category.trim(),
      brand: brand.trim(),
      stock: stock !== undefined ? parseInt(stock) : 0,
      rating: 0,
      discountPercentage: 0,
      thumbnail: req.body.thumbnail || 'https://via.placeholder.com/150',
      images: Array.isArray(req.body.images) ? req.body.images : [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Check if product with same title already exists
    const existingProduct = await db.collection('products').findOne({ 
      title: productData.title 
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        error: "A product with this title already exists"
      });
    }

    // Insert the new product
    const result = await db.collection('products').insertOne(productData);
    const newProduct = await db.collection('products').findOne({ 
      _id: result.insertedId 
    });

    res.status(201).json({
      success: true,
      data: newProduct
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to create product",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all products with optional filtering
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    const products = await db.collection('products').find(query).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cart Endpoints

// Get cart items with product details
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await db.collection('cart').find().toArray();
    
    // Get product details for each cart item
    const cartWithProducts = await Promise.all(cartItems.map(async (item) => {
      const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });
      return {
        id: item._id.toString(),
        productId: item.productId,
        quantity: item.quantity,
        product: product ? {
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          image: product.thumbnail || product.images?.[0] || '',
          stock: product.stock || 0
        } : null
      };
    }));
    
    res.json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Check if product exists
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if product is already in cart
    const existingItem = await db.collection('cart').findOne({ productId });
    
    let result;
    if (existingItem) {
      // Update quantity if item already in cart
      const newQuantity = (existingItem.quantity || 0) + parseInt(quantity);
      result = await db.collection('cart').updateOne(
        { _id: existingItem._id },
        { $set: { quantity: newQuantity, updatedAt: new Date() } }
      );
    } else {
      // Add new item to cart
      const cartItem = {
        productId,
        quantity: parseInt(quantity),
        addedAt: new Date(),
        updatedAt: new Date()
      };
      result = await db.collection('cart').insertOne(cartItem);
    }
    
    res.status(201).json({ message: 'Item added to cart', productId });
  } catch (error) {
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }
    
    const result = await db.collection('cart').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { 
          quantity: parseInt(quantity),
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ error: 'Invalid cart item ID' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const result = await db.collection('cart').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ error: 'Invalid cart item ID' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
app.delete('/api/cart', async (req, res) => {
  try {
    await db.collection('cart').deleteMany({});
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    mongo: client.topology ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for all unmatched API routes
app.use('/api', (req, res, next) => {
  // If we get here, it means no route handled the request
  if (req.path.startsWith('/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  next();
});

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await client.close();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB connected: ${!!client.topology}`);
});