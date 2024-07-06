import {Router} from 'express'
import {authenticate,authorizeAdim} from '../middlewares/authMiddleware.js'
import {
    createCategory,
    listAllCategories
} from '../controllers/categoryController.js'

const router = Router()

router.route('/')
      .post(createCategory)
router.route('/categories')
    .get(listAllCategories)

export default router