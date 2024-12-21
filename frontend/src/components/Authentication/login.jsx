import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field } from "../ui/field"
import { PasswordInput } from "../ui/password-input"

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler = (e) => {
        e.preventDefault(); 
        console.log("email:", email, "password:", password); 
    };

    return (
      <form onSubmit={submitHandler} align="center">
        <Stack gap="1"  maxW="100%">
          <Field
            label="Email"
          >
            <Input placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)}/>
          </Field>
          <Field
            label="Password"
          >
              <PasswordInput  placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
          </Field>
          <Button type="submit"
          >Submit</Button>
          <Button type="submit" colorPalette="blue" m="5px 0 0 0" onClick={()=>{setEmail('test@mail.com');setPassword('test@password')}}
          >Get Guest User Credential</Button>
        </Stack>
      </form>
    );
}

export default Login
