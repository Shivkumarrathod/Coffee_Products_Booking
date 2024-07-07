import mongoose, { Schema,model } from "mongoose";
const {ObjectId} = mongoose.Schema

const coffeeProductSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:ObjectId,required:true,ref:"Category"},
    stock:{type:Number,required:true},
    likes:{
        count:{type:Number,default:0},
        users:[{type:ObjectId,ref:"User"}],
    },
    dislike:{
        count:{type:Number,default:0,},
        users:[{type:ObjectId,ref:"User"}],
    },
    price:{type:Number,required:true},
    brand:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
},{timestamps:true})

const Product = model('Product',coffeeProductSchema)

export default Product
