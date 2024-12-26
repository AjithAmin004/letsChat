import asyncHandler from "express-async-handler";
import userModel from "../model/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("register route")
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all the fields')
    }

    console.log("all good so far")
    const userExists = await userModel.findOne({ email });

    console.log("good again")
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await userModel.create({
        name,
        email,
        password,
        pic
    })

    if (user) {
        console.log("user created")
        let token = user.generateAccessToken()

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: token
        })
    } else {
        console.log("user not fpunf")
        res.status(400);
        throw new Error('User not found');
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill all the fields')
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    if (await user.isPasswordCorrect(password)) {
        let token = user.generateAccessToken()

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: token
        })
    } else {
        res.status(400);
        throw new Error('Wrong password');
    }


})

const allUser = asyncHandler(async (req, res) => {
    const condition = req.query.search ? {
        $or: [{ name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        ]
    } : {}
    let result = await userModel.find(condition).find({_id:{$ne:req.user._id}})
    res.status(200).json(result)
})

export { registerUser, loginUser, allUser }