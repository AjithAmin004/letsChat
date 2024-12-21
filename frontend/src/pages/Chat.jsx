import React, { useEffect, useState } from "react";
import axios from "axios";

function Chat() {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const res = await axios.get("/api/chats");
      setChats(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchChats();
  },[]);

  return <div>{
    chats.map((chat)=>{
      return <div key={chat._id}>{chat.chatName}</div>})
    }</div>;
}

export default Chat;
