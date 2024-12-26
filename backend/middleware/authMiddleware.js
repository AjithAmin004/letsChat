import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js'
import asyncHandler from 'express-async-handler'

const authorize = asyncHandler(async (req, res, next) => {
    let token
    if ((req.headers.Authorization && req.headers.Authorization.startsWith("Bearer")
    ) ||
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        )
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            let details = jwt.verify(token, process.env.AUTH_SECRET);
            const user = await userModel.findById(details._id).select('-password')
            req.user = user;
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, token not valid')
        }
    }else{
        res.status(401)
        throw new Error('Not Authorized, token required')
    }
})

export default authorize