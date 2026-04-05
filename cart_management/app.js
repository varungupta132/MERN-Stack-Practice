const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const products = require('./data/products');
const cartData = require('./data/cart');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// Home page - Display products
app.get('/', (req, res) => {
  res.render('index', { products, cart: cartData.getCart() });
});

// Cart page
app.get('/cart', (req, res) => {
  const cart = cartData.getCart();
  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });
  const total = cartData.getCartTotal(products);
  res.render('cart', { cart: cartWithProducts, total });
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Get cart
app.get('/api/cart', (req, res) => {
  const cart = cartData.getCart();
  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });
  const total = cartData.getCartTotal(products);
  
  res.json({
    success: true,
    data: {
      items: cartWithProducts,
      total: total,
      itemCount: cart.length
    }
  });
});

// Add to cart
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required'
    });
  }
  
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  const cartItem = cartData.addToCart(parseInt(productId), parseInt(quantity) || 1);
  
  res.json({
    success: true,
    message: 'Product added to cart',
    data: cartItem
  });
});

// Update cart item
app.put('/api/cart/:id', (req, res) => {
  const cartItemId = parseInt(req.params.id);
  const { quantity } = req.body;
  
  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Valid quantity is required'
    });
  }
  
  const updatedItem = cartData.updateCartItem(cartItemId, parseInt(quantity));
  
  if (!updatedItem) {
    return res.status(404).json({
      success: false,
      message: 'Cart item not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Cart item updated',
    data: updatedItem
  });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
  const cartItemId = parseInt(req.params.id);
  const removedItem = cartData.removeFromCart(cartItemId);
  
  if (!removedItem) {
    return res.status(404).json({
      success: false,
      message: 'Cart item not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Item removed from cart',
    data: removedItem
  });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cartData.clearCart();
  res.json({
    success: true,
    message: 'Cart cleared'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});