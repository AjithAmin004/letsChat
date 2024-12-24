import "dotenv/config";
import { Stack, Input } from "@chakra-ui/react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Toaster, toaster } from "../ui/toaster";


const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const postPicture = function (picture) {
    setLoading(true);
    if (!picture) {
      toaster.create({
        title: "Picture not uploaded",
        type: "warning",
        duration: 3000,
      });
    } else {
      const data = new FormData();
      console.log("ok",process.env.UPLOAD_PRESENT)
      data.append("file", picture);
      data.append("upload_preset", process.env.UPLOAD_PRESENT);
      fetch(`https://api.cloudinary.com/v1_1/${process.env.UPLOAD_PRESENT}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
            console.log("data",data)
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(pic)
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster />
      <form align="center" onSubmit={submitHandler}>
        <Stack gap="1" maxW="100%">
          <Field label="Name">
            <Input
              placeholder="Enter your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Field>
          <Field label="Email">
            <Input
              placeholder="Enter your Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <PasswordInput
              placeholder="Enter Password"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field label="Confirm Password">
            <PasswordInput
              placeholder="Confirm password"
              minLength={8}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>
          <Field label="Picture">
            <Input
              placeholder="Upload Profile pic"
              type="file"
              accept="image/*"
              onChange={(e) => postPicture(e.target.files[0])}
            />
          </Field>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Signup;
