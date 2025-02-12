import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes'


const app=express()
dotenv.config();

const PORT=5000;
 const connectDB=require('./db')
 const cors = require('cors');
 app.use(cors());
connectDB();
app.use(express.json());
app.use("/api", authRoutes);

app.use('/storage', express.static('uploads'));


app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})

   