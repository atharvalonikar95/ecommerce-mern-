import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createcategoryController =async(req,res)=>{
    try{
        const {name}=req.body
        if(!name){
            return res.status(401).send({message:"name is required"})
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category Already Exists"
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"new Category Created",
            category
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            err,
            message:"Error in category"
        })
    }

}

//update category
export const updateCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"updated successfully",
            category
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            err,
            message:"err while updating category"
        })
    }
}


export const getCategoryController=async(req,res)=>{
    try{
        const category= await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Category list",
            category
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            message:"error in getting category",
            success:false,
            err
        })
    }
}

export const singleCategoryController=async(req,res)=>{
    try{
        const {slug}=req.params
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success:true,
            message:"single category recieved successfully",
            category
        })


    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"error in getting single category",
            err
        })
    }
}

export const deleteCategoryController=async(req,res)=>{
    try{
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"

        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:" error while category deletion"
        })
    }
}