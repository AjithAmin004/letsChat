import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field } from "../ui/field"
import { PasswordInput } from "../ui/password-input"


const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  

  const submitHandler = (e) => {
    e.preventDefault(); 
    console.log("pic:",pic);
};

  return (
    <form align="center" onSubmit={submitHandler}>
      <Stack gap="1"  maxW="100%">
        <Field
          label="Name"
        >
          <Input placeholder="Enter your Name" onChange={(e)=>{setName(e.target.value)
          }} />
        </Field>
        <Field
          label="Email"
        >
          <Input placeholder="Enter your Email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </Field>
        <Field
          label="Password"
        >
            <PasswordInput  placeholder="Enter Password" minLength={8} onChange={(e)=>setPassword(e.target.value)}/>
        </Field>
        <Field
          label="Confirm Password"
        >
          <PasswordInput  placeholder="Confirm password" minLength={8} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </Field>
        <Field
          label="Picture"
        >
          <Input placeholder="Upload Profile pic" type="file" accept="image/*" onChange={(e)=>setPic(e.target.files[0])}/>
        </Field>
        <Button type="submit"
        >Submit</Button>
      </Stack>
    </form>
  );
};

export default Signup;
