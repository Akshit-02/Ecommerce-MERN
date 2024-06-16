import express from "express";
import { loginController, registerController } from "../controllers/authController.js";

// route object
const router =express.Router()

// routing
//REGISTER
router.post('/register',registerController)

//LOGIN
router.post('/login',loginController);

export default router