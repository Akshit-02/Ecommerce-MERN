import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

// route object
const router =express.Router()

// routing
//REGISTER
router.post('/register',registerController);

//LOGIN
router.post('/login',loginController);


//FORGOT PASSWORD
router.post('/forgot-password',forgotPasswordController);

//test
router.post('/test',requiredSignIn,isAdmin,testController);

//protected route
router.post('/user-auth',requiredSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

router.post('/admin-auth',requiredSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

export default router