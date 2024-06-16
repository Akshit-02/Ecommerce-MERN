import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController=async(req,res)=>{
    try{
        const {name}=req.body;

         // Validation
        if(!name){
            return res.status(404).send({message:"Category name is required"})
        }
        
        // Check if category already exists
        const existingCategory=await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category already exists",
            })
        }

        // Create new category
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"Category created successful",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create category",
            error
        })
    }

}
