import User from "../models/userModels.js";
import { validateToken } from "../utils/createToken.js";
import asyncHandler from "./asynHandler.js";

const authenticate = asyncHandler(async (req,res,next)=>{
   let token
   console.log(req.cookies.user);
   token = await req.cookies.user
   console.log("token:"+token);
  if (token) {
    try {
        const decoded = validateToken(token)
        console.log(decoded);
        req.user = await User.findById(decoded.userId).select("-password")
        console.log(User.findById(decoded.userId).select("-password"));
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized , token failed.")
    }
  }else{
    res.status(401)
    throw new Error("Login first")
  }
})


const authorizeAdim = async(req,res,next)=>{
    if(req.user && req.user.isAdmin ){
        next()
    }else{
        res.status(401).send("Not authorized as an admin")
    }
}
export {authenticate,authorizeAdim}