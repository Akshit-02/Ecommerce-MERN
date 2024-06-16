import express from "express"
import formidable from "express-formidable"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getSingleProductController, listProductController, productImageController } from "../controllers/productController.js";

const router = express.Router();

//routes
// create product
router.post('/create-product',requiredSignIn,isAdmin,formidable(),createProductController)

// list products
router.get('/list-product',listProductController)

// get single products
router.get('/get-product/:slug',getSingleProductController)

//get product image
router.get('/product-image/:id',productImageController)

export default router