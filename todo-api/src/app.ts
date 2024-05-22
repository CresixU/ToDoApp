import express from 'express';
import todoRoutes from './routes/todoRoutes';
import connectDB from './config/database';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';

const app = express();

connectDB();

app.use(express.json());
app.use('/api', todoRoutes);
app.use(errorHandlingMiddleware)

export default app;