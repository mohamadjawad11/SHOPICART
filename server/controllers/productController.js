import {v2 as cloudinary} from 'cloudinary';

import Product from '../models/Product.js';
export const addProduct = async (req, res) => {
    try {
        // Parse the product data sent as a string
        let productData = JSON.parse(req.body.productData);

        // Get uploaded files
        const images = req.files;

        // Upload all images to Cloudinary and get URLs
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: 'image',
                });
                return result.secure_url;
            })
        );

        // Create the product in DB
        await Product.create({
            ...productData,
            image: imagesUrl,
        });

        res.status(200).json({
            success:true,
            message:'Product added successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const productList=async (req,res)=>{

    try{
        const products=await Product.find({});
        res.status(200).json({
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:'Internal server error'
        })
    }

}

export const productById=async (req,res)=>{

    try{
        const {id}=req.body;
        const product=await Product.findById(id);
        res.status(200).json({
            product
        })
    }catch(error){
        console.log(error);
    }

}

export const changeStock=async (req,res)=>{

    try {
        const {id,inStock}=req.body;
        await Product.findByIdAndUpdate(id,{
            inStock
        })
        res.status(200).json({
            message:'Product stock updated successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Internal server error'
        })
    }
    

}