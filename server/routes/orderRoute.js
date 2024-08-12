import { Router } from "express";
import Order from "../models/orderModel.js";

const router = Router()

router.route('/').post(async(req,res)=>{
    const {product,user,toAddress,paymentMethod,paymentResult} = req.body
    try {
        const order = await Order.create({
           product:product,
           user:user,
           toAddress:toAddress,
           paymentMethod:paymentMethod,
           paymentResult:paymentResult,
           isPaid:true,
           paidAt:new Date(),
           isDelivered:false,
        })
        console.log(order);
        res.status(202).json(order)
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error})
    }
})


export default  router