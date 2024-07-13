import Product from "../models/productModel.js"

const createProduct=async(req,res)=>{
   try {
     const {name,image,description,brand,quantity,stock,category,price} = req.body

     const product = await Product.create({
        name,image,description,brand,quantity,stock,category,price,
     })
     res.status(201).json(product)
   } catch (error) {
    console.log(error.message);
    res.status(400).json({error:error.message})
   }
}
const getAllProducts=async(req,res)=>{
    try { 
      const allProduct = await Product.find({})

      res.status(201).json(allProduct)
    } catch (error) {
     console.log(error.message);
     res.status(400).json({error:error.message})
    }
 }
const getProductById = async(req,res)=>{
   try {
      console.log(req.params.id);
      const product = await Product.findById(req.params.id)
      console.log(product);
      res.status(200).json(product)
   } catch (error) {
      console.log(error.message);
     res.status(400).json({error:error.message})
   }
}
const getRecentProduct = async(req,res)=>{
   try {
      const product  = await Product.findOne().sort({ createdAt: -1 });
      res.status(200).json(product)
   } catch (error) {
     console.log(error.message);
     res.status(400).json({error:error.message})
   }
}
 export {
    createProduct,
    getAllProducts,
    getProductById,
    getRecentProduct
 }