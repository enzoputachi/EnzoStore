//import packages
import path from 'path'
import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

//configure your dotenv to get your entry point
dotenv.config()
const port = process.env.PORT || 4000

//coonnect to the data base
connectDB()

//create an instance of express app                
const app = express()

//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//integrate the user route by mounting at the specified path
app.use('/api/users', userRoutes)

app.listen(port, () => console.log(`Server running on port: ${port}`));