import express from 'express';
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js';
import v1Routes from './routes/v1.routes.js'
import { connectDB } from './db/userDb.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

connectDB()
const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:true,
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-cookie"]
}));

app.use('/v1', v1Routes)

app.use(errorHandler)

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
}) 