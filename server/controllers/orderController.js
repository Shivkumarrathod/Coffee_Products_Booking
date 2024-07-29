import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

const createOrder = async(req,res)=>{
   try {
     const {product,user,toAddress,paymentMethod} = req.body
     
     const productDetails = await Product.findById(product)
     
     const order = await Order.create({
        product,
        user,
        toAddress,
        paymentMethod,
     })
     
   } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message})
   }
}

export {
    createOrder
}