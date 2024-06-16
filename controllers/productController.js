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
        const products = await productModel.find({}).select('-image').limit(10).sort({ createdAt: -1 });
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