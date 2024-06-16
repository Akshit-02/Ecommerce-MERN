import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, getSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

// route object
const router =express.Router()

// routing
//create category
router.post('/create-category',requiredSignIn,isAdmin,createCategoryController);

//update category
router.post('/update-category/:id',requiredSignIn,isAdmin,updateCategoryController);


//list category
router.get('/list-category',requiredSignIn,isAdmin,categoryController);

// get particular category
router.get('/get-category/:slug',requiredSignIn,isAdmin,getSingleCategoryController)

//delete category
router.post('/delete-category/:id',requiredSignIn,isAdmin,deleteCategoryController)

export default router