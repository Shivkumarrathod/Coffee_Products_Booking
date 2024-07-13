import { Schema,model } from "mongoose";

const {ObjectId} = Schema

const cartSchema =new Schema({
    product:{type:ObjectId,required:true,ref:'product'},
    user:{type:ObjectId,required:true,ref:"User"}
},{timestamps:true})

const Cart = model('cart',cartSchema)

export default Cart