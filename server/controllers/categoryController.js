import Category from '../models/categoryModel.js'

const createCategory = async(req,res)=>{
    const {name} = req.body
    try {
      const isCategory = await Category.findOne({name})  
      if(!isCategory){
       const category= await Category.create({
            name:name,
        })
        res.status(200).json(category)
      }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const listAllCategories = async(req,res)=>{
    try {
        const allcategories = await Category.find({})
        res.json(allcategories)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export {
    createCategory,
    listAllCategories,
}