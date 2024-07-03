//import mongoose
import mongoose from 'mongoose'
import asyncHandler from '../middlewares/asyncHandler.js';

//create a function to connect to db
const connectDB = asyncHandler(async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Successfully connected to db');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1) 
    }
})

export default connectDB;
