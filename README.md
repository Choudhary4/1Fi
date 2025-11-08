# 1Fi Full Stack Developer Assignment

A full-stack web application that displays smartphones with EMI (Equated Monthly Installment) plans backed by mutual funds.

## Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **CORS** enabled
- **dotenv** for environment variables

## Features

- Dynamic product display with product information (name, variant, price, images)
- Multiple EMI plan options for each product
- Interactive plan selection
- Responsive design with Tailwind CSS
- RESTful API architecture
- 4 products with multiple variants and color options
- Each product has 2 or more EMI plans with different tenures and interest rates

## Project Structure

```
1Fi/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   └── products.js        # Product API routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   ├── seed.js                # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already created with default values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/emi-store
     NODE_ENV=development
     ```
   - Modify if needed for your environment

4. Start MongoDB:
   ```bash
   # On Windows (if MongoDB is installed as a service)
   net start MongoDB

   # Or run mongod manually
   mongod
   ```

5. Seed the database with sample products:
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already created:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will run on http://localhost:5173

## API Endpoints

### Products

#### GET /api/products
Get all products with their EMI plans

**Response:**
```json
[
  {
    "_id": "...",
    "name": "iPhone 17 Pro",
    "variant": "256GB",
    "price": 127400,
    "originalPrice": 134900,
    "mrp": 134900,
    "image": "...",
    "badge": "NEW",
    "colors": [
      {
        "name": "Desert Titanium",
        "code": "#e4a07c"
      }
    ],
    "emiPlans": [
      {
        "tenure": 3,
        "monthlyPayment": 44967,
        "interestRate": 0,
        "cashback": 0
      }
    ]
  }
]
```

#### GET /api/products/:id
Get a single product by ID

**Response:**
```json
{
  "_id": "...",
  "name": "iPhone 17 Pro",
  "variant": "256GB",
  "price": 127400,
  "emiPlans": [...]
}
```

#### POST /api/products
Create a new product

**Request Body:**
```json
{
  "name": "Product Name",
  "variant": "128GB",
  "price": 50000,
  "originalPrice": 55000,
  "mrp": 55000,
  "image": "image_url",
  "colors": [...],
  "emiPlans": [...]
}
```

## Database Schema

### Product Schema

```javascript
{
  name: String (required),
  variant: String (required),
  price: Number (required),
  originalPrice: Number (required),
  mrp: Number (required),
  image: String (required),
  badge: String,
  colors: [
    {
      name: String (required),
      code: String (required)
    }
  ],
  emiPlans: [
    {
      tenure: Number (required),
      monthlyPayment: Number (required),
      interestRate: Number (required),
      cashback: Number (default: 0)
    }
  ],
  timestamps: true
}
```

## Example Response

### Sample Product Data

The application includes 4 pre-seeded products:

1. **iPhone 17 Pro** (256GB)
   - Price: ₹1,27,400
   - 4 color variants
   - 7 EMI plans (3, 6, 12, 24, 36, 48, 60 months)

2. **Samsung Galaxy S24 Ultra** (512GB)
   - Price: ₹1,19,999
   - 3 color variants
   - 6 EMI plans

3. **Google Pixel 9 Pro** (256GB)
   - Price: ₹1,09,999
   - 3 color variants
   - 6 EMI plans

4. **OnePlus 12** (256GB)
   - Price: ₹64,999
   - 2 color variants
   - 5 EMI plans

## Running the Full Application

1. Make sure MongoDB is running
2. Start the backend server (from `/backend`):
   ```bash
   npm run dev
   ```
3. Start the frontend (from `/frontend`):
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Features Implemented

- ✅ Dynamic data loading from MongoDB via REST API
- ✅ Unique URLs for each product (e.g., `/products/iphone-17-pro`)
- ✅ At least 3 products with 2+ variants each
- ✅ Product details: name, variant, MRP, price, image
- ✅ EMI plans with monthly payment, tenure, interest rate, and cashback
- ✅ Plan selection functionality
- ✅ Responsive UI with Tailwind CSS
- ✅ RESTful API with Express.js
- ✅ MongoDB schema and seed data
- ✅ CORS enabled for cross-origin requests

## Deployment Ready

This application can be deployed to:
- **Frontend**: Vercel, Netlify, Render
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas

For deployment, update the environment variables:
- Frontend `.env`: Set `VITE_API_URL` to your deployed backend URL
- Backend `.env`: Set `MONGODB_URI` to your MongoDB Atlas connection string

## Development Notes

- The backend runs on port 5000
- The frontend runs on port 5173 (Vite default)
- MongoDB default connection: `mongodb://localhost:27017/emi-store`
- All API routes are prefixed with `/api`
- CORS is enabled for all origins in development

## Author

Full Stack Developer Assignment for 1Fi
