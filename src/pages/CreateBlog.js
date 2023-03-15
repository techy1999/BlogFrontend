import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//CreateBlog call
const CreateBlog = () => {
  const navigate = useNavigate();

  //state
  const [inputs, setInputes] = useState({
    title: "",
    content: "",
    image_url: "",
    video_url: "",
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

    const authToken = localStorage.getItem("token");
    console.log("authToken 12 Create", authToken, typeof authToken);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/blog",
        inputs,
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log("data Create", data);
      if (data?.success) {
        console.log("Userdata Create", data.data);
        alert("Blog created Successful!");
        navigate("/my-blogs");
      }
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
            Create Post
          </Typography>
          <TextField
            placeholder="title"
            name="title"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.title}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="content"
            name="content"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.content}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="Image Url"
            name="image_url"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.image_url}
            onChange={handleChange}
            required
          />

          <TextField
            placeholder="Video URL"
            name="video_url"
            type={"text"}
            sx={{ marginTop: 3 }}
            value={inputs.video_url}
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
            onClick={() => navigate("/my-blogs")}
          >
            want to see your Blogs ? Go here
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
