import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles.js';
import usersRouter from './routes/users.js';
import categoryRoutes from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL // Amplify app URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB before starting the server
connectDB().then(() => {
  // Routes
  app.use('/api/articles', articlesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoryRoutes);

  // Basic route for testing
  app.get('/', (req, res) => {
    res.send('FinTech Pulse Network API is running');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
