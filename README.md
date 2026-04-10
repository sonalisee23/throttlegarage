# SuperBike Mods

An e-commerce platform for superbike parts and accessories with government-approved certifications.

## Project Structure

```
superbike-mods/
├── public/           # Frontend files
│   ├── css/          # CSS stylesheets
│   ├── js/           # JavaScript files
│   ├── assets/       # Images, fonts, and other assets
│   └── *.html        # HTML pages
└── server/           # Backend API
    ├── models/       # MongoDB models
    ├── routes/       # API routes
    ├── middleware/   # Custom middleware
    ├── server.js     # Express server configuration
    ├── package.json  # Node dependencies
    └── .env          # Environment variables
```

## Features

- User authentication and profile management
- Product browsing by category and bike compatibility
- Shopping cart functionality
- Order processing and history
- Product rating and reviews
- Government approval certifications for parts

## Getting Started

### Frontend

The frontend is built with HTML, CSS, and vanilla JavaScript. All frontend files are in the `public` directory.

### Backend

The backend API is built with Node.js, Express, and MongoDB.

## How to Run

1. Open a terminal and navigate to the server directory:
   ```
   cd server
   ```
2. Start the backend server:
   ```
   node server.js
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

- The backend will run on [http://localhost:5001](http://localhost:5001)
- All API routes (registration, login, orders, etc.) are available from this server.

## Notes
- There is only one backend server file: `server/server.js`.
- All other server files are deprecated or for reference only.
- Make sure your frontend points to port 5001 for all API requests.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/ratings` - Add product rating

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `POST /api/users/bikes` - Add user's bike
- `DELETE /api/users/bikes/:id` - Remove user's bike

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/update/:productId` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/cancel` - Cancel order
- `PATCH /api/orders/:id/status` - Update order status (admin only) 