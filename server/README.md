# SuperBike Mods - Backend Server

This is the backend API server for the SuperBike Mods e-commerce website.

## Setup Instructions

1. Install Node.js and npm if you haven't already
2. Install MongoDB and make sure it's running on localhost:27017
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in this directory with the following content:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/superbike-mods
   JWT_SECRET=superbike-mods-secret-key-change-in-production
   NODE_ENV=development
   ```
5. Run the environment check script:
   ```
   node checkenv.js
   ```
6. Start the server:
   ```
   node server.js
   ```
   
## API Endpoints

The server provides the following endpoints:

- `/api/auth` - Authentication routes
- `/api/users` - User management routes
- `/api/products` - Product management routes
- `/api/cart` - Shopping cart routes
- `/api/orders` - Order management routes

## Project Structure

- `server.js` - Main entry point
- `models/` - MongoDB schemas
- `routes/` - API routes
- `middleware/` - Express middleware

## Troubleshooting

If you encounter issues:

1. Make sure MongoDB is running
2. Check if all dependencies are installed
3. Verify that the `.env` file exists and has the correct configuration
4. Look for error messages in the console 