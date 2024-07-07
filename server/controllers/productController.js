import Product from "../models/ProductModel.js";
import Category from "../models/categoryModel.js";
const createProduct = async(req,res)=>{
    try {
        const {name,description,image,category,stock,price,brand,quantity} = req.body
        const product = await Product.create({
            name,
            description,
            image,
            category,
            stock,
            price,
            brand,
            quantity
        })
       res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
}

const getAllProducts = async(req,res)=>{
    try {
        const allProducts = await Product.find({})
        res.status(202).json(allProducts)
    } catch (error) {
        console.log(error);
        res.status(404).json({error:error.message})
    }
}

export {
    createProduct,
    getAllProducts
}