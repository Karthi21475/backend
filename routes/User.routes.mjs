import express from 'express';
import createToken from "../middlewares/CreateToken.mjs";
import Authenticate from "../middlewares/Auth.mjs";
import Usermodel from "../models/Usermodel.mjs";
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';
import isAdmin from '../middlewares/isAdmin.mjs';
import Cartitemmodel from '../models/cartitemsmodel.mjs';
import Cartmodel from '../models/cartmodel.mjs';

const router=express.Router();



router.get('/auth',Authenticate,async(req,res)=>{
    res.json({message:'User Authenticated'})
})
router.get('/admincheck',Authenticate,isAdmin,async(req,res)=>{
    res.json({message:'Is Admin'})
})
router.post('/signup',async(req,res)=>{

    const {username,password,email}=req.body;
        
    const isUsernameExisting= await Usermodel.findOne({username});
    const isEmailExisting= await Usermodel.findOne({email});
    if(isUsernameExisting){
        return res.json({message:"username already taken"})
    }
    if(isEmailExisting){
    return res.json({message:"email already in use"})
    }
    
    const hashedPassword=await bcrypt.hash(password,10);
    
    const newuser = new Usermodel({username ,password:hashedPassword,email});
    await newuser.save();

    const user=await Usermodel.findOne({username});

    const newcart = new Cartmodel({userId:user._id,items:[]})
    await newcart.save();
    
    res.json({message:"User Created"});
});
router.post('/login',async(req,res)=>{
    const {username,password} = req.body;

    const user = await Usermodel.findOne({username});

    if(user){
        const passwordCheck=await bcrypt.compare(password,user.password);
        if(passwordCheck){
            createToken(res,user);
            res.json({message:'Login Success'});
        }else{
            res.json({message:"Incorrect Password"})
        }
    }
    else{
        res.json({message:"user does not exist"});
    }
});
router.post('/logout',async(req,res)=>{
    res.cookie('token',"",{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        expires: new Date(0)
    });
    res.json({message:"User Logged Out"});
});

export default router;
