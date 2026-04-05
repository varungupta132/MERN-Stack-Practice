// In-memory cart storage (in production, use database)
let cart = [];
let cartIdCounter = 1;

const cartData = {
  // Get all cart items
  getCart: () => cart,
  
  // Add item to cart
  addToCart: (productId, quantity = 1) => {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem = {
        id: cartIdCounter++,
        productId: productId,
        quantity: quantity,
        addedAt: new Date()
      };
      cart.push(newItem);
      return newItem;
    }
  },
  
  // Update cart item quantity
  updateCartItem: (cartItemId, quantity) => {
    const item = cart.find(item => item.id === cartItemId);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return null;
  },
  
  // Remove item from cart
  removeFromCart: (cartItemId) => {
    const index = cart.findIndex(item => item.id === cartItemId);
    if (index !== -1) {
      return cart.splice(index, 1)[0];
    }
    return null;
  },
  
  // Clear entire cart
  clearCart: () => {
    cart = [];
    return true;
  },
  
  // Get cart total
  getCartTotal: (products) => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }
};

module.exports = cartData;