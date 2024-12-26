import asyncHandler from "express-async-handler";
import chatModel from "../model/chatModel.js";

const accessChat = asyncHandler(async (req, res) => {
    const {userId} = req.body;
    
    if(!userId){
        res.status(400);
        throw new Error("UserId parameter is required, please share it")
    }

    // let isChat = await chatModel.find({
    //     isGroupChat:false,
    //     $and:[
    //         {users:},
    //         {}
    //     ]
    // })

})

export default accessChat;