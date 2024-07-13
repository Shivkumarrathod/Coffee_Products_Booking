import { Router } from "express";
import Cart from '../models/Cart.js'

const router= Router()

router.route('/').post(async(req,res)=>{
    try {
        const { product, user } = req.body;
    
        let cart = await Cart.findOne({ product, user });
    
        if (cart) {
          res.status(200).json(cart);
        } else {
          cart = await Cart.create({
            product,
            user,
          });
          res.status(202).json(cart);
        }
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
      }
})
router.route('/getproduct/:id').get(async(req,res)=>{
    try {
        const allProduct = await Cart.find({user:req.params.id}).populate('product').sort({createdAt:-1});
        res.status(200).json(allProduct)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error:error.message}) 
    }
})
router.route('/deletecart').delete(async(req,res)=>{
   try {
    const {_id}= req.body
    const cart = await Cart.findByIdAndDelete({_id})
    res.status(200).json(cart)
   } catch (error) {
        console.log(error.message);
        res.status(400).json({error:error.message}) 
   }
})

export default router 