import { hashPassword } from "../helpers/authHelper.js";
import usersModel from "../models/usersModel.js";

export const registerController= async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body;

        // validations
        if(!name){
            return res.status(400).send({error:"Name is required"})
        }
        if(!email){
            return res.status(400).send({error:"Email is required"})
        }
        if(!password){
            return res.status(400).send({error:"Password is required"})
        }
        if(!phone){
            return res.status(400).send({error:"Phone Number is required"})
        }
        if(!address){
            return res.status(400).send({error:"Address is required"})
        }

        //check user
        const existingUser=await usersModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message:"Email already registered. Please Login",
            })
        }

        //register user
        const hashedPassword=await hashPassword(password);
        //add record
        const user =await new usersModel({name, email, phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })

    }
    
}