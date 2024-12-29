import React from "react";
import { Chatstate } from "../context/chatProvider.js";
import SideDrawer from "../components/miscellanious/SideDrawer.jsx";
import MyChats from "../components/miscellanious/MyChats.jsx";
import ChatBox from "../components/miscellanious/ChatBox.jsx";
import { Box } from "@chakra-ui/react";

function Chat() {
  const { user } = Chatstate();
  return <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box style={{display:"flex",backgroundColor:"red", justifyContent:"space-between", width:"100%",height:"91vh",p:"10px"}}>
        {user && <MyChats/>}
        {user && <ChatBox/>}
    </Box>
    </div>;
}

export default Chat;
