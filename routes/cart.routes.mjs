import express from "express";
import authenticate from "../middlewares/Auth.mjs";
import Cartitemmodel from "../models/cartitemsmodel.mjs";
import Cartmodel from '../models/cartmodel.mjs'
const router = express.Router();

router.route('/').post(authenticate,async(req,res)=>{
    const {productid,productname,price,image} =req.body;
    const cartItemData={productid,productname,price,image,quantity:1}
    try{
        await Cartmodel.findOneAndUpdate({userId:res.user.id},{items:[...item.items,cartItemData]});
        res.json({message:"Item Added to Cart"})
    }catch(err){
        res.json({message:`${err}`})
        console.log(err);
    }
}).get(authenticate,async(req,res)=>{
    try{
    const item=await Cartmodel.findOne({userId:res.user.id});
        res.json({item});
    }catch(err){
        console.log(err.message);
    }
})
router.route('/:id').put(authenticate,async(req,res)=>{
    const {id}=req.params;
    const {quantity}=req.body;
    
    await Cartitemmodel.findByIdAndUpdate({_id:id},{quantity:quantity});
    const items = await Cartmodel.findOne({userId:res.user.id});
    items.items=items.items.map((item)=>{
        if(item._id==id){
            item.quantity=quantity;
        }
        return item;
    })
    await items.save();

    res.json({message:"Upadated it broo"})
    
}).delete(authenticate,async(req,res)=>{
    const {id}=req.params;

    const items = await Cartmodel.findOne({userId:res.user.id})
    items.items=items.items.filter(item=>item._id!=id);
    await items.save();

    res.json({message:"Deleted it broo"})
})

export default router;
