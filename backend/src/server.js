import express from 'express';
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.middleware.js';
import v1Routes from './routes/v1Routes.js'
import { connectDB } from './db/userDb.js';

dotenv.config()

connectDB()
const app=express()

app.use('/v1', v1Routes)

app.use(errorHandler)

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
}) 