import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import categoryRoutes from './routes/category.routes';
import supplierRoutes from './routes/supplier.routes';
import productRoutes from './routes/product.routes';
import customerRoutes from './routes/customer.routes';
import orderRoutes from './routes/order.routes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
