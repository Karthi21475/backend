import express from "express";
import Productmodel from "../models/Productmodel.mjs";

const router=express.Router();

router.get('/',async(req,res)=>{

    const {searchTerm,sortAsc,filter,page,limit}=req.query;
    const val=filter=="true"?{price:sortAsc=="true"?1:-1}:{_id:1}
    const prods = await Productmodel.find({
        productname: { $regex: searchTerm, $options: "i" }
    })
    const cnt= prods.length;
    const Prods = await Productmodel.find({
        productname: { $regex: searchTerm, $options: "i" }
    }).sort(val).skip(limit*(page-1)).limit(limit);
    res.json({Prods,cnt});
})

export default router;