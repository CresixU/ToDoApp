import express from 'express';
import todoRoutes from './routes/todoRoutes';
import connectDB from './config/database';

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api', todoRoutes);

export default app;