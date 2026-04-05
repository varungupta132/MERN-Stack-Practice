# Cart Management System

A full-featured cart management backend project built with Node.js, Express, and Bootstrap. This project provides a complete REST API for managing products and shopping cart functionality with a responsive web interface.

## Features

### Backend (REST API)
- **Product Management**: View all products, get single product details
- **Cart Operations**: Add to cart, update quantities, remove items, clear cart
- **Data Persistence**: In-memory storage (easily replaceable with database)
- **RESTful Endpoints**: Well-structured API endpoints
- **Error Handling**: Comprehensive error responses

### Frontend (Bootstrap UI)
- **Responsive Design**: Mobile-first Bootstrap 5 interface
- **Product Catalog**: Grid layout with product cards
- **Shopping Cart**: Full cart management interface
- **Real-time Updates**: Dynamic cart count and totals
- **Interactive Features**: Quantity selectors, filters, sorting
- **Toast Notifications**: User feedback for actions

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

## Installation

1. **Clone or create the project directory**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Access the application**:
   - Web Interface: http://localhost:3000
   - API Base URL: http://localhost:3000/api

## Project Structure

```
cart_management/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── data/
│   ├── products.js        # Product data
│   └── cart.js           # Cart management logic
├── views/
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Products page
│   └── cart.ejs          # Cart page
├── public/
│   └── js/
│       └── cart.js       # Frontend JavaScript
└── README.md             # This file
```

## Usage Examples

### Adding Products to Cart (API)
```javascript
// Add product with ID 1, quantity 2
fetch('/api/cart/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ productId: 1, quantity: 2 })
})
```

### Getting Cart Contents (API)
```javascript
fetch('/api/cart')
  .then(response => response.json())
  .then(data => console.log(data.data.items))
```

## Customization

### Adding New Products
Edit `data/products.js` to add new products:
```javascript
{
  id: 5,
  name: 'New Product',
  price: 99,
  image: 'image-url',
  desc: 'Product description',
  category: 'Category',
  stock: 10
}
```

### Database Integration
Replace the in-memory storage in `data/cart.js` with your preferred database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- MySQL with Knex.js

### Styling Customization
- Modify Bootstrap classes in EJS templates
- Add custom CSS in the `<style>` section of `layout.ejs`
- Create separate CSS files in `public/css/`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, Bootstrap 5, Font Awesome
- **Styling**: Bootstrap 5, Custom CSS
- **JavaScript**: Vanilla JS for frontend interactions

## Future Enhancements

- User authentication and sessions
- Database integration
- Payment processing
- Order management
- Product search and filtering
- Wishlist functionality
- Product reviews and ratings
- Admin panel for product management

## License

MIT License - feel free to use this project for learning and development purposes.