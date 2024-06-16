import fs from 'fs'
import productModel from '../models/productModel.js';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ message: "Product name is required" });
        if (!description) return res.status(400).send({ message: "Product description is required" });
        if (!price) return res.status(400).send({ message: "Product price is required" });
        if (!category) return res.status(400).send({ message: "Product category is required" });
        if (!quantity) return res.status(400).send({ message: "Product quantity is required" });
        if (image && image.size > 1000000) return res.status(400).send({ message: "Product image size should be less than 1 MB" });

        // Create new product
        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
        });

        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();

        // Success response
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error: error
        });
    }
};

export const listProductController=async(req,res)=>{
    try{
        const products = await productModel.find({}).populate('category').select('-image').limit(10).sort({ createdAt: -1 });
        res.status(200).send({
            success:true,
            message:"All products",
            count: products.length,
            products,
        })

    }catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in listing product",
            error: error
        });
    }
}

export const getSingleProductController=async(req,res)=>{
    try{
        const {slug}=req.params;
        const product =await productModel.findOne({slug}).populate('category').select('-image');
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        // Success response
        res.status(200).send({
            success:true,
            message:"Single product details",
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single product",
            error
        })
    }
}

export const productImageController=async(req,res)=>{
    try{
        const {id}=req.params;
        const product =await productModel.findById(id).select('image');
        // Check if product and image data exist
        if (product && product.image && product.image.data) {
            res.set('Content-Type', product.image.contentType);
            return res.status(200).send(product.image.data);
        } else {
            return res.status(404).send({
                success: false,
                message: "Product image not found",
            });
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting product image",
            error
        })
    }

}

export const updateProductController=async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;
        const {id}=req.params;

        // Validation
        if (!name) return res.status(400).send({ message: "Product name is required" });
        if (!description) return res.status(400).send({ message: "Product description is required" });
        if (!price) return res.status(400).send({ message: "Product price is required" });
        if (!category) return res.status(400).send({ message: "Product category is required" });
        if (!quantity) return res.status(400).send({ message: "Product quantity is required" });
        if (image && image.size > 1000000) return res.status(400).send({ message: "Product image size should be less than 1 MB" });


        // update product
        const product = await productModel.findByIdAndUpdate(id,{...req.fields,slug:slugify(name)},{new:true})

        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();

        // Success response
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error: error
        });
    }
}

export const deleteProductController=async(req,res)=>{
    try{
        const {id}=req.params;

        // Check if product exists before deleting
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
 
        // Delete product
        await productModel.findByIdAndDelete(id);

        // Success response
        res.status(200).send({
            success:true,
            message:"Product deleted successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in deleting products",
            error
        })
    }
}