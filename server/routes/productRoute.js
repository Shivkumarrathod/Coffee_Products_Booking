import express from 'express'

import {
   createProduct,
   getAllProducts,
   getProductById,
   getRecentProduct
} from '../controllers/productController.js'
const router = express.Router()


router.route('/')
      .post(createProduct)
router.route('/recentproduct')
      .get(getRecentProduct)
router.route('/getProduct')
    .get(getAllProducts)
router.route('/products/:id')
    .get(getProductById)
    
export default router