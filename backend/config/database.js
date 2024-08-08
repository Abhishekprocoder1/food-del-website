import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://abhishek88414:933422@cluster0.giqhgho.mongodb.net/food-delivery').then(()=>{
        console.log("database connected")
    })
}