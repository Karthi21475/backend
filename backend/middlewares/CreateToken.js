import jwt from "jsonwebtoken";

const createToken=(res,user)=>{
    
    const token=jwt.sign({id:user._id,isadmin:user.isadmin},process.env.JWT_SECRET,{expiresIn:"1h"});
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30*24*3600000
    });

    return token;
}
export default createToken;
