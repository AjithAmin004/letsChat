import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Toaster, toaster } from "../ui/toaster";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toaster.create({
        title: "Please fill all the fields",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(data);
    } catch (error) {
      console.log("error: ", error);
      toaster.create({
        title: error?.response?.data?.message || "Something went wrong",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={submitHandler} align="center">
        <Stack gap="1" maxW="100%">
          <Field label="Email">
            <Input
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <PasswordInput
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button type="submit">Submit</Button>
          <Button
            type="submit"
            colorPalette="blue"
            m="5px 0 0 0"
            onClick={() => {
              setEmail("test@mail.com");
              setPassword("test@password");
            }}
          >
            Get Guest User Credential
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Login;
