import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import React, { useState } from "react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { Avatar } from "../ui/avatar";
import { Chatstate } from "../../context/chatProvider.js";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = Chatstate();
  return (
    <Flex
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px"
      borderWidth="5px"
      borderColor="white"
    >
      <Flex flex="1" justifyContent="flex-start">
        <Tooltip
          content="Search users to chat"
          hasArrow
          positioning={{ placement: "bottom-end" }}
          openDelay={100}
          closeDelay={400}
        >
          <Button variant="plain" style={{ color: "black" }}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
      </Flex>
      <Flex flex="1" justifyContent="center" >
        <Text fontSize="2xl">LETS-CHAT</Text>
      </Flex>
      <Flex flex="1" justifyContent="flex-end">
        <div>
          <MenuRoot >
            <i className="fa fa-bell fa-lg"></i>
          </MenuRoot>
          <MenuRoot display="flex" gap="2">
            <MenuTrigger asChild>
              <Button variant="Plain" size="sm">
              <Avatar name={user.name} src={user.pic} size="sm" />
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </Button>
            </MenuTrigger>
            <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem> 
            </MenuContent>
          </MenuRoot>
          </div>
      </Flex>
    </Flex>
  );
};

export default SideDrawer;
