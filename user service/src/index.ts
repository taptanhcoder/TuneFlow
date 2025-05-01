import express from 'express'
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDB =async() =>{
    try {
        mongoose.connect(process.env.MONGO_URI as string,{
            dbName:"TineFlow",
        })
    }catch (error){
        console.log(error);
    }
}


const app =express()

app.get("/", (req, res) => {
    res.send("server is working")
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
