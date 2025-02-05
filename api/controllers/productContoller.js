import { error } from "console";
import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity } = req.fields
        const { photo } = req.files


        //validation
        if (!name) {
            return res.status(500).send({ error: "name is required" })
        }
        if (!description) {
            return res.status(500).send({ error: "description is required" })
        }
        if (!price) {
            return res.status(500).send({ error: "price is required" })
        }
        if (!category) {
            return res.status(500).send({ error: "category is required" })
        }
        if (!quantity) {
            return res.status(500).send({ error: "quantity is required" })
        }
        if (!photo && photo.size > 1000000) {
            return res.status(500).send({ error: "photo is required" })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "product created successfully",
            products,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "error in product creation",
            success: false,
            err
        })
        
    }

}

export const getProductController = async (req, res) => {

    try {
        const products = await productModel.find({}).populate('category').select("-photo").sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Got all products successfully",
            products_count: products.length,
            products
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error while getting products",
            err
        })
    }

}

export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "single category got successfully",
            product
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in getting single product",
            err
        })
    }
}
export const productphotoController = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid).select("photo")
        if (product.photo.data) {
            res.set('content-type', product.photo.contentType)
            return res.status(200).send({
                success: true,
                message: "Photo got successfully",
                product
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in getting photo",
            err
        })
    }
}

export const deleteProductController=async(req,res)=>{
    try{
        const {pid}=req.params

        await productModel.findByIdAndDelete(pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product deleted sucessfully",

        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in deleting product",
            err
        })
    }
}

//update product
export const updateProductController=async(req,res)=>{
    try {
        const { name, slug, description, price, category, quantity } = req.fields
        const { photo } = req.files


        //validation
        if (!name) {
            return res.status(500).send({ error: "name is required" })
        }
        if (!description) {
            return res.status(500).send({ error: "description is required" })
        }
        if (!price) {
            return res.status(500).send({ error: "price is required" })
        }
        if (!category) {
            return res.status(500).send({ error: "category is required" })
        }
        if (!quantity) {
            return res.status(500).send({ error: "quantity is required" })
        }
        if (!photo && photo.size > 1000000) {
            return res.status(500).send({ error: "photo is required" })
        }
        const {pid}=req.params
        const products = await  productModel.findByIdAndUpdate(pid,{ ...req.fields, slug: slugify(name) },{new:true})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "product updated successfully",
            products,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "error in product updation",
            success: false,
            err
        })
    }

}