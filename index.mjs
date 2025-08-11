import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/User.routes.mjs";
import ProductRoutes from "./routes/product.routes.mjs";
import CartRoutes from './routes/cart.routes.mjs'
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({ origin: 'https://frontend-git-main-karthi21475s-projects.vercel.app',credentials: true }));
app.use(cookieParser());
app.use('/api/user',UserRoutes);
app.use('/api/products',ProductRoutes);
app.use('/api/cart',CartRoutes);

mongoose.connect(`${process.env.MONGODB_URI}`).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));


app.listen(3000,()=>{console.log("server listening at 3000")});
