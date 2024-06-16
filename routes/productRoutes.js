import express from "express"
import formidable from "express-formidable"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getSingleProductController, listProductController, productImageController, updateProductController } from "../controllers/productController.js";

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

//update product
router.post('/update-product/:id',requiredSignIn,isAdmin,formidable(),updateProductController);


//delete product
router.delete('/delete-product/:id',requiredSignIn,isAdmin,deleteProductController)

export default router