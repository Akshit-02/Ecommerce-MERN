import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usersModel from "../models/usersModel.js";
import JWT from "jsonwebtoken"

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

export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"Invalid email or password"
            }) 
        }

        //check user existence
        const user= await usersModel.findOne({email})
        if(!user){
            return res.status(404).send({
                succces:false,
                message:"Email is not registered",
            })
        }

        // verify password
        const matchPassword=await comparePassword(password,user.password)
        if(!matchPassword){
            return res.status(400).send({
                succces:false,
                message:"Invalid password"
            })
        }

        // Generate JWT token
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message:"Login successful",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,

            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error,
        })
    }
}

export const testController=(req,res)=>{
    console.log("protected")
    res.send("protected")
}