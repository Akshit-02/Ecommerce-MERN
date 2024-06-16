import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController } from "../controllers/categoryController.js";

// route object
const router =express.Router()

// routing
//create category
router.post('/create-category',requiredSignIn,isAdmin,createCategoryController);


export default router