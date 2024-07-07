import { Router } from "express";
import {
    createProduct,
    getAllProducts
} from '../controllers/productController.js'
const router = Router()

router.route('')
      .post(createProduct)
router.route('/allproduct')
      .get(getAllProducts)
export default router