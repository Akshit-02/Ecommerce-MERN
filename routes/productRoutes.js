import express from "express"
import formidable from "express-formidable"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";

const router = express.Router();

//routes
// create product
router.post('/create-product',requiredSignIn,isAdmin,formidable(),createProductController)

export default router