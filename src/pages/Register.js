import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  //state
  const [inputs, setInputes] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    social_profile: "",
  });

  const handleChange = (e) => {
    setInputes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const { data } = await axios.post(
        "https://fierce-teal-angelfish.cyclic.app/api/user/register",
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          experience: inputs.experience,
          social_profile: inputs.social_profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      alert("data", data);
      console.log("data", data);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="h4"
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="emal"
            name="email"
            type={"email"}
            sx={{ marginTop: 3 }}
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="password"
            name="password"
            type={"password"}
            sx={{ marginTop: 3 }}
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="experience"
            name="experience"
            type={"number"}
            sx={{ marginTop: 3 }}
            value={inputs.experience}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="social_profile"
            name="social_profile"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.social_profile}
            onChange={handleChange}
            required
          />

          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
