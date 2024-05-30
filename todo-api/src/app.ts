import express from 'express';
import todoRoutes from './routes/todoRoutes';
import connectDB from './config/database';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

connectDB();

app.use(express.json());
app.use(errorHandlingMiddleware)
app.use(cors(corsOptions));
app.use('/api', todoRoutes);


export default app;