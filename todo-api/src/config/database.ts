import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;

    if(!dbURI)
        throw new Error("MongoDB connection string is not defined in .env file");

    await mongoose.connect(dbURI); 
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;