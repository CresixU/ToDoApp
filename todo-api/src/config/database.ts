import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI;

    if(!dbURI)
        throw new Error("MongoDB connection string is not defined in .env file");

    await mongoose.connect(dbURI); 
    console.log(`MongoDB connected. Database: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;