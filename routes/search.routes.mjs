import express from "express";
import Productmodel from "../models/Productmodel.mjs";

const router=express.Router();

router.get('/',async(req,res)=>{

    const {searchTerm,srt,Asc,page,limit}=req.query;
    const cnt= await Productmodel.countDocuments(searchTerm?{
        productname: { $regex: searchTerm, $options: "i" }
    }:{});
    let Prods = Productmodel.find(searchTerm?{
        productname: { $regex: searchTerm, $options: "i" }
    }:{})
    if(srt=="true"){
        console.log(srt)
        Prods=Prods.sort({price:Asc=="true"?1:-1});
    }
    Prods=await Prods.skip(limit*(page-1)).limit(limit);
    // console.log(Prods);
    res.json({Prods,cnt});
})

export default router;