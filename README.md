# Retail / Inventory API

A MongoDB + Express.js REST API for a retail and inventory management system, built with TypeScript.

## Requirements
- Node.js
- MongoDB

## Tech Stack
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose
- Zod (for validation)

## Installation

1. Install dependencies
```bash
npm install
```

2. Setup Environment Variables
Check `.env` file for:
```
MONGO_URI=your_connection_string
PORT=5000
```

3. Run the development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Runs the app in development mode using `ts-node-dev`.
- `npm run build`: Compiles TypeScript source to `dist/` directory.
- `npm start`: Runs the compiled server from `dist/server.js`.

## API Endpoints

The API is mounted at `/api` and contains the following resources:
- `/api/categories`
- `/api/suppliers`
- `/api/products`
- `/api/customers`
- `/api/orders`

Each resource supports standard CRUD operations:
- `POST /` - Create
- `GET /` - Read All (with `?page=1&limit=10` pagination)
- `GET /:id` - Read One
- `PUT /:id` - Update
- `DELETE /:id` - Delete
