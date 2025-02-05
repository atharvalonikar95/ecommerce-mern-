import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
export const registerController = async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer}=req.body
        //validations
        if(!name){
            return res.send({message:"name is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
        if(!phone){
            return res.send({message:"phone is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        }
        if(!answer){
            return res.send({message:"answer is required"})
        }

        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({name,email,phone,address,answer,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"User registered successfully",
            user
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Err in Registration",
            err
        })
    }
}

export const loginController=async(req,res)=>{
    try{
        const {email,password}= req.body
        //validation

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"invalid credentials"
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user){
        
            return res.status(404).send({
                success:false,
                message:"email is  not registered"
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }

        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message:"login successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                answer:user.answer,
                role:user.role,
            },
            token

        })
    }catch(err){
        console.log(err);
        res.send({
            success:false,
            message:"Error in login",
            err
        })
    }


}

export const forgotpasswordController=async(req,res)=>{
    try{
        const {email,newpassword,answer}=req.body
        // !newpassword !answer
        if(!email){
            return res.status(400).send({
                success:false,
                message:"email required"
            })
        }
        if(!newpassword){
            return res.status(400).send({
                success:false,
                message:"newpassword required"
            })
        }        
        if(!answer){
            return res.status(400).send({
                success:false,
                message:"answer required"
            })
        }

        const user = await userModel.findOne({email,answer})
        if(!user){
            res.status(404).send({
                success:false,
                message:"wrong user or password "

            })
        }

        const hashed = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"password reset successfully"
        })
        
    }catch(err){
        console.log(err);
        res.send({
            success:false,
            message:'something went wrong',
            err


        })

    }

}

export const testController=(req,res)=>{
    res.send({
        message:"Protected routes"
    })
}