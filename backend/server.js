import express from "express";
import "dotenv/config";
import chats  from "./data/data.js";
import dbConection from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import {errorMiddleware,notFound } from './middleware/errorMiddleware.js'

const app = express();
const port = process.env.PORT || 5000;
dbConection(process.env.MONGO_URL)

app.get('/api/chats',(req,res)=>{
    res.status(200).send(chats)
})

// app.get('/api/chats/:id',(req,res)=>{
//     const chat = chats.find((ele)=>ele._id==req.params.id)
//     res.status(200).send(chat);
// })
app.use(express.json())
app.use('/api/user',userRoutes)
app.use(notFound)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});