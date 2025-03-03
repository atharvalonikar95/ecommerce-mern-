import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    }
})

export default mongoose.model('Category',categorySchema)