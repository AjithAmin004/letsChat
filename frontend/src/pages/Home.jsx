import { Box, Container ,Text,Tabs } from '@chakra-ui/react'
import  Login from '../components/Authentication/login.jsx'
import  Signup  from '../components/Authentication/signup.jsx'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW ='xl' centerContent>
      <Box
      display='flex'
      justifyContent='center'
      p={3}
      bg={"white"}
      w="100%"
      m="1px 0 1px 0"
      color='blue.900'
      borderRadius = 'lg'
      borderWidth='.5px'  
      >
        <Text fontWeight="bold" fontSize='2xl' fontFamily="work sans">LETS-CHAT</Text>
      </Box>
      <Box
      p={3}
      color='white'
      bg={"gray.600"}
      w="100%" 
      borderRadius = 'lg'
      borderWidth='.5px'
      >

<Tabs.Root  defaultValue="login">
      <Tabs.List mb='1em'>
        <Tabs.Trigger width="50%" value="login">Log In</Tabs.Trigger>
        <Tabs.Trigger width="50%" value="signup">Sign Up</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="login">
        <Login/>
      </Tabs.Content>
      <Tabs.Content value="signup">
        <Signup/>
      </Tabs.Content>
    </Tabs.Root>

      </Box>

    </Container>
  )
}

export default Home