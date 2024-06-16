import express from "express"
import formidable from "express-formidable"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getSingleProductController, listProductController } from "../controllers/productController.js";

const router = express.Router();

//routes
// create product
router.post('/create-product',requiredSignIn,isAdmin,formidable(),createProductController)

// list products
router.get('/list-product',listProductController)

// get single products
router.get('/get-product/:slug',getSingleProductController)


export default router