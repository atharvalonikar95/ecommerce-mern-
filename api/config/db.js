import mongoose from "mongoose";


export const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO)
        console.log(`connected to database ${conn.connection.host}`);

    }catch(err){
        console.log(err);
    }
}