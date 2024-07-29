import { Router } from "express";

const router = Router()

router.route('/').post(createOrder)


export default  router