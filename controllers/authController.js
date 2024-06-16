import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usersModel from "../models/usersModel.js";
import JWT from "jsonwebtoken"

export const registerController= async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body;

        // validations
        if(!name){
            return res.status(400).send({message:"Name is required"})
        }
        if(!email){
            return res.status(400).send({message:"Email is required"})
        }
        if(!password){
            return res.status(400).send({message:"Password is required"})
        }
        if(!phone){
            return res.status(400).send({message:"Phone Number is required"})
        }
        if(!address){
            return res.status(400).send({message:"Address is required"})
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
                _id: user._id,
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

export const forgotPasswordController=async(req,res)=>{
    try{
        const {email,newPassword}=req.body;
        // Validation
        if(!email){
            return res.status(400).send({
                succces:false,
                message:"Email is required",
            })
        }
        // Find user by email
        const user = await usersModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User does not exist"
            })
        }
        // Hash new password
        const newHashedPassword= await hashPassword(newPassword)

        // Update user's password
        await usersModel.findByIdAndUpdate(user._id,{password:newHashedPassword});
        res.status(200).send({
            success:true,
            message:"Password reset successful",
        })


    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in forgot password",
            error
        })
    }

}

export const testController=(req,res)=>{
    console.log("protected")
    res.send("protected")
}