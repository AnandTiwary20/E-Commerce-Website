import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
const app = express();
const PORT = 5000;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
let db;

app.use(cors());
app.use(express.json());

// MongoDB connection
client.connect().then(() => {
  db = client.db('ecommerce');
  console.log('Connected to MongoDB');
});

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = { productId, quantity, addedAt: new Date() };
    const result = await db.collection('cart').insertOne(cartItem);
    res.json({ ...cartItem, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/cart/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await db.collection('cart').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { quantity } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/cart/:id', async (req, res) => {
  try {
    const result = await db.collection('cart').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});