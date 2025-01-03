import { Stack, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Toaster, toaster } from "../ui/toaster";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      setLoading(false);
      toaster.create({
        title: "Please fill all the fields",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    if (password !== confirmpassword) {
      setLoading(false);
      toaster.create({
        title: "Passwords do not match",
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
        "/api/user/register",
        { name, email, password, pic },
        config
      );
      toaster.create({
        title: "Registration Successfull",
        type: "success",
        duration: 3000,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log("error: ", error);
      toaster.create({
        title: error?.response?.data?.message || "Something went wrong",
        type: "error",
        duration: 3000,
      });
      setLoading(false);
    }
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
      data.append("file", picture);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESENT);
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toaster.create({
            title: "Picture not uploaded",
            type: "warning",
            duration: 3000,
          });
          setLoading(false);
        });
    }
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
