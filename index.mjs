import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/User.routes.mjs";
import ProductRoutes from "./routes/product.routes.mjs";
import CartRoutes from './routes/cart.routes.mjs'
import SearchRoutes from './routes/search.routes.mjs'
import path from 'path';
import { fileURLToPath } from "url";
import dns from 'dns';

dns.setServers(['8.8.8.8','1.1.1.1']);

dotenv.config();
const FE_URLS=process.env.FE_URL
const allowedOrigins=FE_URLS.split(',').map(item => item.trim())
const app=express();
app.use(express.json());
app.use(cors({ origin: allowedOrigins,credentials: true }));
app.use(cookieParser());
app.use('/api/user',UserRoutes);
app.use('/api/products',ProductRoutes);
app.use('/api/cart',CartRoutes);
app.use('/api/search',SearchRoutes);
app.get('/',async(req,res)=>{
    res.json({message:"Success"})
})
mongoose.connect(`${process.env.MONGODB_URI}`).then(() =>{
    console.log("MongoDB Connected")
    
    app.listen(3000,()=>{console.log("server listening at 3000")});
}
).catch(err => console.log(err));


