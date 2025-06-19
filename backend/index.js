import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/User.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import CartRoutes from './routes/cart.routes.js'
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({ origin: 'https://frontend-git-main-karthi21475s-projects.vercel.app/' }));
app.use(cookieParser());
app.use('/api/user',UserRoutes);
app.use('/api/products',ProductRoutes);
app.use('/api/cart',CartRoutes);

mongoose.connect("mongodb+srv://Karthi:Karthik121475@karthi.b79kw.mongodb.net/").then(() => console.log("MongoDB Connected")).catch(err => console.log(err));


app.listen(3000,()=>{console.log("server listening at 3000")});
