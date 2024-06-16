import express from "express";
import { loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

// route object
const router =express.Router()

// routing
//REGISTER
router.post('/register',registerController);

//LOGIN
router.post('/login',loginController);

//test
router.post('/test',requiredSignIn,isAdmin,testController);

//protected route
router.post('/user-auth',requiredSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router