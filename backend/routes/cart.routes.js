import express from "express";
import authenticate from "../middlewares/Auth.js";
import Cartitemmodel from "../models/cartitemsmodel.js";
import Cartmodel from '../models/cartmodel.js'
const router = express.Router();

router.route('/').post(authenticate,async(req,res)=>{
    const {productid,productname,price,image} =req.body;
    const cartItemData={productid,productname,price,image,quantity:1}
    const NewcartItem=new Cartitemmodel(cartItemData);
    const item=await Cartmodel.findById({userId:res.user._id});
    console.log(item);

    try{
        await NewcartItem.save()
        // if(!item){
        //     await Cartmodel.create({userId:res.user._id,item:[NewcartItem]})
        // }else{
        //     item.item.push(NewcartItem)
        // }
        console.log("item added")
        res.json({message:"Item Added to Cart"})
    }catch(err){
        res.json({message:`${err}`})
        console.log(err);
    }
}).get(authenticate,async(req,res)=>{
    const items=await Cartitemmodel.find({});
    // const item=await Cartmodel.findById({userId:res.user._id});
    try{
        res.json(items);
    }catch(err){
        console.log(err.message);
    }
})
router.route('/:id').put(authenticate,async(req,res)=>{
    const {id}=req.params;
    const {quantity}=req.body;
    
    await Cartitemmodel.findByIdAndUpdate({_id:id},{quantity:quantity});
    // const items = await Cartmodel.findById({userId:res.user._id});

    res.json({message:"Upadated it broo"})
    
}).delete(authenticate,async(req,res)=>{
    const {id}=req.params;
    await Cartitemmodel.findByIdAndDelete({_id:id})
    // const items = await Cartmodel.findById({userId:res.user._id})
    res.json({message:"Deleted it broo"})
})

export default router;
