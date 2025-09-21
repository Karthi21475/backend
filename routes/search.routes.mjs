import express from "express";
import Productmodel from "../models/Productmodel.mjs";

const router=express.Router();

router.get('/',async(req,res)=>{

    const {searchTerm,sortAsc,filter}=req.query;
    const val=filter=="true"?{price:sortAsc=="true"?1:-1}:{_id:1}
    console.log(val);
    const prods = await Productmodel.find({
        productname: { $regex: searchTerm, $options: "i" }
    }).sort(val).limit(20);
    res.json(prods);
})

export default router;