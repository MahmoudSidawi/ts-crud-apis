import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
