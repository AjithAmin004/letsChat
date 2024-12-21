import asyncHandler from "express-async-handler";
import userModel from "../model/userModel.js";

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields')
    }

    const userExists = await userModel.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await userModel.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        let token = user.generateAccessToken()

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:token

        })
    }else {
        res.status(400);
        throw new Error('User not found');
    }

})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    if( !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields')
    }

    const user = await userModel.findOne({email});

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(await user.isPasswordCorrect(password)){
        let token = user.generateAccessToken()

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:token
        })
    }else{
        res.status(400);
        throw new Error('Wrong password');
    }
   

})

export {registerUser,loginUser}