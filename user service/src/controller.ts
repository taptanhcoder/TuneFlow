import TryCatch from './TryCatch.js';
import {User} from "./model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = TryCatch ( async(req , res ) =>{
    const {name,email,password}=req.body
    let user = await User.findOne({email});

    if (user){
        res.status(400).json({
            message:" User already exists",
        });

        return;
    }

    const hashPassword = await bcrypt.hash(password,10);

    user = await User.create({
        name,
        email,
        password: hashPassword,
    });
    
    const token = jwt.sign({_id:user._id},process.env.JWT_ERC as string,{
        expiresIn:"7d",
    });

    res.status(201).json({
        message: "User registered",
        user,
        token,
      });
});

export const loginUser = TryCatch (async(req , res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user){
        res.status(404).json({
            message:"User not exits",
        });
        return;
    }

    const isMatch =await bcrypt.compare(password,user.password)

    if(!isMatch){
        res.status(404).json({
            message:"invalid password",
        })
    }

    const token = jwt.sign({_id:user._id},process.env.JWT_ERC as string,{
        expiresIn:"7d",
    });

    res.status(200).json({
        message: "logged in",
        user,
        token,
      });
});