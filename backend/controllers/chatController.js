import asyncHandler from "express-async-handler";
import chatModel from "../model/chatModel.js";
import userModel from "../model/userModel.js";

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400);
        throw new Error("UserId parameter is required, please share it")
    }

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.user._id } } }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await userModel.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    })

    if (isChat.length > 0) {
        res.status(200).send(isChat[0])
    } else {
        const chatData = {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await chatModel.create(chatData);
            const fullChat = await chatModel.find({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
    }

})

const fetchChat = asyncHandler(async (req, res) => {
    try {
        let chats = await chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", '-password')
            .populate("groupAdmin", '-password')
            .populate('latestMessage')
            .sort({ updatedAt: 1 })

        chats = await userModel.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name pic email'
        })
        res.status(200).send(chats)
    } catch (error) {

    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400)
        throw new Error('Please share both groupname and list of users in the group')
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        res.status(400)
        throw new Error('More than 2 peope needed for a group chat')
    }

    users.push(req.user)

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.name,
            isGroupChat: true,
            users,
            groupAdmin: req.user
        })

        const chat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(chat)

    } catch (error) {
        res.status(200);
        throw new Error(error.message)
    }

})

const renameGroup = asyncHandler(async (req, res) => {
    if (!req.body.chatId || !req.body.name) {
        res.status(400)
        throw new Error('Please share all the details')
    }

    let newChat = await chatModel.findByIdAndUpdate(req.body.chatId, { chatName: req.body.name }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!newChat) {
        res.status(404);
        throw new Error("no chat found");
    } else {
        res.status(200).json(newChat)
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    if (!req.body.chatId || !req.body.userId) {
        res.status(400)
        throw new Error('Please share all the details')
    }

    let userList = await chatModel.findByIdAndUpdate(req.body.chatId, { $pull:{users:req.body.userId}}, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!userList) {
        res.status(404);
        throw new Error("no chat found");
    } else {
        res.status(200).json(userList)
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    if (!req.body.chatId || !req.body.userId) {
        res.status(400)
        throw new Error('Please share all the details')
    }

    let userList = await chatModel.findByIdAndUpdate(req.body.chatId, { $push:{users:req.body.userId}}, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!userList) {
        res.status(404);
        throw new Error("no chat found");
    } else {
        res.status(200).json(userList)
    }
})

export { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup };